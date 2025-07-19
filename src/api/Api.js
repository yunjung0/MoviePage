import axios from 'axios';

const api = axios.create({
    baseURL: "https://www.movielike.store/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
  (config) => {
    // 회원가입, 로그인 요청에는 토큰을 붙이지 않음
    if (
      config.url === '/auth/registration/' ||
      config.url === '/auth/login/'
    ) {
      delete config.headers.Authorization;
      return config;
    }
    const token = localStorage.getItem('token');
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
            localStorage.removeItem('token');
            window.location.href = '/loginPage';
        }
        return Promise.reject(error);
    }
);

export default api;