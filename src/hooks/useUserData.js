import { useState, useEffect } from 'react';
import api from '../utils/axios';

const useUserData = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('users/me');
        console.log(response.data.data)
        
        if (response.data.data) {
          setUserDetails(response.data.data);
          localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        }
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userDetails, loading, setUserDetails, error };
};

export default useUserData;
