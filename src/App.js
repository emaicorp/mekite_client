import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNetwork } from './hooks/useNetwork';
import { useCountries } from './hooks/useCountries';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
// import TawkToChat from './components/TawkToChat';
import SmartsuppChat from './components/smartSuppChat';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  const networkStatus = useNetwork();
  const countries = useCountries();

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <>
        {/* <TawkToChat /> */}
         <SmartsuppChat /> 
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
