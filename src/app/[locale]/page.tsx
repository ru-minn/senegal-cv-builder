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

  const languages: { code: LocaleType; name: string; flag: string; borderColor: string; textColor: string; bgHover: string; bgActive: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', borderColor: 'border-blue-500', textColor: 'text-blue-600', bgHover: 'hover:bg-blue-50', bgActive: 'bg-blue-100' },
    { code: 'en', name: 'English', flag: '🇬🇧', borderColor: 'border-green-500', textColor: 'text-green-600', bgHover: 'hover:bg-green-50', bgActive: 'bg-green-100' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳', borderColor: 'border-orange-500', textColor: 'text-orange-600', bgHover: 'hover:bg-orange-50', bgActive: 'bg-orange-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CV Sénégal</span>
            </div>

            {/* Header Language Switcher */}
            <div className="flex items-center gap-1">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href="/"
                  locale={lang.code}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all font-medium ${
                    locale === lang.code
                      ? `${lang.bgActive} ${lang.textColor} ring-2 ring-offset-1 ${lang.borderColor.replace('border-', 'ring-')}`
                      : `${lang.bgHover} text-gray-600`
                  }`}
                >
                  {lang.code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              {t('common.freeBadge')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('cv.title')}
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {t('cv.subtitle')}
            </p>

            {/* Main CTA Button - Goes to builder in current locale */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                <FileText className="w-5 h-5" />
                {t('common.startButton')}
              </Link>
            </div>

            {/* Language Selection */}
            <div className="mt-12">
              <p className="text-gray-500 mb-4">{t('common.chooseLanguage')}:</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {languages.map((lang) => {
                  const isActive = locale === lang.code;
                  return (
                    <Link
                      key={lang.code}
                      href="/"
                      locale={lang.code}
                      className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-lg transition-all font-medium ${
                        isActive
                          ? `${lang.borderColor} ${lang.textColor} ${lang.bgActive} ring-2 ring-offset-2 ${lang.borderColor.replace('border-', 'ring-')} shadow-md scale-105`
                          : `border-gray-200 text-gray-600 bg-white ${lang.bgHover}`
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      {lang.name}
                      {isActive && (
                        <CheckCircle className={`w-4 h-4 ${lang.textColor}`} />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Current language indicator */}
              <p className="mt-4 text-sm text-gray-500">
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('common.whyChooseUs')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('common.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('common.ctaSubtitle')}
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105"
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
