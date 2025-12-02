import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports an HTML element to a single-page PDF file
 */
export async function exportToPDF(
  elementId: string,
  fileName: string = 'CV'
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const element = document.getElementById(elementId);

      if (!element) {
        const availableIds = Array.from(document.querySelectorAll('[id]'))
          .map(el => el.id)
          .filter(id => id);
        console.error(`Element "${elementId}" not found.`);
        console.error('Available IDs:', availableIds);
        reject(new Error(`Element "${elementId}" not found`));
        return;
      }

      console.log('PDF Export: Starting...');
      console.log('Element found:', element.tagName, element.className);
      console.log('Element size:', element.offsetWidth, 'x', element.offsetHeight);

      // Ensure element is visible and has dimensions
      if (element.offsetWidth === 0 || element.offsetHeight === 0) {
        reject(new Error('Element has no dimensions'));
        return;
      }

      // Create canvas with proper settings
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
      });

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate aspect ratios
      const canvasAspect = canvas.width / canvas.height;
      const pdfAspect = pdfWidth / pdfHeight;

      let imgWidth: number;
      let imgHeight: number;
      let xOffset: number;
      let yOffset: number;

      // Scale to fit on single page while maintaining aspect ratio
      if (canvasAspect > pdfAspect) {
        // Image is wider than PDF - fit to width
        imgWidth = pdfWidth;
        imgHeight = pdfWidth / canvasAspect;
        xOffset = 0;
        yOffset = (pdfHeight - imgHeight) / 2;
      } else {
        // Image is taller than PDF - fit to height
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * canvasAspect;
        xOffset = (pdfWidth - imgWidth) / 2;
        yOffset = 0;
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Convert canvas to data URL
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Add image to PDF - single page, centered
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

      // Save PDF
      pdf.save(`${fileName}.pdf`);

      console.log('PDF Export: Success!');
      resolve();

    } catch (error) {
      console.error('PDF Export Error:', error);
      reject(error);
    }
  });
}

/**
 * Use browser print dialog (fallback)
 */
export function printCV(): void {
  window.print();
}

/**
 * Check if element exists
 */
export function canExportToPDF(elementId: string): boolean {
  const element = document.getElementById(elementId);
  return element !== null && element.offsetWidth > 0 && element.offsetHeight > 0;
}

/**
 * Format date as YYYY-MM-DD
 */
export function getFormattedDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate filename for CV
 */
export function generateCVFileName(firstName?: string, lastName?: string): string {
  const date = getFormattedDate();

  if (firstName && lastName) {
    return `CV_${firstName}_${lastName}_${date}`.replace(/\s+/g, '_');
  }

  if (firstName || lastName) {
    return `CV_${(firstName || lastName || '').replace(/\s+/g, '_')}_${date}`;
  }

  return `CV_${date}`;
}
