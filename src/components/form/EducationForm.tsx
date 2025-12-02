'use client';

import { Education } from '@/types/cv';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const t = useTranslations();

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('sections.education')}</h2>
        <p className="text-gray-600 text-sm">{t('form.addYourEducation')}</p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">{t('form.noEducationAdded')}</p>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('education.addEducation')}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={education.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('form.educationNumber')} {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  aria-label={t('common.delete')}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Degree and Field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.degree')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                      placeholder="Bachelor&apos;s, Master&apos;s, High School..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.fieldOfStudy')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                      placeholder="Computer Science, Business, Sciences..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                </div>

                {/* School and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.institution')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={education.school}
                      onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                      placeholder="University, School, High School..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.location')}
                    </label>
                    <input
                      type="text"
                      value={education.location || ''}
                      onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                      placeholder="Dakar, Sénégal"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.startDate')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('education.endDate')}
                    </label>
                    <input
                      type="month"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                      disabled={education.current}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Current Studies Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${education.id}`}
                    checked={education.current}
                    onChange={(e) => {
                      updateEducation(education.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateEducation(education.id, 'endDate', '');
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${education.id}`} className="ml-2 text-sm text-gray-700">
                    {t('form.currentStudies')}
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('education.description')}
                  </label>
                  <textarea
                    value={education.description || ''}
                    onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                    placeholder={t('form.descriptionPlaceholder')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('form.educationDescHint')}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            onClick={addEducation}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('form.addAnother')} {t('sections.education')}
          </button>
        </div>
      )}
    </div>
  );
}
