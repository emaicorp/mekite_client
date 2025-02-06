import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './config/i18n';
import i18n from './config/i18n';
import { useNetwork } from './hooks/useNetwork';
import { useCountries } from './hooks/useCountries';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  const networkStatus = useNetwork();
  const countries = useCountries();

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
  };

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Header
          countries={countries}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <AppRoutes
          loading={loading}
          setLoading={setLoading}
          networkStatus={networkStatus}
        />
      </Router>
    </>
  );
};

export default App;
