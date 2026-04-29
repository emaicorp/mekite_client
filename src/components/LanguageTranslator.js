import React, { useEffect } from 'react';
import LanguageSelector from './LanguageSelector';

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

function LanguageTranslator() {
  useEffect(() => {
    const initTranslator = () => {
      const translateRoot = document.getElementById('google_translate_element');

      if (
        !translateRoot ||
        !window.google?.translate?.TranslateElement ||
        translateRoot.dataset.initialized === 'true'
      ) {
        return;
      }

      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
        translateRoot.dataset.initialized = 'true';
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    window.googleTranslateElementInit = initTranslator;

    if (window.google?.translate?.TranslateElement) {
      initTranslator();
      return () => {
        if (window.googleTranslateElementInit === initTranslator) {
          delete window.googleTranslateElementInit;
        }
      };
    }

    if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (window.googleTranslateElementInit === initTranslator) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);


  return (
    <div className="language-translator">
      <div className="flex items-center space-x-4">
        <LanguageSelector />

        {/* Google Translate Element */}
        <div
          id="google_translate_element"
          className="hidden notranslate"
          translate="no"
        ></div>
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
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
      `}</style>
    </div>
  );
}

export default LanguageTranslator;
