import axios from 'axios';

export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
