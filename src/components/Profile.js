import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserNickname, deleteUser } from '../api/SignupApi';
import '../components/Profile.css';

function UserProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [nickname, setNickname] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserProfile(userId)
      .then(data => {
        setProfile(data);
        setNickname(data.nickname);
      })
      .catch(err => {
        alert('프로필을 불러올 수 없습니다.');
      });
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const updated = await updateUserNickname(userId, nickname);
      setProfile(updated);
      setEditing(false);
      alert('닉네임이 수정되었습니다.');
    } catch (err) {
      alert('수정 권한이 없거나 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      try {
        await deleteUser(userId);
        alert('탈퇴가 완료되었습니다.');
      } catch (err) {
        alert('탈퇴 권한이 없거나 오류가 발생했습니다.');
      }
    }
  };

  if (!profile) return <div className='loading'>로딩 중...</div>;

  return (
    <div className="UserProfile">
      <h2>사용자 프로필</h2>
      <p><b>ID:</b> {profile.id}</p>
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
      <button onClick={handleDelete} style={{ color: 'red' }}>회원 탈퇴</button>
    </div>
  );
}

export default UserProfile;
