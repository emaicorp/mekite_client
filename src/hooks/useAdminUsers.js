import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserData from './useUserData';
import api from '../utils/axios';

const useAdminUsers = (endpoint) => {
  const { userData } = useUserData();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(endpoint);

        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [endpoint, userData]);

  return { users, setUsers, loading, error };
};

export default useAdminUsers; 