'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const localeNames = {
    fr: 'Français',
    en: 'English',
    wo: 'Wolof'
  };

  return (
    <div className="flex gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600'
          }`}
        >
          {localeNames[loc as keyof typeof localeNames]}
        </button>
      ))}
    </div>
  );
}
