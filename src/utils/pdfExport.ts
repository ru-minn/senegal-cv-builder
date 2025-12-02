import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Convert any CSS color to RGB using canvas
 */
function colorToRGB(color: string): string {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return color;
  }

  // If already rgb/rgba, return as is
  if (color.startsWith('rgb')) {
    return color;
  }

  // Use canvas to convert color
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return color;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
}

/**
 * Recursively apply computed RGB colors to all elements
 */
function convertColorsToRGB(element: HTMLElement): void {
  const computed = window.getComputedStyle(element);

  // Convert and apply colors
  const props = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];

  props.forEach(prop => {
    const value = computed.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase());
    if (value && value !== 'transparent' && value !== 'rgba(0, 0, 0, 0)') {
      (element.style as any)[prop] = colorToRGB(value);
    }
  });

  // Process children
  Array.from(element.children).forEach(child => {
    convertColorsToRGB(child as HTMLElement);
  });
}

/**
 * Exports an HTML element to PDF file
 */
export async function exportToPDF(
  elementId: string,
  fileName: string = 'CV'
): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element "${elementId}" not found`);
    throw new Error(`Element not found: ${elementId}`);
  }

  console.log('PDF Export: Starting...');

  // Clone the element
  const clone = element.cloneNode(true) as HTMLElement;

  // Create temporary container
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 210mm;
    min-height: 297mm;
    background: white;
    z-index: 99999;
    overflow: visible;
  `;
  container.appendChild(clone);
  document.body.appendChild(container);

  // Wait for render
  await new Promise(r => setTimeout(r, 50));

  // Convert all colors to RGB
  convertColorsToRGB(clone);

  // Wait for styles to apply
  await new Promise(r => setTimeout(r, 50));

  try {
    // Create canvas - ignore oklab warnings
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('oklab') || args[0]?.includes?.('unsupported color')) {
        return; // Suppress oklab warnings
      }
      originalWarn.apply(console, args);
    };

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: clone.scrollWidth,
      height: clone.scrollHeight,
    });

    console.warn = originalWarn;

    console.log('Canvas created:', canvas.width, 'x', canvas.height);

    // A4 dimensions
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    // Handle multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Add copyright footer to last page
    const totalPages = pdf.getNumberOfPages();
    pdf.setPage(totalPages);
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    const copyrightText = `© ${new Date().getFullYear()} customercloud - CV Builder`;
    const textWidth = pdf.getTextWidth(copyrightText);
    pdf.text(copyrightText, (pdfWidth - textWidth) / 2, pdfHeight - 5);

    // Download
    pdf.save(`${fileName}.pdf`);
    console.log('PDF Export: Success!');

  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Print CV using browser dialog
 */
export function printCV(): void {
  window.print();
}

/**
 * Generate filename
 */
export function generateCVFileName(firstName?: string, lastName?: string): string {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  if (firstName && lastName) {
    return `CV_${firstName}_${lastName}_${date}`.replace(/\s+/g, '_');
  }
  if (firstName || lastName) {
    return `CV_${(firstName || lastName || '').replace(/\s+/g, '_')}_${date}`;
  }
  return `CV_${date}`;
}
