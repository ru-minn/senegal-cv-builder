import React from 'react';
import { CVData, TemplateConfig } from '@/types/cv';

interface MinimalTemplateProps {
  data: CVData;
  config?: TemplateConfig;
}

export default function MinimalTemplate({ data, config }: MinimalTemplateProps) {
  const accentColor = config?.accentColor || '#374151'; // gray-700 default

  return (
    <div className="w-full h-full bg-white font-sans p-12" style={{ fontFamily: config?.fontFamily || 'system-ui' }}>
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-wide mb-2" style={{ color: accentColor }}>
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <>
              <span className="text-gray-300">|</span>
              <span>{data.personalInfo.phone}</span>
            </>
          )}
          {data.personalInfo.city && (
            <>
              <span className="text-gray-300">|</span>
              <span>{data.personalInfo.city}{data.personalInfo.country && `, ${data.personalInfo.country}`}</span>
            </>
          )}
        </div>
      </header>

      {/* Objective */}
      {data.objective && (
        <section className="mb-10">
          <p className="text-gray-600 leading-relaxed text-base">{data.objective}</p>
        </section>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: accentColor }}>
            Expérience
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-400">
                    {exp.startDate} — {exp.current ? 'Présent' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: accentColor }}>
            Formation
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-400">
                    {edu.startDate} — {edu.current ? 'Présent' : edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {edu.school}
                  {edu.field && ` — ${edu.field}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      <div className="flex gap-16">
        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="flex-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accentColor }}>
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm rounded-full border"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="flex-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accentColor }}>
              Langues
            </h2>
            <div className="space-y-1">
              {data.languages.map((language) => (
                <div key={language.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{language.name}</span>
                  <span className="text-gray-400">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
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
