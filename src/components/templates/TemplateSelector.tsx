'use client';

import React, { useState } from 'react';
import { TemplateType } from '@/types/cv';

interface TemplateOption {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  accentColors: string[];
}

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design moderne avec sidebar colorée, photo circulaire et barres de progression',
    preview: '/templates/modern-preview.svg',
    accentColors: ['#DC2626', '#0891B2', '#7C3AED', '#059669', '#EA580C'],
  },
  {
    id: 'classic',
    name: 'Classique',
    description: 'Design traditionnel et élégant, parfait pour les secteurs formels',
    preview: '/templates/classic-preview.svg',
    accentColors: ['#1E40AF', '#065F46', '#7C2D12', '#4C1D95', '#92400E'],
  },
];

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  selectedColor,
  onSelectColor,
}: TemplateSelectorProps) {
  const currentTemplate = TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Choisissez un modèle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATE_OPTIONS.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`relative group rounded-lg border-2 p-4 text-left transition-all hover:shadow-lg ${
                selectedTemplate === template.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Preview Thumbnail */}
              <div className="mb-3 aspect-[210/297] bg-gray-100 rounded overflow-hidden relative">
                {/* Placeholder preview - you can replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {template.id === 'modern' ? (
                    <div className="w-full h-full flex">
                      <div className="w-[35%] bg-red-600" />
                      <div className="w-[65%] bg-white" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white p-4">
                      <div className="h-8 bg-blue-800 mb-2" />
                      <div className="h-1 bg-gray-300 mb-4" />
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200" />
                        <div className="h-2 bg-gray-200 w-3/4" />
                      </div>
                    </div>
                  )}
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      {onSelectColor && currentTemplate && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Couleur d'accent</h3>
          <div className="flex gap-3">
            {currentTemplate.accentColors.map((color) => (
              <button
                key={color}
                onClick={() => onSelectColor(color)}
                className={`relative w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                  selectedColor === color ? 'ring-4 ring-blue-600 ring-offset-2' : 'ring-2 ring-gray-200'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              >
                {selectedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template Features */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Caractéristiques:</h4>
        <ul className="space-y-1 text-sm text-gray-700">
          {selectedTemplate === 'modern' ? (
            <>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Sidebar colorée avec photo circulaire
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Barres de progression pour les compétences
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Timeline verticale pour l'expérience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Design contemporain et créatif
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                En-tête centré avec informations de contact
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Layout traditionnel et formel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Indicateurs de niveau pour compétences
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Idéal pour secteurs conservateurs
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
