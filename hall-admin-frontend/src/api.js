export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://rmj-hall-admin-backend-production.up.railway.app";

export const getApiUrl = (path) => `${API_BASE_URL}${path}`;
