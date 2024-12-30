// src/utils/localStorageUtils.js

/**
 * Saves user details and auth token to localStorage.
 * Ensures user details include a normalized `userId`.
 * @param {string} token - The authentication token.
 * @param {Object} userDetails - The user details object.
 */
export function saveUserDetails(token, userDetails) {
  if (!userDetails.id && !userDetails.userId) {
    console.error('User details must include a userId or id');
    return;
  }
  const normalizedUserDetails = { ...userDetails, userId: userDetails.id || userDetails.userId };
  localStorage.setItem('authToken', token);
  localStorage.setItem('userDetails', JSON.stringify(normalizedUserDetails));
}

/**
 * Retrieves user details and auth token from localStorage.
 * Returns normalized { token, userId, ...userDetails } or null if not found.
 * @returns {Object|null} { token, userId, ...userDetails } or null if not found.
 */
export function getUserDetails() {
  const token = localStorage.getItem('authToken');
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (!token || !userDetails) {
    console.error('No user details or token found in localStorage');
    return null;
  }

  const userId = userDetails.userId || userDetails.id; // Normalize userId
  return { token, userId, ...userDetails };
}

/**
 * Clears user details and auth token from localStorage.
 */
export function clearUserDetails() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userDetails');
}
