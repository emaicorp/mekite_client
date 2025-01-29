import React, { useEffect, useState } from 'react';
import LanguageSelector from './LanguageSelector';

function LanguageTranslator() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const initTranslator = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js';
      script.async = true;
      
      script.onload = () => {
        setTimeout(() => {
          try {
            if (!document.getElementById('google_translate_element')) {
              const translateElement = document.createElement('div');
              translateElement.id = 'google_translate_element';
              document.body.appendChild(translateElement);
            }
            
            if (window.google && window.google.translate) {
              window.google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT
              }, 'google_translate_element');
            }
          } catch (error) {
            console.error('Translation error:', error);
          }
        }, 1000);
      };

      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      initTranslator();
    } else {
      window.addEventListener('load', initTranslator);
    }

    return () => {
      window.removeEventListener('load', initTranslator);
      const element = document.getElementById('google_translate_element');
      if (element) element.remove();
    };
  }, []);


  return (
    <div className="language-translator">
      <div className="flex items-center space-x-4">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <LanguageSelector />

        {/* Google Translate Element */}
        <div id="google_translate_element" className="hidden"></div>
      </div>

      <style>{`
        .flag-icon {
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s;
          font-size: 1.5rem;
          background: none;
          border: none;
        }
        .flag-icon:hover {
          transform: scale(1.1);
        }
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-gadget { margin-top: 0 !important; }
        .skiptranslate { display: none !important; }
      `}</style>
    </div>
  );
}

export default LanguageTranslator;
