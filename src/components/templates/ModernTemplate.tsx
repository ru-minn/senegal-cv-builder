import React from 'react';
import { CVData, TemplateConfig } from '@/types/cv';

interface ModernTemplateProps {
  data: CVData;
  config?: TemplateConfig;
}

export default function ModernTemplate({ data, config }: ModernTemplateProps) {
  const accentColor = config?.accentColor || '#DC2626'; // red-600 default

  return (
    <div className="w-full h-full bg-white font-sans" style={{ fontFamily: config?.fontFamily || 'system-ui' }}>
      <div className="flex h-full">
        {/* Left Sidebar - Colored */}
        <div
          className="w-[35%] text-white p-8 flex flex-col"
          style={{ backgroundColor: accentColor }}
        >
          {/* Photo */}
          {data.personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={data.personalInfo.photo}
                  alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-white/30">
              CONTACT
            </h3>
            <div className="space-y-3 text-sm">
              {data.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <span className="opacity-90">📱</span>
                  <span className="opacity-95">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <span className="opacity-90">✉️</span>
                  <span className="opacity-95 break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-start gap-2">
                  <span className="opacity-90">📍</span>
                  <span className="opacity-95">
                    {data.personalInfo.address}
                    {data.personalInfo.city && `, ${data.personalInfo.city}`}
                    {data.personalInfo.country && `, ${data.personalInfo.country}`}
                  </span>
                </div>
              )}
              {data.personalInfo.dateOfBirth && (
                <div className="flex items-start gap-2">
                  <span className="opacity-90">🎂</span>
                  <span className="opacity-95">{data.personalInfo.dateOfBirth}</span>
                </div>
              )}
              {data.personalInfo.nationality && (
                <div className="flex items-start gap-2">
                  <span className="opacity-90">🌍</span>
                  <span className="opacity-95">{data.personalInfo.nationality}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-white/30">
                COMPÉTENCES
              </h3>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="font-medium opacity-95">{skill.name}</span>
                      <span className="text-xs opacity-80">{skill.level}/5</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-white h-full rounded-full transition-all"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-white/30">
                LANGUES
              </h3>
              <div className="space-y-3">
                {data.languages.map((language) => (
                  <div key={language.id}>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium opacity-95">{language.name}</span>
                      <span className="text-xs opacity-80">{language.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content - White */}
        <div className="w-[65%] p-8 bg-white">
          {/* Name and Title Header */}
          <div className="mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
            <h1 className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
              {data.personalInfo.firstName.toUpperCase()} {data.personalInfo.lastName.toUpperCase()}
            </h1>
            {data.objective && (
              <p className="text-gray-600 mt-4 leading-relaxed">{data.objective}</p>
            )}
          </div>

          {/* Experience Section */}
          {data.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                <span>EXPÉRIENCE PROFESSIONNELLE</span>
              </h2>
              <div className="space-y-6">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="font-semibold" style={{ color: accentColor }}>
                          {exp.company}
                        </span>
                        {exp.location && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{exp.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
                FORMATION
              </h2>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="font-semibold" style={{ color: accentColor }}>
                          {edu.school}
                        </span>
                        {edu.location && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{edu.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                      </p>
                      {edu.field && (
                        <p className="text-sm text-gray-600 italic">Domaine: {edu.field}</p>
                      )}
                      {edu.description && (
                        <p className="text-sm text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
