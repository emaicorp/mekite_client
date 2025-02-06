const checkAuth = () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return false;
  }
  return authToken;
};

export default checkAuth; 