import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports an HTML element to a PDF file
 * @param elementId - The ID of the HTML element to convert to PDF
 * @param fileName - The name of the PDF file (without .pdf extension)
 * @throws Error if the element is not found or if PDF generation fails
 */
export async function exportToPDF(
  elementId: string,
  fileName: string = 'CV'
): Promise<void> {
  try {
    // Get the element to convert
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Store original styles to restore later
    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;

    // Temporarily adjust element for better rendering
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    // Create canvas from the element with high quality settings
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Allow cross-origin images
      logging: false, // Disable logging
      backgroundColor: '#ffffff', // White background
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure the cloned element is fully visible
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.overflow = 'visible';
          clonedElement.style.height = 'auto';
        }
      },
    });

    // Restore original styles
    element.style.overflow = originalOverflow;
    element.style.height = originalHeight;

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    // Calculate dimensions to fit A4
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > a4Width ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Add image to PDF
    let position = 0;
    let heightLeft = imgHeight;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= a4Height;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= a4Height;
    }

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(
      `Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Validates that the required element exists before attempting PDF export
 * @param elementId - The ID of the HTML element to check
 * @returns true if element exists, false otherwise
 */
export function canExportToPDF(elementId: string): boolean {
  return document.getElementById(elementId) !== null;
}

/**
 * Gets the current date formatted as YYYY-MM-DD for file naming
 * @returns Formatted date string
 */
export function getFormattedDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generates a default CV filename with the user's name and date
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Formatted filename
 */
export function generateCVFileName(
  firstName?: string,
  lastName?: string
): string {
  const date = getFormattedDate();

  if (firstName && lastName) {
    const name = `${firstName}_${lastName}`.replace(/\s+/g, '_');
    return `CV_${name}_${date}`;
  }

  if (firstName || lastName) {
    const name = (firstName || lastName || '').replace(/\s+/g, '_');
    return `CV_${name}_${date}`;
  }

  return `CV_${date}`;
}
