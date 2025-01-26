import React from 'react';
import LanguageSelector from './LanguageSelector';

const Header = ({ countries, selectedLanguage, onLanguageChange }) => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="flex justify-between items-center px-4 py-2 md:px-6">
        <LanguageSelector
          countries={countries}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </header>
  );
};

export default Header; 