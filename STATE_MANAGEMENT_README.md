# CV Builder - State Management & PDF Export

## Overview

This CV builder application now has a complete state management system using Zustand and professional PDF export functionality.

## Files Created

### 1. `/src/store/cvStore.ts` (233 lines)

**Zustand Store for Global CV State Management**

Features:
- ✅ Complete CV data state management
- ✅ Template selection (modern, classic, minimal, professional)
- ✅ Accent color customization (6 colors)
- ✅ LocalStorage persistence (survives page reloads)
- ✅ TypeScript type safety
- ✅ Optimized state updates with immutability

**Available Actions:**
- Personal Info: `updatePersonalInfo()`
- Objective: `updateObjective()`
- Experience: `addExperience()`, `updateExperience()`, `removeExperience()`
- Education: `addEducation()`, `updateEducation()`, `removeEducation()`
- Skills: `addSkill()`, `updateSkill()`, `removeSkill()`
- Languages: `addLanguage()`, `updateLanguage()`, `removeLanguage()`
- Template: `setTemplate()`, `setAccentColor()`
- Reset: `resetCV()`

### 2. `/src/utils/pdfExport.ts` (141 lines)

**Professional PDF Export Utility**

Features:
- ✅ High-quality PDF generation (2x scale for crisp output)
- ✅ A4 format with proper page breaks
- ✅ Multi-page support for long CVs
- ✅ CORS-friendly image handling
- ✅ Smart filename generation with dates
- ✅ Error handling and validation
- ✅ Helper functions for custom use cases

**Main Functions:**
- `exportToPDF(elementId, fileName)` - Main export function
- `canExportToPDF(elementId)` - Validation helper
- `generateCVFileName(firstName, lastName)` - Auto filename generator
- `getFormattedDate()` - Date formatting utility

### 3. `/src/components/ExportButton.tsx` (122 lines)

**Beautiful, Production-Ready Export Button**

Features:
- ✅ Bilingual support (French/English)
- ✅ Loading state with spinner animation
- ✅ Error handling with user-friendly messages
- ✅ Two variants: primary (gradient) and secondary (outline)
- ✅ Responsive design
- ✅ Accessibility features (ARIA labels)
- ✅ Smooth animations and transitions
- ✅ Auto-clears errors after 3 seconds

**Props:**
```typescript
interface ExportButtonProps {
  elementId?: string;        // ID of element to export (default: 'cv-preview')
  fileName?: string;         // Custom filename
  firstName?: string;        // For auto-generated filename
  lastName?: string;         // For auto-generated filename
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;       // Make button full width
  className?: string;        // Additional CSS classes
  language?: 'fr' | 'en';   // Button text language
}
```

## Quick Start

### 1. Use the Store in Your Component

```typescript
'use client';

import { useCVStore } from '@/store/cvStore';

export default function YourComponent() {
  const { cvData, updatePersonalInfo, addExperience } = useCVStore();

  // All your CV data is available
  console.log(cvData.personalInfo.firstName);

  // Update state easily
  updatePersonalInfo({ firstName: 'John', lastName: 'Doe' });

  return <div>Your UI here</div>;
}
```

### 2. Add the Export Button

```typescript
import ExportButton from '@/components/ExportButton';

export default function CVPreview() {
  const { cvData } = useCVStore();

  return (
    <div>
      <div id="cv-preview">
        {/* Your CV content */}
      </div>

      <ExportButton
        firstName={cvData.personalInfo.firstName}
        lastName={cvData.personalInfo.lastName}
        language="fr"
      />
    </div>
  );
}
```

## State Persistence

The store automatically persists to localStorage under the key `cv-storage`. This means:

- ✅ Data survives page refreshes
- ✅ Users can close/reopen their browser
- ✅ No server required for basic functionality
- ✅ Works offline

### Clear Stored Data

```typescript
// Reset to defaults and clear localStorage
const { resetCV } = useCVStore();
resetCV();

// Or manually clear from browser console
localStorage.removeItem('cv-storage');
```

## PDF Export Details

### Quality Settings
- **Scale:** 2x for high-quality output
- **Format:** A4 (210mm × 297mm)
- **Compression:** Enabled for smaller file sizes
- **Image format:** JPEG (95% quality)

### Multi-page Support
The export function automatically handles CVs longer than one page:
- First page: Top of content
- Subsequent pages: Continuation with proper positioning
- No content is cut off

### File Naming Convention
Auto-generated filenames follow this pattern:
```
CV_FirstName_LastName_YYYY-MM-DD.pdf
```

