import axios from 'axios';
import { getTokens, setTokens, clearTokens } from 'config.ts';

const BASE_URL = 'http://localhost:8000'; // Backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.access) config.headers['Authorization'] = `Bearer ${tokens.access}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getTokens();
      if (tokens?.refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/token/refresh/`, { refresh: tokens.refresh });
          setTokens(data);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (e) {
          clearTokens();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
