import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ countries, selectedLanguage, onLanguageChange }) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <select
        className="p-2 bg-gray-700 text-white rounded-md w-full sm:w-auto"
        onChange={(e) => onLanguageChange(e.target.value)}
        value={selectedLanguage}
      >
        <option value="">{t('selectLanguage')}</option>
        {countries.map((country) =>
          country.languages.map((language) => (
            <option key={`${country.name}-${language}`} value={language}>
              {language} ({country.name})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default LanguageSelector; 