import React from 'react';
import LanguageTranslator from '../LanguageTranslator';


const Header = ({ countries, selectedLanguage, onLanguageChange }) => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="flex justify-between items-center px-4 py-2 md:px-6">
        <LanguageTranslator/>
      </div>
    </header>
  );
};

export default Header; 