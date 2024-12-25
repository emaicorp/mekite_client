// src/utils/localStorageUtils.js

/**
 * Retrieves user details and auth token from localStorage.
 * @returns {Object|null} { token, userId } or null if not found.
 */
export function getUserDetails() {
    const token = localStorage.getItem('authToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  
    if (!token || !userDetails) {
      console.error('No user details or token found in localStorage');
      return null;
    }
  
    const userId = userDetails?.id; // Replace `id` with the actual key for the user ID in your data
    return { token, userId };
  }
  