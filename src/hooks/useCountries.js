import { useState, useEffect } from 'react';
import axios from 'axios';
import { COUNTRY_API } from '../config/constants';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(COUNTRY_API);
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          languages: country.languages ? Object.values(country.languages) : [],
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return countries;
}; 