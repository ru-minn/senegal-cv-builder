import React from 'react';
import { CVData, TemplateConfig } from '@/types/cv';

interface ClassicTemplateProps {
  data: CVData;
  config?: TemplateConfig;
}

export default function ClassicTemplate({ data, config }: ClassicTemplateProps) {
  const accentColor = config?.accentColor || '#1E40AF'; // blue-800 default

  return (
    <div className="w-full h-full bg-white font-serif p-12" style={{ fontFamily: config?.fontFamily || 'Georgia, serif' }}>
      {/* Header with Name and Contact */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-5xl font-bold mb-3" style={{ color: accentColor }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700 mt-4">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <span className="font-semibold">Email:</span> {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">Tél:</span> {data.personalInfo.phone}
              </span>
            </>
          )}
          {(data.personalInfo.address || data.personalInfo.city || data.personalInfo.country) && (
            <>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">Adresse:</span>{' '}
                {[data.personalInfo.address, data.personalInfo.city, data.personalInfo.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </>
          )}
        </div>

        {/* Additional Info */}
        {(data.personalInfo.dateOfBirth || data.personalInfo.nationality) && (
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mt-2">
            {data.personalInfo.dateOfBirth && (
              <span>
                <span className="font-semibold">Né(e) le:</span> {data.personalInfo.dateOfBirth}
              </span>
            )}
            {data.personalInfo.nationality && (
              <>
                <span className="text-gray-400">•</span>
                <span>
                  <span className="font-semibold">Nationalité:</span> {data.personalInfo.nationality}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Photo - Optional in classic, small and on the side */}
      {data.personalInfo.photo && (
        <div className="float-right ml-6 mb-6">
          <div className="w-32 h-32 overflow-hidden border-4 border-gray-300">
            <img
              src={data.personalInfo.photo}
              alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Objective/Profile */}
      {data.objective && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b" style={{ color: accentColor }}>
            PROFIL PROFESSIONNEL
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.objective}</p>
        </div>
      )}

      {/* Experience Section */}
      {data.experiences.length > 0 && (
        <div className="mb-8 clear-both">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ color: accentColor }}>
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-lg font-semibold" style={{ color: accentColor }}>
                      {exp.company}
                      {exp.location && (
                        <span className="text-gray-600 font-normal text-base ml-2">
                          - {exp.location}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed text-justify">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ color: accentColor }}>
            FORMATION
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-lg font-semibold" style={{ color: accentColor }}>
                      {edu.school}
                      {edu.location && (
                        <span className="text-gray-600 font-normal text-base ml-2">
                          - {edu.location}
                        </span>
                      )}
                    </p>
                    {edu.field && (
                      <p className="text-gray-600 italic mt-1">Domaine: {edu.field}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">
                    {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills and Languages - Two columns */}
      {(data.skills.length > 0 || data.languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ color: accentColor }}>
                COMPÉTENCES
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full border-2 ${
                            i < skill.level ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{
                            backgroundColor: i < skill.level ? accentColor : 'transparent',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ color: accentColor }}>
                LANGUES
              </h2>
              <div className="space-y-2">
                {data.languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{language.name}</span>
                    <span className="text-sm text-gray-600 italic">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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

          .p-12 {
            padding: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
