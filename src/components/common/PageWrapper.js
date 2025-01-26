import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PageWrapper = ({ component: Component, loading, setLoading, networkStatus }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = async () => {
      setLoading(true);
      if (networkStatus) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
      } else {
        setLoading(false);
        alert("Network is poor. Unable to load the page.");
        navigate("/");
      }
    };
    handleNavigation();
  }, [networkStatus, navigate, setLoading]);

  return (
    <div className="relative">
      {loading ? <LoadingSpinner /> : <Component />}
    </div>
  );
};

export default PageWrapper; 