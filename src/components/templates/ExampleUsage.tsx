'use client';

import React, { useState } from 'react';
import { TemplateWrapper, TemplateSelector } from './index';
import { CVData, TemplateType } from '@/types/cv';

// Sample CV Data for Senegal - Professional Example
const SAMPLE_CV_DATA: CVData = {
  personalInfo: {
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'amadou.diallo@email.sn',
    phone: '+221 77 123 45 67',
    address: 'Rue 10, Sicap Liberté',
    city: 'Dakar',
    country: 'Sénégal',
    postalCode: '12500',
    dateOfBirth: '15 Mars 1990',
    nationality: 'Sénégalaise',
    photo: undefined, // Add base64 or URL here
  },
  objective:
    "Professionnel dynamique avec plus de 5 ans d'expérience en développement informatique et gestion de projets. Passionné par les nouvelles technologies et l'innovation digitale en Afrique. Cherche à contribuer au développement numérique du Sénégal à travers des solutions technologiques innovantes.",
  experiences: [
    {
      id: '1',
      position: 'Développeur Full Stack Senior',
      company: 'Tech Afrique Solutions',
      location: 'Dakar, Sénégal',
      startDate: 'Janvier 2021',
      endDate: '',
      current: true,
      description:
        "Développement d'applications web et mobiles pour des clients locaux et internationaux. Gestion d'une équipe de 4 développeurs juniors. Mise en place de bonnes pratiques de développement et de méthodologies agiles.",
    },
    {
      id: '2',
      position: 'Développeur Web',
      company: 'Digital Services SARL',
      location: 'Dakar, Sénégal',
      startDate: 'Mars 2019',
      endDate: 'Décembre 2020',
      current: false,
      description:
        "Création de sites web et d'applications e-commerce pour les PME sénégalaises. Maintenance et optimisation des plateformes existantes. Formation des clients à l'utilisation des outils digitaux.",
    },
    {
      id: '3',
      position: 'Développeur Junior',
      company: 'StartUp Innovation Hub',
      location: 'Dakar, Sénégal',
      startDate: 'Juin 2018',
      endDate: 'Février 2019',
      current: false,
      description:
        "Premier poste dans le développement web. Participation au développement de solutions fintech pour l'inclusion financière. Apprentissage des technologies modernes et des frameworks JavaScript.",
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Master en Informatique',
      school: 'Université Cheikh Anta Diop (UCAD)',
      field: 'Génie Logiciel et Systèmes Informatiques',
      location: 'Dakar, Sénégal',
      startDate: '2016',
      endDate: '2018',
      current: false,
      description: 'Mention Bien - Projet de fin d\'études sur les applications mobiles pour l\'agriculture',
    },
    {
      id: '2',
      degree: 'Licence en Mathématiques-Informatique',
      school: 'Université Gaston Berger (UGB)',
      field: 'Mathématiques et Informatique',
      location: 'Saint-Louis, Sénégal',
      startDate: '2013',
      endDate: '2016',
      current: false,
      description: 'Formation de base en algorithmique, programmation et bases de données',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript/TypeScript', level: 5 },
    { id: '2', name: 'React & Next.js', level: 5 },
    { id: '3', name: 'Node.js & Express', level: 4 },
    { id: '4', name: 'Python & Django', level: 4 },
    { id: '5', name: 'SQL & MongoDB', level: 4 },
    { id: '6', name: 'Git & DevOps', level: 3 },
    { id: '7', name: 'UI/UX Design', level: 3 },
  ],
  languages: [
    { id: '1', name: 'Français', proficiency: 'Langue maternelle' },
    { id: '2', name: 'Wolof', proficiency: 'Langue maternelle' },
    { id: '3', name: 'Anglais', proficiency: 'Courant' },
    { id: '4', name: 'Arabe', proficiency: 'Intermédiaire' },
  ],
};

export default function ExampleUsage() {
  const [templateType, setTemplateType] = useState<TemplateType>('modern');
  const [accentColor, setAccentColor] = useState('#DC2626');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Générateur de CV Sénégal
          </h1>
          <p className="text-gray-600">
            Créez votre CV professionnel avec nos modèles adaptés au marché sénégalais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Personnalisation
              </h2>
              <TemplateSelector
                selectedTemplate={templateType}
                onSelectTemplate={setTemplateType}
                selectedColor={accentColor}
                onSelectColor={setAccentColor}
              />

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Imprimer / Télécharger PDF
                </button>
                <button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Modifier les informations
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - CV Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-lg shadow-xl p-4">
              <TemplateWrapper
                data={SAMPLE_CV_DATA}
                templateType={templateType}
                config={{ accentColor }}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Comment utiliser ce générateur de CV
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Choisissez un modèle</h4>
              <p className="text-gray-600 text-sm">
                Sélectionnez le design qui correspond le mieux à votre profil et au secteur visé
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Personnalisez</h4>
              <p className="text-gray-600 text-sm">
                Modifiez les couleurs et remplissez vos informations personnelles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Téléchargez</h4>
              <p className="text-gray-600 text-sm">
                Imprimez ou téléchargez votre CV en PDF pour vos candidatures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          .no-print,
          button,
          nav,
          .sticky {
            display: none !important;
          }

          body {
            background: white !important;
          }

          .lg\\:col-span-2 {
            width: 100% !important;
            max-width: 100% !important;
          }

          .grid {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
