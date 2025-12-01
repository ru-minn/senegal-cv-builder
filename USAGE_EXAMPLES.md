# CV Store and PDF Export - Usage Examples

## 1. Using the Zustand CV Store

### Basic Setup in a Component

```typescript
'use client';

import { useCVStore } from '@/store/cvStore';

export default function MyComponent() {
  const { cvData, updatePersonalInfo, addExperience } = useCVStore();

  // Update personal information
  const handleNameChange = () => {
    updatePersonalInfo({
      firstName: 'Mamadou',
      lastName: 'Diallo',
    });
  };

  // Add new experience
  const handleAddExperience = () => {
    addExperience({
      company: 'Sonatel',
      position: 'Développeur Full Stack',
      startDate: '2020-01',
      endDate: '2023-06',
      current: false,
      description: 'Développement d\'applications web avec React et Node.js',
      location: 'Dakar, Sénégal',
    });
  };

  return (
    <div>
      <h1>{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</h1>
      {/* Your UI here */}
    </div>
  );
}
```

### All Available Store Actions

```typescript
// Personal Info
updatePersonalInfo({ firstName: 'John', email: 'john@example.com' });

// Objective
updateObjective('Recherche un poste de développeur senior...');

// Experiences
addExperience({ company: 'ABC', position: 'Dev', ... });
updateExperience('experience-id', { position: 'Senior Dev' });
removeExperience('experience-id');

// Education
addEducation({ school: 'Université', degree: 'License', ... });
updateEducation('education-id', { degree: 'Master' });
removeEducation('education-id');

// Skills
addSkill({ name: 'JavaScript', level: 5 });
updateSkill('skill-id', { level: 4 });
removeSkill('skill-id');

// Languages
addLanguage({ name: 'Français', proficiency: 'Langue maternelle' });
updateLanguage('language-id', { proficiency: 'Courant' });
removeLanguage('language-id');

// Template & Colors
setTemplate('modern'); // 'modern' | 'classic' | 'minimal' | 'professional'
setAccentColor('blue'); // 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal'

// Reset
resetCV(); // Resets everything to default
```

## 2. Using the Export Button

### Basic Usage

```typescript
import ExportButton from '@/components/ExportButton';
import { useCVStore } from '@/store/cvStore';

export default function CVPreview() {
  const { cvData } = useCVStore();

  return (
    <div>
      {/* The CV preview that will be exported */}
      <div id="cv-preview">
        {/* Your CV template content here */}
        <h1>{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</h1>
        {/* ... rest of CV ... */}
      </div>

      {/* Export Button */}
      <ExportButton
        elementId="cv-preview"
        firstName={cvData.personalInfo.firstName}
        lastName={cvData.personalInfo.lastName}
        language="fr"
      />
    </div>
  );
}
```

### Different Button Variants

```typescript
// Primary button (default - blue gradient)
<ExportButton variant="primary" />

// Secondary button (white with blue border)
<ExportButton variant="secondary" />

// Full width button
<ExportButton fullWidth />

// English language
<ExportButton language="en" />

// Custom filename
<ExportButton fileName="Mon_CV_2024" />

// With custom classes
<ExportButton className="mt-4" />
```

## 3. Direct PDF Export Usage

If you need more control, you can use the PDF export functions directly:

```typescript
import { exportToPDF, generateCVFileName, canExportToPDF } from '@/utils/pdfExport';

// Check if element exists before exporting
if (canExportToPDF('cv-preview')) {
  // Export with auto-generated filename
  const fileName = generateCVFileName('Mamadou', 'Diallo');
  await exportToPDF('cv-preview', fileName);
  // Will create: CV_Mamadou_Diallo_2025-12-01.pdf
}

// Or with custom filename
await exportToPDF('cv-preview', 'My_Professional_CV');
// Will create: My_Professional_CV.pdf
```

## 4. Complete Example: CV Builder Page

```typescript
'use client';

import { useCVStore } from '@/store/cvStore';
import ExportButton from '@/components/ExportButton';
import PersonalInfoForm from '@/components/form/PersonalInfoForm';

export default function CVBuilderPage() {
  const {
    cvData,
    updatePersonalInfo,
    updateObjective,
    addExperience,
    selectedTemplate,
    setTemplate,
    accentColor,
    setAccentColor,
  } = useCVStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Forms */}
      <div className="space-y-6">
        <PersonalInfoForm
          data={cvData.personalInfo}
          onChange={updatePersonalInfo}
        />

        {/* Template Selector */}
        <div>
          <label>Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setTemplate(e.target.value as any)}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Color Selector */}
        <div>
          <label>Accent Color</label>
          <select
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value as any)}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="teal">Teal</option>
          </select>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="space-y-4">
        <div id="cv-preview" className="bg-white shadow-lg p-8">
          {/* Your CV template rendering here */}
          <h1>{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</h1>
          <p>{cvData.objective}</p>
          {/* ... rest of CV content ... */}
        </div>

        <ExportButton
          elementId="cv-preview"
          firstName={cvData.personalInfo.firstName}
          lastName={cvData.personalInfo.lastName}
          variant="primary"
          fullWidth
          language="fr"
        />
      </div>
    </div>
  );
}
```

## 5. Data Persistence

The CV data is automatically persisted to localStorage with the key `cv-storage`. This means:

- Data survives page refreshes
- Users can close and reopen their browser
- No data is lost during the editing process

To clear all data:

```typescript
const { resetCV } = useCVStore();
resetCV(); // This will clear localStorage too
```

## 6. TypeScript Types

All types are exported from `@/types/cv`:

```typescript
import {
  CVData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
} from '@/types/cv';
```

Store-specific types:

```typescript
import type { TemplateType, AccentColor } from '@/store/cvStore';
```
