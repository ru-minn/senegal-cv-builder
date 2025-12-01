'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportToPDF, generateCVFileName } from '@/utils/pdfExport';

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
    },
    en: {
      download: 'Download PDF',
      downloading: 'Generating...',
      error: 'Generation error',
    },
  };

  const text = buttonText[language];

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      // Generate filename based on user's name or use provided filename
      const cvFileName = fileName || generateCVFileName(firstName, lastName);

      // Export to PDF
      await exportToPDF(elementId, cvFileName);
    } catch (err) {
      console.error('Export failed:', err);
      setError(text.error);

      // Clear error after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsExporting(false);
    }
  };

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
    <div className={fullWidth ? 'w-full' : ''}>
      <button
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
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
