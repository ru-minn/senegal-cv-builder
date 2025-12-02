'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  FileText,
  Sparkles,
  Download,
  Globe,
  Smartphone,
  CheckCircle,
} from 'lucide-react';

type LocaleType = 'fr' | 'en' | 'wo';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale() as LocaleType;

  const features = [
    {
      icon: Sparkles,
      title: t('common.feature1Title'),
      description: t('common.feature1Desc'),
    },
    {
      icon: Download,
      title: t('common.feature2Title'),
      description: t('common.feature2Desc'),
    },
    {
      icon: Globe,
      title: t('common.feature3Title'),
      description: t('common.feature3Desc'),
    },
    {
      icon: Smartphone,
      title: t('common.feature4Title'),
      description: t('common.feature4Desc'),
    },
  ];

  const languages: { code: LocaleType; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FileText className="w-7 h-7 text-blue-500" />
              <span className="text-lg font-semibold text-gray-800">CV Sénégal</span>
            </div>

            {/* Header Language Switcher */}
            <div className="flex items-center gap-1">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href="/"
                  locale={lang.code}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all font-medium ${
                    locale === lang.code
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Cyan/Teal gradient background */}
      <main>
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-50 via-sky-50 to-white overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Free Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              {t('common.freeBadge')}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('cv.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('cv.subtitle')}
            </p>

            {/* Main CTA Button */}
            <div className="flex justify-center mb-12">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
              >
                <FileText className="w-5 h-5" />
                {t('common.startButton')}
              </Link>
            </div>

            {/* Language Selection */}
            <div className="mt-8">
              <p className="text-gray-400 mb-5 text-sm">{t('common.chooseLanguage')}:</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {languages.map((lang) => {
                  const isActive = locale === lang.code;
                  return (
                    <Link
                      key={lang.code}
                      href="/"
                      locale={lang.code}
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl transition-all font-medium ${
                        isActive
                          ? 'border-blue-500 text-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {isActive && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Current language indicator */}
              <p className="mt-4 text-sm text-gray-400">
                {locale === 'fr' && '✓ Français sélectionné'}
                {locale === 'en' && '✓ English selected'}
                {locale === 'wo' && '✓ Wolof tànnal na'}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              {t('common.whyChooseUs')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {t('common.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              {t('common.ctaSubtitle')}
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl shadow-lg shadow-green-500/25 transition-all hover:shadow-xl"
            >
              {t('common.createNow')}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold">CV Sénégal</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('common.footerText')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
