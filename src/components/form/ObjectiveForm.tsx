'use client';

import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface ObjectiveFormProps {
  data: string;
  onChange: (data: string) => void;
}

export default function ObjectiveForm({ data, onChange }: ObjectiveFormProps) {
  const t = useTranslations();
  const maxLength = 500;
  const remainingChars = maxLength - data.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('sections.objective')}</h2>
        <p className="text-gray-600 text-sm">{t('objective.placeholder')}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">{t('form.tip')}</p>
            <p className="text-blue-700">
              {t('form.objectiveTip')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('sections.summary')}
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('objective.placeholder')}
          rows={6}
          maxLength={maxLength}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {t('objective.placeholder')}
          </p>
          <p className={`text-xs ${remainingChars < 50 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
            {remainingChars}
          </p>
        </div>
      </div>

      {/* Example/Template Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">{t('form.objectiveExamples')}</p>
        <div className="space-y-2">
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>Marketing:</strong> &quot;{t('form.marketingExample')}&quot;
          </div>
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>IT:</strong> &quot;{t('form.itExample')}&quot;
          </div>
          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
            <strong>Sales:</strong> &quot;{t('form.salesExample')}&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
