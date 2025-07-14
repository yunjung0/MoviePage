import api from './Api';

//회원가입
export const signup = async (username, email, password) => {
  try {
        const res = await api.post('/api/auth/signup', {
            username,
            email,
            password
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

//로그인
export const login = async (email, password) => {
    try {
        const res = await api.post('http://127.0.0.1:8000/ap', {
            email,
            password,
        });
        if (res.data && res.data.access) {
            localStorage.setItem('token', res.data.access);
        }
        return res.data;
    } catch (err) {
        throw err;
    }
};

// 로그아웃
export const logout = async () => {
    try {
        await api.post('http://127.0.0.1:8000/ap');
        localStorage.removeItem('token');
    } catch (err) {
        localStorage.removeItem('token');
    }
};

// 현재 로그인 상태 확인
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};