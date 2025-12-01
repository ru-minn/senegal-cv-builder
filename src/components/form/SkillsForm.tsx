'use client';

import { Skill } from '@/types/cv';
import { Plus, Trash2, Star, Award } from 'lucide-react';

export interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 3,
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    onChange(
      data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  const getLevelLabel = (level: number): string => {
    const labels = ['Débutant', 'Élémentaire', 'Intermédiaire', 'Avancé', 'Expert'];
    return labels[level - 1] || 'Intermédiaire';
  };

  const renderStars = (skillId: string, currentLevel: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => updateSkill(skillId, 'level', level)}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Niveau ${level}`}
          >
            <Star
              className={`w-6 h-6 ${
                level <= currentLevel
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Compétences</h2>
        <p className="text-gray-600 text-sm">Ajoutez vos compétences et leur niveau de maîtrise</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Conseil :</p>
            <p className="text-blue-700">
              Ajoutez des compétences techniques et professionnelles pertinentes pour votre domaine.
              Soyez honnête sur votre niveau de maîtrise.
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">Aucune compétence ajoutée</p>
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Compétence
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((skill, index) => (
            <div
              key={skill.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        placeholder="Ex: JavaScript, Gestion de projet, Communication..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {renderStars(skill.id, skill.level)}
                      <span className="text-sm font-medium text-gray-700">
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {skill.level}/5
                    </div>
                  </div>

                  {/* Alternative slider view for easier mobile interaction */}
                  <div className="mt-3 md:hidden">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            onClick={addSkill}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter une Autre Compétence
          </button>
        </div>
      )}

      {/* Examples Section */}
      {data.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Exemples de compétences :</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
            <div>• Microsoft Office</div>
            <div>• Gestion de projet</div>
            <div>• Communication</div>
            <div>• Travail d'équipe</div>
            <div>• Langages de programmation</div>
            <div>• Réseaux sociaux</div>
            <div>• Comptabilité</div>
            <div>• Service client</div>
            <div>• Leadership</div>
          </div>
        </div>
      )}
    </div>
  );
}
