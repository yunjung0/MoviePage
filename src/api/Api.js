import axios from 'axios';

const api = axios.create({
    baseURL: " http://movielike.store/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.res?.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/loginPage';
        }
        return Promise.reject(error);
    }
);

export default api;