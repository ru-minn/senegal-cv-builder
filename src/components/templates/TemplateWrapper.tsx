import React from 'react';
import { CVData, TemplateType, TemplateConfig } from '@/types/cv';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

interface TemplateWrapperProps {
  data: CVData;
  templateType: TemplateType;
  config?: TemplateConfig;
  id?: string;
}

export default function TemplateWrapper({ data, templateType, config, id }: TemplateWrapperProps) {
  const renderTemplate = () => {
    switch (templateType) {
      case 'modern':
        return <ModernTemplate data={data} config={config} />;
      case 'classic':
        return <ClassicTemplate data={data} config={config} />;
      case 'minimal':
        return <MinimalTemplate data={data} config={config} />;
      case 'professional':
        return <ProfessionalTemplate data={data} config={config} />;
      default:
        return <ModernTemplate data={data} config={config} />;
    }
  };

  return (
    <div
      id={id}
      className="cv-wrapper"
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {renderTemplate()}

      {/* Global Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
          }

          #cv-preview {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            page-break-after: avoid;
          }

          .cv-wrapper {
            box-shadow: none !important;
          }

          /* Hide non-print elements */
          button,
          .no-print {
            display: none !important;
          }

          /* Ensure colors are printed */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Prevent page breaks in important sections */
          h1,
          h2,
          h3 {
            page-break-after: avoid;
          }

          /* Optimize text for print */
          body {
            font-size: 12pt;
          }
        }

        /* Screen view styles */
        @media screen {
          .cv-wrapper {
            margin: 2rem auto;
          }
        }
      `}</style>
    </div>
  );
}
