import React, { useEffect, useState } from 'react';

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

  const changeLanguage = (languageCode) => {
    try {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event('change'));
      }
    } catch (error) {
      setErrorMessage('Failed to change language.');
      console.error('Language change error:', error);
    }
  };

  return (
    <div className="language-translator">
      <div className="flex items-center space-x-4">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      
        <button onClick={() => changeLanguage('en')} className=" p-2 border-blue-400  border-2 rounded" title="English">English</button>

        {/* Language Dropdown */}
        <select onChange={(e) => changeLanguage(e.target.value)} className="bg-gray-800 text-white border-blue-400  border-2 rounded  px-4 py-2  focus:ring-2 focus:ring-blue-500">
          <option value="">Select Language</option>
          <option value="af">Afrikaans</option>
          <option value="sq">Albanian</option>
          <option value="ar">Arabic</option>
          <option value="hy">Armenian</option>
          <option value="az">Azerbaijani</option>
          <option value="eu">Basque</option>
          <option value="be">Belarusian</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="et">Estonian</option>
          <option value="tl">Filipino</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="gl">Galician</option>
          <option value="ka">Georgian</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="ht">Haitian Creole</option>
          <option value="iw">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="id">Indonesian</option>
          <option value="ga">Irish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="lv">Latvian</option>
          <option value="lt">Lithuanian</option>
          <option value="mk">Macedonian</option>
          <option value="ms">Malay</option>
          <option value="mt">Maltese</option>
          <option value="no">Norwegian</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sr">Serbian</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="es">Spanish</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="th">Thai</option>
          <option value="tr">Turkish</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
          <option value="yi">Yiddish</option>
        </select>

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
