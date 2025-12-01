# CV Form Components

This directory contains all the form components for the Senegal CV Builder application.

## Components

### 1. PersonalInfoForm
Form for personal information including name, email, phone, address, and photo upload.

```tsx
import { PersonalInfoForm } from '@/components/form';
import { PersonalInfo } from '@/types/cv';

const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(DEFAULT_PERSONAL_INFO);

<PersonalInfoForm data={personalInfo} onChange={setPersonalInfo} />
```

### 2. ObjectiveForm
Form for career objective/profile summary (max 500 characters).

```tsx
import { ObjectiveForm } from '@/components/form';

const [objective, setObjective] = useState<string>('');

<ObjectiveForm data={objective} onChange={setObjective} />
```

### 3. ExperienceForm
Dynamic form for work experience with add/remove functionality.

```tsx
import { ExperienceForm } from '@/components/form';
import { Experience } from '@/types/cv';

const [experiences, setExperiences] = useState<Experience[]>([]);

<ExperienceForm data={experiences} onChange={setExperiences} />
```

### 4. EducationForm
Dynamic form for education with add/remove functionality.

```tsx
import { EducationForm } from '@/components/form';
import { Education } from '@/types/cv';

const [education, setEducation] = useState<Education[]>([]);

<EducationForm data={education} onChange={setEducation} />
```

### 5. SkillsForm
Form for skills with 1-5 star proficiency level (visual stars + slider for mobile).

```tsx
import { SkillsForm } from '@/components/form';
import { Skill } from '@/types/cv';

const [skills, setSkills] = useState<Skill[]>([]);

<SkillsForm data={skills} onChange={setSkills} />
```

### 6. LanguagesForm
Form for languages with proficiency levels (Débutant to Langue maternelle).

```tsx
import { LanguagesForm } from '@/components/form';
import { Language } from '@/types/cv';

const [languages, setLanguages] = useState<Language[]>([]);

<LanguagesForm data={languages} onChange={setLanguages} />
```

## Complete Example

```tsx
'use client';

import { useState } from 'react';
import {
  PersonalInfoForm,
  ObjectiveForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  LanguagesForm,
} from '@/components/form';
import { CVData, DEFAULT_CV_DATA } from '@/types/cv';

export default function CVBuilderPage() {
  const [cvData, setCVData] = useState<CVData>(DEFAULT_CV_DATA);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <PersonalInfoForm
        data={cvData.personalInfo}
        onChange={(personalInfo) => setCVData({ ...cvData, personalInfo })}
      />

      <ObjectiveForm
        data={cvData.objective}
        onChange={(objective) => setCVData({ ...cvData, objective })}
      />

      <ExperienceForm
        data={cvData.experiences}
        onChange={(experiences) => setCVData({ ...cvData, experiences })}
      />

      <EducationForm
        data={cvData.education}
        onChange={(education) => setCVData({ ...cvData, education })}
      />

      <SkillsForm
        data={cvData.skills}
        onChange={(skills) => setCVData({ ...cvData, skills })}
      />

      <LanguagesForm
        data={cvData.languages}
        onChange={(languages) => setCVData({ ...cvData, languages })}
      />
    </div>
  );
}
```

## Features

All components include:
- **Tailwind CSS styling** - Beautiful, modern design
- **Mobile-friendly** - Responsive layouts that work on all devices
- **French labels** - All text in French for Senegal users
- **Validation** - Required fields marked with red asterisk (*)
- **User-friendly** - Simple, intuitive interfaces
- **Accessibility** - Proper labels and ARIA attributes

## Type Safety

All components use TypeScript interfaces defined in `/src/types/cv.ts`:
- `PersonalInfo`
- `Experience`
- `Education`
- `Skill`
- `Language`
- `CVData` (complete CV data structure)

## Icons

Components use icons from `lucide-react`:
- User, Camera (PersonalInfoForm)
- FileText (ObjectiveForm)
- Briefcase (ExperienceForm)
- GraduationCap (EducationForm)
- Star, Award (SkillsForm)
- Languages (LanguagesForm)
- Plus, Trash2 (Add/Remove buttons)
