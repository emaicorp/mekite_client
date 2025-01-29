import React from 'react';

function LanguageSelector({ buttonStyle, selectStyle }) {
  const changeLanguage = (languageCode) => {
    try {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = languageCode;
        select.dispatchEvent(new Event('change'));
      }
    } catch (error) {
      console.error('Language change error:', error);
    }
  };

  // Default styles that can be overridden via props
  const defaultButtonStyle = "p-2 border-blue-400 border-2 rounded";
  const defaultSelectStyle = "bg-gray-800 text-white border-blue-400 border-2 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500";

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => changeLanguage('en')} 
        className={buttonStyle || defaultButtonStyle} 
        title="English"
      >
        English
      </button>

      <select 
        onChange={(e) => changeLanguage(e.target.value)} 
        className={selectStyle || defaultSelectStyle}
      >
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
    </div>
  );
}

export default LanguageSelector; 