export const isAuthenticated = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) return false;
  
  try {
    const parsedDetails = JSON.parse(userDetails);
    return !!parsedDetails; // Returns true if parsedDetails exists and is not null
  } catch {
    return false;
  }
};

export const getUserDetails = () => {
  try {
    return JSON.parse(localStorage.getItem('userDetails'));
  } catch {
    return null;
  }
}; 