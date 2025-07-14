import api from './Api';

//회원가입
export const signup = async (username, password, password2, nickname) => {
  try {
        const res = await api.post('/auth/registration/', {
            username,
            password,
            password2,
            nickname
        });
        return res.data;
    } catch (err) {
        throw err;
    }
};

//로그인
export const login = async (username, password) => {
    try {
        const res = await api.post('/auth/login/', {
            username,
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
export const logout = () => {
    localStorage.removeItem('token');
};

// 현재 로그인 상태 확인
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// 프로필 조회 (현재 로그인된 사용자)
export const getUserProfile = async () => {
  const res = await api.get('/users/profile/');
  return res.data;
};

// 닉네임 수정 (현재 로그인된 사용자)
export const updateUserNickname = async (nickname) => {
  const res = await api.put('/users/profile/', { nickname });
  return res.data;
};

// 회원 탈퇴
export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}/`);
};