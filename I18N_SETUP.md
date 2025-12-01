# Internationalization (i18n) Setup

This project uses `next-intl` for internationalization with support for three languages:
- **French (fr)** - Default language
- **English (en)**
- **Wolof (wo)**

## File Structure

```
src/
├── i18n/
│   ├── request.ts      # i18n configuration
│   └── routing.ts      # Routing configuration and navigation helpers
├── middleware.ts       # i18n middleware for automatic locale detection
├── app/
│   ├── layout.tsx      # Root layout (minimal)
│   └── [locale]/       # Locale-specific routes
│       ├── layout.tsx  # Main layout with i18n provider
│       └── page.tsx    # Homepage with translations
└── components/
    └── LanguageSwitcher.tsx  # Language switcher component

messages/
├── fr.json            # French translations
├── en.json            # English translations
└── wo.json            # Wolof translations
```

## Configuration Files

### 1. `src/i18n/routing.ts`
Defines supported locales, default locale, and exports navigation helpers:
```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en', 'wo'],
  defaultLocale: 'fr',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

### 2. `src/i18n/request.ts`
Configures message loading:
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### 3. `src/middleware.ts`
Handles automatic locale detection and routing:
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en|wo)/:path*']
};
```

### 4. `next.config.ts`
Integrates next-intl plugin:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
```

## Usage Examples

### Server Components

```typescript
import { useTranslations } from 'next-intl';

export default function ServerComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('cv.title')}</h1>
      <p>{t('cv.subtitle')}</p>
      <button>{t('cv.download')}</button>
    </div>
  );
}
```

### Accessing Nested Translations

```typescript
import { useTranslations } from 'next-intl';

export default function PersonalInfoForm() {
  const t = useTranslations('personalInfo');

  return (
    <form>
      <label>{t('photo')}</label>
      <input placeholder={t('uploadPhoto')} />
    </form>
  );
}
```

### Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function ClientComponent() {
  const t = useTranslations();

  return (
    <div>
      <h2>{t('sections.experience')}</h2>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### Navigation with Locale

```typescript
import { Link } from '@/i18n/routing';

export default function Navigation() {
  return (
    <nav>
      {/* Link maintains current locale */}
      <Link href="/about">{t('common.about')}</Link>

      {/* Switch to specific locale */}
      <Link href="/" locale="fr">Français</Link>
      <Link href="/" locale="en">English</Link>
      <Link href="/" locale="wo">Wolof</Link>
    </nav>
  );
}
```

### Programmatic Navigation

```typescript
'use client';

import { useRouter } from '@/i18n/routing';

export default function Component() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/profile');
  };

  return <button onClick={handleClick}>Go to Profile</button>;
}
```

### Language Switcher Component

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <button onClick={() => handleLocaleChange('fr')}>Français</button>
      <button onClick={() => handleLocaleChange('en')}>English</button>
      <button onClick={() => handleLocaleChange('wo')}>Wolof</button>
    </div>
  );
}
```

## Translation Keys

The translation files are organized into namespaces:

- `common` - Common UI elements (save, cancel, edit, delete, etc.)
- `cv` - CV builder specific (title, download, preview, etc.)
- `sections` - CV sections (personal info, experience, education, etc.)
- `personalInfo` - Personal information fields
- `objective` - Professional objective
- `experience` - Work experience fields
- `education` - Education fields
- `skills` - Skills management
- `languages` - Language proficiency
- `certifications` - Certifications
- `projects` - Projects
- `references` - References
- `templates` - CV templates
- `validation` - Form validation messages

## URL Structure

The app automatically handles locale-prefixed URLs:

- `/` redirects to `/fr` (default locale)
- `/fr` - French version
- `/en` - English version
- `/wo` - Wolof version
- `/fr/about` - French about page
- `/en/about` - English about page

## Adding New Translations

1. Add the key to all three translation files (`fr.json`, `en.json`, `wo.json`)
2. Use the key in your component: `t('your.new.key')`

Example:
```json
// messages/fr.json
{
  "mySection": {
    "newField": "Nouveau champ"
  }
}

// messages/en.json
{
  "mySection": {
    "newField": "New field"
  }
}

// messages/wo.json
{
  "mySection": {
    "newField": "Bii bu bees"
  }
}
```

## Adding a New Language

1. Add locale to `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['fr', 'en', 'wo', 'ar'], // Add 'ar' for Arabic
  defaultLocale: 'fr',
});
```

2. Update middleware matcher in `src/middleware.ts`:
```typescript
export const config = {
  matcher: ['/', '/(fr|en|wo|ar)/:path*']
};
```

3. Create `messages/ar.json` with all translations

4. Add to language switcher component

## Best Practices

1. **Always use translation keys**: Never hardcode text in components
2. **Organize by namespace**: Group related translations together
3. **Keep keys consistent**: Use the same key structure across all language files
4. **Provide context**: Use descriptive key names
5. **Use placeholders**: For dynamic content, use variables:
   ```typescript
   t('welcome', { name: user.name })
   ```

## Wolof Translations Note

The Wolof translations use transliterations and common Wolof phrases:
- "Xam-xam bu am solo" - Important/personal information
- "Liggéey" - Work
- "Jàng" - Study/Education
- "Làkk" - Language
- "Téléphone" - Phone (borrowed from French, commonly used)

For more accurate Wolof translations, consult with native speakers or Wolof language experts.

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
