# i18n Quick Reference Card

## Import Statements

```typescript
// For translations
import { useTranslations } from 'next-intl';

// For navigation
import { Link, useRouter, usePathname } from '@/i18n/routing';

// For getting current locale
import { useLocale } from 'next-intl';

// For server-side locale access
import { getLocale } from 'next-intl/server';
```

## Using Translations

### Basic Usage
```typescript
const t = useTranslations();
<h1>{t('cv.title')}</h1>
```

### With Namespace
```typescript
const t = useTranslations('sections');
<h2>{t('experience')}</h2>
```

### With Variables
```typescript
<p>{t('welcome', { name: userName })}</p>
```

## Navigation

### Link Component
```typescript
<Link href="/about">About</Link>
<Link href="/" locale="fr">Français</Link>
```

### Programmatic Navigation
```typescript
const router = useRouter();
router.push('/profile');
router.replace('/settings');
```

### Get Current Locale
```typescript
const locale = useLocale(); // Returns 'fr', 'en', or 'wo'
```

## Common Translation Keys

### General
- `common.save` - Save
- `common.cancel` - Cancel
- `common.edit` - Edit
- `common.delete` - Delete
- `common.add` - Add

### CV Sections
- `sections.personalInfo` - Personal Information
- `sections.experience` - Work Experience
- `sections.education` - Education
- `sections.skills` - Skills
- `sections.languages` - Languages

### CV Actions
- `cv.title` - CV Builder Senegal
- `cv.download` - Download PDF
- `cv.preview` - Preview
- `cv.print` - Print

## Language Codes
- `fr` - Français (French) - Default
- `en` - English
- `wo` - Wolof

## URLs
- `/` → redirects to `/fr`
- `/fr` → French
- `/en` → English
- `/wo` → Wolof

## Client vs Server Components

### Server Component
```typescript
import { useTranslations } from 'next-intl';

export default function ServerComp() {
  const t = useTranslations();
  return <div>{t('key')}</div>;
}
```

### Client Component
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function ClientComp() {
  const t = useTranslations();
  return <div>{t('key')}</div>;
}
```

## Adding New Translations

1. Add to `/messages/fr.json`:
```json
{
  "mySection": {
    "myKey": "Ma traduction"
  }
}
```

2. Add to `/messages/en.json`:
```json
{
  "mySection": {
    "myKey": "My translation"
  }
}
```

3. Add to `/messages/wo.json`:
```json
{
  "mySection": {
    "myKey": "Suma traduction"
  }
}
```

4. Use in component:
```typescript
const t = useTranslations('mySection');
<div>{t('myKey')}</div>
```

## Language Switcher

```typescript
'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <button onClick={() => router.replace(pathname, { locale: 'fr' })}>
        FR
      </button>
      <button onClick={() => router.replace(pathname, { locale: 'en' })}>
        EN
      </button>
      <button onClick={() => router.replace(pathname, { locale: 'wo' })}>
        WO
      </button>
    </div>
  );
}
```

## File Locations

- Translations: `/messages/{locale}.json`
- i18n Config: `/src/i18n/request.ts`
- Routing: `/src/i18n/routing.ts`
- Middleware: `/src/middleware.ts`
- Next Config: `/next.config.ts`

## Troubleshooting

### Translations not showing?
1. Check the key exists in all language files
2. Verify the namespace is correct
3. Ensure `NextIntlClientProvider` wraps the component

### Navigation not working?
1. Use `Link` from `@/i18n/routing`, not `next/link`
2. Use `useRouter` from `@/i18n/routing`, not `next/navigation`

### Locale not detected?
1. Check middleware config in `/src/middleware.ts`
2. Verify matcher pattern includes your route
3. Clear browser cache and restart dev server
