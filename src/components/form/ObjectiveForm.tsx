'use client';

import { FileText } from 'lucide-react';

export interface ObjectiveFormProps {
  data: string;
  onChange: (data: string) => void;
}

export default function ObjectiveForm({ data, onChange }: ObjectiveFormProps) {
  const maxLength = 500;
  const remainingChars = maxLength - data.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Objectif de Carrière</h2>
        <p className="text-gray-600 text-sm">Décrivez brièvement vos objectifs professionnels</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Conseil :</p>
            <p className="text-blue-700">
              Décrivez qui vous êtes professionnellement, vos compétences clés, et ce que vous recherchez.
              Gardez-le concis et pertinent pour le poste visé.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Résumé Professionnel
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Exemple : Professionnel dynamique avec 5 ans d'expérience dans le marketing digital, passionné par les stratégies de communication innovantes. À la recherche d'opportunités pour contribuer à la croissance d'une entreprise en pleine expansion..."
          rows={6}
          maxLength={maxLength}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Décrivez vos objectifs en 2-4 phrases
          </p>
          <p className={`text-xs ${remainingChars < 50 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
            {remainingChars} caractères restants
          </p>
        </div>
      </div>

      {/* Example/Template Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Exemples :</p>
        <div className="space-y-2">
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>Marketing :</strong> "Spécialiste marketing digital avec 3 ans d'expérience en gestion de campagnes sur les réseaux sociaux. Expertise en analyse de données et création de contenu engageant."
          </div>
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>Informatique :</strong> "Développeur full-stack passionné par les technologies web modernes. Compétent en React, Node.js et bases de données. Cherche à contribuer à des projets innovants."
          </div>
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>Commerce :</strong> "Commercial motivé avec un excellent sens du relationnel. Expérience prouvée dans l'atteinte des objectifs de vente. Souhait de développer mon expertise dans le secteur des télécommunications."
          </div>
        </div>
      </div>
    </div>
  );
}
