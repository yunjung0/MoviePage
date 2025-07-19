import api from './Api';

//회원가입
export const signup = async (email, password1, password2, username, nickname) => {
  try {
    const res = await api.post("/auth/registration/",
      { email, password1, password2, username, nickname }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

//로그인
export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login/', { email, password });
    if (res.data && res.data.access) {
      localStorage.setItem('token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};


// 로그아웃
export const logout = async () => {
  await api.post('/auth/logout/');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
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
export const updateUserNickname = async ({ username, nickname }) => {
  const body = {};
  if (username) body.username = username;
  if (nickname) body.nickname = nickname;
  const res = await api.put('/users/profile/', body);
  return res.data;
};


