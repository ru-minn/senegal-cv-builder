'use client';

import { useState, useCallback } from 'react';
import { Download, Loader2, Printer } from 'lucide-react';
import { exportToPDF, generateCVFileName, printCV } from '@/utils/pdfExport';

export interface ExportButtonProps {
  elementId?: string;
  fileName?: string;
  firstName?: string;
  lastName?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
  language?: 'fr' | 'en';
}

export default function ExportButton({
  elementId = 'cv-preview',
  fileName,
  firstName,
  lastName,
  variant = 'primary',
  fullWidth = false,
  className = '',
  language = 'fr',
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buttonText = {
    fr: {
      download: 'Télécharger PDF',
      downloading: 'Génération en cours...',
      error: 'Erreur lors de la génération',
      print: 'Imprimer',
      retry: 'Réessayer',
    },
    en: {
      download: 'Download PDF',
      downloading: 'Generating...',
      error: 'Generation error',
      print: 'Print',
      retry: 'Retry',
    },
  };

  const text = buttonText[language];

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    setError(null);

    // Small delay to ensure DOM is ready
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      // Generate filename
      const cvFileName = fileName || generateCVFileName(firstName, lastName);

      // Attempt export
      await exportToPDF(elementId, cvFileName);

    } catch (err) {
      console.error('PDF Export Error:', err);
      setError(text.error);

      // Clear error after 10 seconds
      setTimeout(() => setError(null), 10000);
    } finally {
      setIsExporting(false);
    }
  }, [elementId, fileName, firstName, lastName, text.error]);

  const handlePrint = useCallback(() => {
    printCV();
  }, []);

  const baseStyles = `
    inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
    font-medium transition-all duration-200 shadow-md hover:shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-4 focus:ring-opacity-50
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700
      hover:from-blue-700 hover:to-blue-800
      text-white focus:ring-blue-300
      active:scale-95
    `,
    secondary: `
      bg-white border-2 border-blue-600
      hover:bg-blue-50 text-blue-600
      focus:ring-blue-300 active:scale-95
    `,
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`.trim();

  return (
    <div className={fullWidth ? 'w-full space-y-2' : 'space-y-2'}>
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className={buttonClasses}
        aria-label={text.download}
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{text.downloading}</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>{text.download}</span>
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center mb-2">{error}</p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={handleExport}
              className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
            >
              {text.retry}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors flex items-center gap-1"
            >
              <Printer className="w-4 h-4" />
              {text.print}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
