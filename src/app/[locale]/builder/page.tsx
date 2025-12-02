'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCVStore } from '@/store/cvStore';
import PersonalInfoForm from '@/components/form/PersonalInfoForm';
import ObjectiveForm from '@/components/form/ObjectiveForm';
import ExperienceForm from '@/components/form/ExperienceForm';
import EducationForm from '@/components/form/EducationForm';
import SkillsForm from '@/components/form/SkillsForm';
import LanguagesForm from '@/components/form/LanguagesForm';
import TemplateWrapper from '@/components/templates/TemplateWrapper';
import TemplateSelector from '@/components/templates/TemplateSelector';
import ExportButton from '@/components/ExportButton';
import { Link } from '@/i18n/routing';
import {
  User,
  Target,
  Briefcase,
  GraduationCap,
  Star,
  Languages,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Menu,
  X,
} from 'lucide-react';

const STEPS = [
  { id: 'personal', icon: User },
  { id: 'objective', icon: Target },
  { id: 'experience', icon: Briefcase },
  { id: 'education', icon: GraduationCap },
  { id: 'skills', icon: Star },
  { id: 'languages', icon: Languages },
  { id: 'template', icon: FileText },
  { id: 'preview', icon: Eye },
];

export default function BuilderPage() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const store = useCVStore();
  const {
    cvData,
    selectedTemplate,
    accentColor,
    setTemplate,
    setAccentColor,
    resetCV,
  } = store;

  // Wrapper functions for form components that expect data/onChange interface
  const handlePersonalInfoChange = (data: typeof cvData.personalInfo) => {
    store.updatePersonalInfo(data);
  };

  const handleObjectiveChange = (data: string) => {
    store.updateObjective(data);
  };

  const handleExperiencesChange = (data: typeof cvData.experiences) => {
    // Replace all experiences with new data
    cvData.experiences.forEach(exp => store.removeExperience(exp.id));
    data.forEach(exp => {
      if (!cvData.experiences.find(e => e.id === exp.id)) {
        store.addExperience(exp);
      }
    });
  };

  const handleEducationChange = (data: typeof cvData.education) => {
    // Replace all education with new data
    cvData.education.forEach(edu => store.removeEducation(edu.id));
    data.forEach(edu => {
      if (!cvData.education.find(e => e.id === edu.id)) {
        store.addEducation(edu);
      }
    });
  };

  const handleSkillsChange = (data: typeof cvData.skills) => {
    // Replace all skills with new data
    cvData.skills.forEach(skill => store.removeSkill(skill.id));
    data.forEach(skill => {
      if (!cvData.skills.find(s => s.id === skill.id)) {
        store.addSkill(skill);
      }
    });
  };

  const handleLanguagesChange = (data: typeof cvData.languages) => {
    // Replace all languages with new data
    cvData.languages.forEach(lang => store.removeLanguage(lang.id));
    data.forEach(lang => {
      if (!cvData.languages.find(l => l.id === lang.id)) {
        store.addLanguage(lang);
      }
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const stepLabels: Record<string, string> = {
    personal: t('sections.personalInfo'),
    objective: t('sections.objective'),
    experience: t('sections.experience'),
    education: t('sections.education'),
    skills: t('sections.skills'),
    languages: t('sections.languages'),
    template: t('templates.title'),
    preview: t('cv.preview'),
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    if (confirm(t('common.confirmReset'))) {
      resetCV();
    }
  };

  const accentColorMap: Record<string, string> = {
    blue: '#2563EB',
    green: '#059669',
    purple: '#7C3AED',
    red: '#DC2626',
    orange: '#EA580C',
    teal: '#0D9488',
  };

  const renderCurrentForm = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={cvData.personalInfo}
            onChange={handlePersonalInfoChange}
          />
        );
      case 'objective':
        return (
          <ObjectiveForm
            data={cvData.objective}
            onChange={handleObjectiveChange}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={cvData.experiences}
            onChange={handleExperiencesChange}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={cvData.education}
            onChange={handleEducationChange}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={cvData.skills}
            onChange={handleSkillsChange}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            data={cvData.languages}
            onChange={handleLanguagesChange}
          />
        );
      case 'template':
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate as 'modern' | 'classic' | 'minimal' | 'professional'}
            onSelectTemplate={(template) => setTemplate(template)}
            selectedColor={accentColorMap[accentColor]}
            onSelectColor={(color) => {
              const colorKey = Object.entries(accentColorMap).find(
                ([, value]) => value === color
              )?.[0];
              if (colorKey) {
                setAccentColor(colorKey as typeof accentColor);
              }
            }}
          />
        );
      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-4 overflow-auto max-h-[70vh]">
              <TemplateWrapper
                data={cvData}
                templateType={selectedTemplate as 'modern' | 'classic' | 'minimal' | 'professional'}
                config={{ accentColor: accentColorMap[accentColor] }}
              />
            </div>
            <div className="flex justify-center">
              <ExportButton
                firstName={cvData.personalInfo.firstName}
                lastName={cvData.personalInfo.lastName}
                fullWidth
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">{t('cv.title')}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title={t('common.reset')}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation - Desktop */}
          <nav className="hidden md:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {t('common.steps')}
              </h2>
              <ul className="space-y-1">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => setCurrentStep(index)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : isCompleted
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{stepLabels[step.id]}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="absolute left-0 top-16 bottom-0 w-72 bg-white shadow-xl p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {t('common.steps')}
                </h2>
                <ul className="space-y-1">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;

                    return (
                      <li key={step.id}>
                        <button
                          onClick={() => {
                            setCurrentStep(index);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{stepLabels[step.id]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Progress Bar - Mobile */}
            <div className="md:hidden mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {t('common.step')} {currentStep + 1} / {STEPS.length}
                </span>
                <span className="text-sm text-gray-500">{stepLabels[STEPS[currentStep].id]}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {stepLabels[STEPS[currentStep].id]}
              </h2>
              {renderCurrentForm()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>{t('common.previous')}</span>
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <span>{t('common.next')}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <ExportButton
                  firstName={cvData.personalInfo.firstName}
                  lastName={cvData.personalInfo.lastName}
                />
              )}
            </div>
          </main>

          {/* Live Preview - Desktop */}
          <aside className="hidden lg:block lg:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {t('cv.preview')}
                </h3>
                <div className="transform scale-[0.4] origin-top-left w-[250%] h-[600px] overflow-hidden">
                  <TemplateWrapper
                    data={cvData}
                    templateType={selectedTemplate as 'modern' | 'classic' | 'minimal' | 'professional'}
                    config={{ accentColor: accentColorMap[accentColor] }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-full max-h-full overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('cv.preview')}</h3>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="transform scale-50 origin-top-left w-[200%]">
              <TemplateWrapper
                data={cvData}
                templateType={selectedTemplate as 'modern' | 'classic' | 'minimal' | 'professional'}
                config={{ accentColor: accentColorMap[accentColor] }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
