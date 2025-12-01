# CV Templates

Professional CV templates for the Senegal CV Builder application.

## Templates Available

### 1. Modern Template
A contemporary design with:
- Colored sidebar (left 35%) with photo, contact info, skills, and languages
- White main area (right 65%) with experience and education
- Circular photo placement
- Progress bars for skills
- Timeline design for experience
- Professional and eye-catching

**Best for:** Creative industries, tech, startups, modern companies

### 2. Classic Template
A traditional design with:
- Centered header with name and contact information
- Clean section dividers
- Traditional two-column layout for skills and languages
- Formal typography
- Professional and conservative

**Best for:** Formal sectors, government, finance, traditional companies

## Usage

### Basic Usage

```tsx
import { TemplateWrapper } from '@/components/templates';
import { CVData } from '@/types/cv';

function CVPreview() {
  const cvData: CVData = {
    // ... your CV data
  };

  return (
    <TemplateWrapper
      data={cvData}
      templateType="modern"
      config={{
        accentColor: '#DC2626',
        fontFamily: 'system-ui',
      }}
    />
  );
}
```

### With Template Selector

```tsx
'use client';

import { useState } from 'react';
import { TemplateWrapper, TemplateSelector } from '@/components/templates';
import { TemplateType } from '@/types/cv';

function CVBuilder() {
  const [templateType, setTemplateType] = useState<TemplateType>('modern');
  const [accentColor, setAccentColor] = useState('#DC2626');

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <TemplateSelector
          selectedTemplate={templateType}
          onSelectTemplate={setTemplateType}
          selectedColor={accentColor}
          onSelectColor={setAccentColor}
        />
      </div>
      <div>
        <TemplateWrapper
          data={cvData}
          templateType={templateType}
          config={{ accentColor }}
        />
      </div>
    </div>
  );
}
```

### PDF Export

The `TemplateWrapper` includes `id="cv-preview"` which can be used with libraries like `html2pdf` or browser print:

```tsx
import html2pdf from 'html2pdf.js';

function exportToPDF() {
  const element = document.getElementById('cv-preview');
  const opt = {
    margin: 0,
    filename: 'cv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

// Or use browser print
function printCV() {
  window.print();
}
```

## Configuration Options

### TemplateConfig

```typescript
interface TemplateConfig {
  accentColor?: string;      // Hex color for accents (default varies by template)
  fontFamily?: string;       // Font family (default varies by template)
  fontSize?: 'small' | 'medium' | 'large';  // Text size
}
```

### Default Accent Colors

**Modern Template:**
- Red: `#DC2626` (default)
- Teal: `#0891B2`
- Purple: `#7C3AED`
- Green: `#059669`
- Orange: `#EA580C`

**Classic Template:**
- Blue: `#1E40AF` (default)
- Green: `#065F46`
- Brown: `#7C2D12`
- Purple: `#4C1D95`
- Amber: `#92400E`

## Print Styles

All templates include:
- A4 size (210mm x 297mm)
- Proper print margins
- Color preservation (`print-color-adjust: exact`)
- Page break optimization
- Font size optimization for print (12pt)

## Customization

Each template can be customized by:
1. Changing accent colors
2. Modifying font families
3. Adjusting font sizes
4. Extending the base components

## File Structure

```
src/components/templates/
├── ModernTemplate.tsx      # Modern CV template
├── ClassicTemplate.tsx     # Classic CV template
├── TemplateWrapper.tsx     # Wrapper with PDF export support
├── TemplateSelector.tsx    # Template selection UI
├── index.ts               # Exports
└── README.md              # This file
```

## Requirements

The templates expect `CVData` from `@/types/cv.ts` with the following structure:

```typescript
interface CVData {
  personalInfo: PersonalInfo;
  objective: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}
```

See `/src/types/cv.ts` for complete type definitions.