Examples:
- `CV_Mamadou_Diallo_2025-12-01.pdf`
- `CV_Aissatou_2025-12-01.pdf` (if only first name)
- `CV_2025-12-01.pdf` (if no name provided)

## Integration with Existing Forms

All existing form components can easily integrate with the store:

```typescript
// Before (without store)
<PersonalInfoForm data={localData} onChange={setLocalData} />

// After (with store)
import { useCVStore } from '@/store/cvStore';

const { cvData, updatePersonalInfo } = useCVStore();

<PersonalInfoForm
  data={cvData.personalInfo}
  onChange={updatePersonalInfo}
/>
```

## Template & Color System

### Available Templates
```typescript
type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional';
```

### Available Colors
```typescript
type AccentColor = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal';
```

### Usage
```typescript
const { selectedTemplate, accentColor, setTemplate, setAccentColor } = useCVStore();

<select value={selectedTemplate} onChange={(e) => setTemplate(e.target.value as TemplateType)}>
  <option value="modern">Modern</option>
  <option value="classic">Classic</option>
  <option value="minimal">Minimal</option>
  <option value="professional">Professional</option>
</select>

<select value={accentColor} onChange={(e) => setAccentColor(e.target.value as AccentColor)}>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
  <option value="purple">Purple</option>
  <option value="red">Red</option>
  <option value="orange">Orange</option>
  <option value="teal">Teal</option>
</select>
```

## TypeScript Types

All types are fully typed and exported:

```typescript
// CV Data types
import type {
  CVData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
} from '@/types/cv';

// Store types
import type { TemplateType, AccentColor } from '@/store/cvStore';

// Component types
import type { ExportButtonProps } from '@/components/ExportButton';
```

## Best Practices

### 1. Use Partial Updates
```typescript
// Good - only updates what changed
updatePersonalInfo({ firstName: 'John' });

// Avoid - unnecessary full object updates
updatePersonalInfo({ ...cvData.personalInfo, firstName: 'John' });
```

### 2. Generate IDs Automatically
```typescript
// Good - store generates ID
addExperience({
  company: 'ABC Corp',
  position: 'Developer',
  // ... other fields
});

// Don't manually create IDs
```

### 3. Error Handling for PDF Export
```typescript
// The ExportButton component handles errors automatically
// For custom implementations:
try {
  await exportToPDF('cv-preview', 'MyCV');
} catch (error) {
  console.error('Export failed:', error);
  // Show user-friendly error message
}
```

## Performance Considerations

- ✅ **Selective rendering:** Use Zustand's selectors to only re-render when needed
- ✅ **LocalStorage throttling:** Updates are batched automatically
- ✅ **PDF generation:** Runs async to avoid blocking UI
- ✅ **Image optimization:** Uses CORS and proper scaling

### Example: Selective Re-rendering

```typescript
// Only re-renders when firstName changes
const firstName = useCVStore((state) => state.cvData.personalInfo.firstName);

// Re-renders on any cvData change (less efficient)
const cvData = useCVStore((state) => state.cvData);
```

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Requires localStorage API (available in all modern browsers)
- ⚠️ PDF export requires canvas API support

## Troubleshooting

### PDF Export Issues

**Problem:** Element not found error
```typescript
// Solution: Ensure element ID matches
<div id="cv-preview"> {/* Must match elementId prop */}

<ExportButton elementId="cv-preview" />
```

**Problem:** Images not appearing in PDF
```typescript
// Solution: Ensure images have CORS headers or use base64
// The exportToPDF function has useCORS: true enabled
```

**Problem:** Text cut off in PDF
```typescript
// Solution: Ensure element has proper overflow settings
// The export function temporarily sets overflow: visible
```

### State Management Issues

**Problem:** State not persisting
```typescript
// Check if localStorage is available
if (typeof window !== 'undefined') {
  console.log(localStorage.getItem('cv-storage'));
}
```

**Problem:** State not updating
```typescript
// Ensure you're using the store in a Client Component
'use client'; // Add this at the top of your file
```

## Next Steps

1. Integrate the store with your existing forms
2. Create CV template components that read from the store
3. Add the ExportButton to your preview page
4. Implement template switching UI
5. Add color picker for accent colors
6. Consider adding undo/redo functionality
7. Add export format options (PDF, Word, etc.)

## Support

For issues or questions:
1. Check the USAGE_EXAMPLES.md file
2. Review TypeScript types in /src/types/cv.ts
3. Check browser console for errors
4. Verify localStorage is enabled in browser settings
