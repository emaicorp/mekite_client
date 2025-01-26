import { useState, useEffect } from 'react';

export const useNetwork = () => {
  const [networkStatus, setNetworkStatus] = useState(true);

  useEffect(() => {
    const checkNetwork = () => {
      setNetworkStatus(navigator.onLine);
    };

    window.addEventListener("online", checkNetwork);
    window.addEventListener("offline", checkNetwork);
    checkNetwork();

    return () => {
      window.removeEventListener("online", checkNetwork);
      window.removeEventListener("offline", checkNetwork);
    };
  }, []);

  return networkStatus;
}; 