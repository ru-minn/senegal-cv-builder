'use client';

import { Language } from '@/types/cv';
import { Plus, Trash2, Languages } from 'lucide-react';

export interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const PROFICIENCY_LEVELS = [
  { value: 'Débutant', label: 'Débutant', description: 'Notions de base' },
  { value: 'Intermédiaire', label: 'Intermédiaire', description: 'Conversation simple' },
  { value: 'Avancé', label: 'Avancé', description: 'Utilisation professionnelle' },
  { value: 'Courant', label: 'Courant', description: 'Maîtrise complète' },
  { value: 'Langue maternelle', label: 'Langue maternelle', description: 'Langue native' },
] as const;

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Langues</h2>
        <p className="text-gray-600 text-sm">Indiquez les langues que vous parlez</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Languages className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Conseil :</p>
            <p className="text-blue-700">
              Mentionnez toutes les langues pertinentes pour votre domaine professionnel.
              La maîtrise de plusieurs langues est un atout majeur au Sénégal.
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Languages className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">Aucune langue ajoutée</p>
          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Langue
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((language, index) => (
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
                        placeholder="Ex: Français, Wolof, Anglais..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Proficiency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau de Maîtrise
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
                          <div className="font-medium text-sm">{level.label}</div>
                          <div className="text-xs text-gray-600">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getProficiencyColor(language.proficiency)}`}>
                        {language.proficiency}
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
            Ajouter une Autre Langue
          </button>
        </div>
      )}

      {/* Common Languages Section */}
      {data.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Langues courantes au Sénégal :</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
            <div>• Français</div>
            <div>• Wolof</div>
            <div>• Pulaar</div>
            <div>• Serer</div>
            <div>• Diola</div>
            <div>• Mandingue</div>
            <div>• Soninké</div>
            <div>• Anglais</div>
          </div>
        </div>
      )}
    </div>
  );
}
