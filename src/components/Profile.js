import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserNickname } from '../api/SignupApi';
import '../components/Profile.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [nickname, setNickname] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserProfile()
      .then(data => {
        setProfile(data);
        setNickname(data.nickname);
      })
      .catch(err => {
        alert('프로필을 불러올 수 없습니다.');
      });
  }, []);

  const handleUpdate = async () => {
    try {
      const updated = await updateUserNickname({ username: profile.username, nickname });
      setProfile(updated);
      setEditing(false);
      alert('닉네임이 수정되었습니다.');
    } catch (err) {
      alert('수정 권한이 없거나 오류가 발생했습니다.');
    }
  };

  if (!profile) return <div className='loading'>로딩 중...</div>;

  return (
    <div className="UserProfile">
      <h2>사용자 프로필</h2>
      <p><b>아이디:</b> {profile.username}</p>
      <p>
        <b>닉네임:</b>
        {editing ? (
          <>
            <input
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <button onClick={handleUpdate}>저장</button>
            <button onClick={() => setEditing(false)}>취소</button>
          </>
        ) : (
          <>
            {profile.nickname}
            <button onClick={() => setEditing(true)}>수정</button>
          </>
        )}
      </p>
    </div>
  );
}

export default UserProfile;
