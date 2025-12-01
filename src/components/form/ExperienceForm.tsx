'use client';

import { Experience } from '@/types/cv';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Expérience Professionnelle</h2>
        <p className="text-gray-600 text-sm">Ajoutez vos expériences de travail</p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">Aucune expérience ajoutée</p>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Expérience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Expérience {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Position and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Poste <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                      placeholder="Développeur Web"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                      placeholder="Nom de l'entreprise"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={experience.location || ''}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                    placeholder="Dakar, Sénégal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de Début <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de Fin
                    </label>
                    <input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Current Position Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => {
                      updateExperience(experience.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${experience.id}`} className="ml-2 text-sm text-gray-700">
                    Je travaille actuellement ici
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    placeholder="Décrivez vos responsabilités et réalisations... &#10;• Géré une équipe de 5 personnes&#10;• Développé et maintenu des applications web&#10;• Amélioration de 30% de la productivité"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisez des puces (•) pour lister vos réalisations
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            onClick={addExperience}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter une Autre Expérience
          </button>
        </div>
      )}
    </div>
  );
}
