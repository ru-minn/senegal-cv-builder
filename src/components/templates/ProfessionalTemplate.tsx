import React from 'react';
import { CVData, TemplateConfig } from '@/types/cv';

interface ProfessionalTemplateProps {
  data: CVData;
  config?: TemplateConfig;
}

export default function ProfessionalTemplate({ data, config }: ProfessionalTemplateProps) {
  const accentColor = config?.accentColor || '#1E3A5F'; // dark blue default

  return (
    <div className="w-full h-full bg-white font-sans" style={{ fontFamily: config?.fontFamily || 'Georgia, serif' }}>
      {/* Header with accent background */}
      <header className="px-10 py-8 text-white" style={{ backgroundColor: accentColor }}>
        <div className="flex items-center gap-8">
          {/* Photo */}
          {data.personalInfo.photo && (
            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img
                src={data.personalInfo.photo}
                alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm opacity-90">
              {data.personalInfo.email && (
                <span className="flex items-center gap-1">
                  <span>✉</span> {data.personalInfo.email}
                </span>
              )}
              {data.personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <span>☎</span> {data.personalInfo.phone}
                </span>
              )}
              {data.personalInfo.address && (
                <span className="flex items-center gap-1">
                  <span>📍</span> {data.personalInfo.address}, {data.personalInfo.city}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-10 py-8">
        {/* Objective */}
        {data.objective && (
          <section className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: accentColor }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              Objectif Professionnel
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.objective}</p>
          </section>
        )}

        <div className="flex gap-10">
          {/* Main Content - Left Column (65%) */}
          <div className="w-[65%]">
            {/* Experience */}
            {data.experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 flex items-center gap-2" style={{ color: accentColor, borderColor: accentColor }}>
                  <span>💼</span> Expérience Professionnelle
                </h2>
                <div className="space-y-5">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-sm font-medium" style={{ color: accentColor }}>
                            {exp.company}
                            {exp.location && ` — ${exp.location}`}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                          {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 flex items-center gap-2" style={{ color: accentColor, borderColor: accentColor }}>
                  <span>🎓</span> Formation
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-sm" style={{ color: accentColor }}>
                            {edu.school}
                            {edu.field && ` — ${edu.field}`}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                          {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Right Column (35%) */}
          <div className="w-[35%]">
            {/* Skills */}
            {data.skills.length > 0 && (
              <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                  <span>⭐</span> Compétences
                </h2>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(skill.level / 5) * 100}%`,
                            backgroundColor: accentColor,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <section className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                  <span>🌍</span> Langues
                </h2>
                <div className="space-y-2">
                  {data.languages.map((language) => (
                    <div key={language.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{language.name}</span>
                      <span className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: accentColor }}>
                        {language.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Info */}
            {(data.personalInfo.dateOfBirth || data.personalInfo.nationality) && (
              <section className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Informations
                </h2>
                <div className="space-y-2 text-sm">
                  {data.personalInfo.dateOfBirth && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date de naissance</span>
                      <span className="text-gray-700">{data.personalInfo.dateOfBirth}</span>
                    </div>
                  )}
                  {data.personalInfo.nationality && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nationalité</span>
                      <span className="text-gray-700">{data.personalInfo.nationality}</span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .w-full {
            width: 210mm;
            height: 297mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
