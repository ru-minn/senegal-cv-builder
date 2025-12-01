# CV Templates Implementation Guide

## Overview

Professional CV templates have been created for the Senegal CV Builder application. This guide will help you integrate them into your application.

## What Was Created

### 1. Type Definitions (`src/types/cv.ts`)
Updated with:
- `TemplateType` - Type for template selection ('modern' | 'classic')
- `TemplateConfig` - Configuration interface for template customization

### 2. Template Components (`src/components/templates/`)

#### Core Templates
- **ModernTemplate.tsx** (226 lines)
  - Left sidebar design with colored background
  - Circular photo placement
  - Progress bars for skills
  - Timeline for experience
  - Best for: Creative/Tech industries

- **ClassicTemplate.tsx** (233 lines)
  - Traditional centered header layout
  - Formal typography and spacing
  - Two-column skills/languages section
  - Best for: Formal/Conservative sectors

#### Utility Components
- **TemplateWrapper.tsx** (98 lines)
  - Handles template selection and rendering
  - Includes PDF export support (id="cv-preview")
  - Print-optimized styles
  - A4 size (210mm x 297mm)

- **TemplateSelector.tsx** (192 lines)
  - UI for template selection
  - Color picker for accent colors
  - Template previews and descriptions
  - Feature highlights

#### Additional Files
- **ExampleUsage.tsx** (235 lines)
  - Complete working example
  - Sample CV data for Senegal
  - Ready-to-use demo page

- **index.ts**
  - Barrel exports for easy imports

- **README.md**
  - Comprehensive documentation
  - Usage examples
  - Configuration options

## Quick Start

### 1. Basic Integration

Add to your page component:

```tsx
'use client';

import { useState } from 'react';
import { TemplateWrapper } from '@/components/templates';
import { CVData, TemplateType } from '@/types/cv';

export default function CVBuilder() {
  const [cvData, setCvData] = useState<CVData>({
    // Your CV data here
  });

  const [templateType, setTemplateType] = useState<TemplateType>('modern');

  return (
    <TemplateWrapper
      data={cvData}
      templateType={templateType}
      config={{ accentColor: '#DC2626' }}
    />
  );
}
```

### 2. With Template Selection

```tsx
'use client';

import { useState } from 'react';
import { TemplateWrapper, TemplateSelector } from '@/components/templates';
import { TemplateType } from '@/types/cv';

export default function CVBuilderPage() {
  const [templateType, setTemplateType] = useState<TemplateType>('modern');
  const [accentColor, setAccentColor] = useState('#DC2626');

  return (
    <div className="grid grid-cols-2 gap-8">
      <TemplateSelector
        selectedTemplate={templateType}
        onSelectTemplate={setTemplateType}
        selectedColor={accentColor}
        onSelectColor={setAccentColor}
      />
      <TemplateWrapper
        data={cvData}
        templateType={templateType}
        config={{ accentColor }}
      />
    </div>
  );
}
```

### 3. View Example

To see the complete working example:

```tsx
import ExampleUsage from '@/components/templates/ExampleUsage';

export default function DemoPage() {
  return <ExampleUsage />;
}
```

## Features

### Modern Template
- Colored sidebar (35% width) with:
  - Circular photo (160px diameter)
  - Contact information with icons
  - Skills with progress bars (0-5 scale)
  - Languages with proficiency levels
- White main area (65% width) with:
  - Large name header
  - Objective/profile section
  - Experience timeline
  - Education timeline
- Default accent colors: Red, Teal, Purple, Green, Orange
- Font: system-ui (default)

### Classic Template
- Centered header with:
  - Name and title
  - Contact information
  - Additional personal details
- Main content:
  - Objective/profile
  - Experience (traditional format)
  - Education (traditional format)
  - Skills and Languages (two columns)
- Default accent colors: Blue, Green, Brown, Purple, Amber
- Font: Georgia, serif (default)

## Print & PDF Export

### Browser Print
```tsx
function printCV() {
  window.print();
}
```

### Using html2pdf (recommended)
```bash
npm install html2pdf.js
```

```tsx
import html2pdf from 'html2pdf.js';

function exportToPDF() {
  const element = document.getElementById('cv-preview');
  const opt = {
    margin: 0,
    filename: 'mon-cv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}
```

## Customization

### Accent Colors

Modern Template defaults:
- `#DC2626` - Red (default)
- `#0891B2` - Teal
- `#7C3AED` - Purple
- `#059669` - Green
- `#EA580C` - Orange

Classic Template defaults:
- `#1E40AF` - Blue (default)
- `#065F46` - Green
- `#7C2D12` - Brown
- `#4C1D95` - Purple
- `#92400E` - Amber

### Custom Configuration

```tsx
<TemplateWrapper
  data={cvData}
  templateType="modern"
  config={{
    accentColor: '#custom-color',
    fontFamily: 'Your Font, sans-serif',
    fontSize: 'medium'
  }}
/>
```

## Data Structure

Ensure your CV data matches this structure:

```typescript
const cvData: CVData = {
  personalInfo: {
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'example@email.sn',
    phone: '+221 XX XXX XX XX',
    address: 'Your address',
    city: 'Dakar',
    country: 'Sénégal',
    postalCode: '12500',
    dateOfBirth: 'DD/MM/YYYY',
    nationality: 'Sénégalaise',
    photo: 'base64 or URL', // Optional
  },
  objective: 'Your professional objective...',
  experiences: [
    {
      id: '1',
      position: 'Job Title',
      company: 'Company Name',
      location: 'City, Country',
      startDate: 'Month Year',
      endDate: 'Month Year',
      current: false,
      description: 'Job description...',
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Degree Name',
      school: 'Institution',
      field: 'Field of study',
      location: 'City, Country',
      startDate: 'Year',
      endDate: 'Year',
      current: false,
      description: 'Optional description',
    }
  ],
  skills: [
    { id: '1', name: 'Skill Name', level: 4 } // 1-5 scale
  ],
  languages: [
    { id: '1', name: 'Français', proficiency: 'Langue maternelle' }
    // Proficiency: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Courant' | 'Langue maternelle'
  ]
};
```

## Next Steps

1. **Integrate into your main app**
   - Import templates into your CV builder page
   - Connect with your form data
   - Add template selection UI

2. **Add Photo Upload**
   - Implement image upload functionality
   - Convert to base64 or store URL
   - Add to personalInfo.photo

3. **Implement PDF Export**
   - Install html2pdf.js or use browser print
   - Add export button to your UI
   - Test print styles

4. **Customize Styles** (Optional)
   - Modify template components
   - Add new color schemes
   - Adjust typography

5. **Add More Templates** (Future)
   - Create MinimalistTemplate.tsx
   - Create CreativeTemplate.tsx
   - Follow existing template patterns

## Testing

Test your implementation:

1. Fill in complete CV data
2. Switch between templates
3. Change accent colors
4. Print/Export to PDF
5. Check A4 sizing
6. Verify all sections display correctly
7. Test with missing data (should handle gracefully)

## Support

For issues or questions:
- Check README.md in src/components/templates/
- Review ExampleUsage.tsx for working code
- Ensure CVData structure matches types
- Verify all required fields are populated

## File Locations

```
senegal-cv-builder/
├── src/
│   ├── types/
│   │   └── cv.ts (updated)
│   └── components/
│       └── templates/
│           ├── ModernTemplate.tsx
│           ├── ClassicTemplate.tsx
│           ├── TemplateWrapper.tsx
│           ├── TemplateSelector.tsx
│           ├── ExampleUsage.tsx
│           ├── index.ts
│           └── README.md
└── IMPLEMENTATION_GUIDE.md (this file)
```
