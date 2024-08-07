import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://i11d106.p.ssafy.io/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/user/login';
    }
    return Promise.reject(error);
  },
);

