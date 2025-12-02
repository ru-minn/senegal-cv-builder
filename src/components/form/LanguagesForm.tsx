'use client';

import { Language } from '@/types/cv';
import { Plus, Trash2, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const t = useTranslations();

  const PROFICIENCY_LEVELS = [
    { value: 'Débutant', labelKey: 'beginner' },
    { value: 'Intermédiaire', labelKey: 'intermediate' },
    { value: 'Avancé', labelKey: 'advanced' },
    { value: 'Courant', labelKey: 'fluent' },
    { value: 'Langue maternelle', labelKey: 'native' },
  ] as const;

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermédiaire',
    };
    onChange([...data, newLanguage]);
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange(
      data.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  const getProficiencyLabel = (proficiency: Language['proficiency']): string => {
    const level = PROFICIENCY_LEVELS.find(l => l.value === proficiency);
    if (level) {
      return t(`languages.proficiencyLevels.${level.labelKey}`);
    }
    return proficiency;
  };

  const getProficiencyColor = (proficiency: Language['proficiency']): string => {
    const colors = {
      'Débutant': 'bg-gray-200 text-gray-700',
      'Intermédiaire': 'bg-blue-200 text-blue-700',
      'Avancé': 'bg-green-200 text-green-700',
      'Courant': 'bg-purple-200 text-purple-700',
      'Langue maternelle': 'bg-orange-200 text-orange-700',
    };
    return colors[proficiency];
  };

  const getProficiencyWidth = (proficiency: Language['proficiency']): string => {
    const widths = {
      'Débutant': 'w-1/5',
      'Intermédiaire': 'w-2/5',
      'Avancé': 'w-3/5',
      'Courant': 'w-4/5',
      'Langue maternelle': 'w-full',
    };
    return widths[proficiency];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('sections.languages')}</h2>
        <p className="text-gray-600 text-sm">{t('form.addYourLanguages')}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Languages className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{t('form.tip')}</p>
            <p className="text-blue-700">
              {t('form.languagesTip')}
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Languages className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">{t('form.noLanguageAdded')}</p>
          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('languages.addLanguage')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((language) => (
            <div
              key={language.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-4">
                  {/* Language Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={language.name}
                        onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                        placeholder={t('languages.language')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                      aria-label={t('common.delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Proficiency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.proficiencyLevel')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {PROFICIENCY_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => updateLanguage(language.id, 'proficiency', level.value)}
                          className={`px-3 py-2 rounded-lg border-2 transition-all text-left ${
                            language.proficiency === level.value
                              ? 'border-blue-500 bg-blue-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium text-sm">{t(`languages.proficiencyLevels.${level.labelKey}`)}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getProficiencyColor(language.proficiency)}`}>
                        {getProficiencyLabel(language.proficiency)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ${getProficiencyWidth(language.proficiency)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            onClick={addLanguage}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('form.addAnother')} {t('sections.languages')}
          </button>
        </div>
      )}

      {/* Common Languages Section */}
      {data.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">{t('form.commonLanguages')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
            <div>• French</div>
            <div>• Wolof</div>
            <div>• Pulaar</div>
            <div>• Serer</div>
            <div>• Diola</div>
            <div>• Mandingue</div>
            <div>• Soninké</div>
            <div>• English</div>
          </div>
        </div>
      )}
    </div>
  );
}
