import React, { useState } from 'react';
import { signup } from '../api/SignupApi';
import '../components/Signup.css';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(username, password, password2, nickname);
            console.log('회원가입 성공:', res);
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
        } catch (err) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='box'>
            <div className='SignupContainer'>
                <h2 className='Title'>회원가입</h2>
                <form onSubmit={handleRegister}>
                    <input className='Input'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        required
                    />

                    <input className='Input'
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        required
                    />

                    <input className='Input'
                        type="text"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="비밀번호 확인"
                        required
                    />

                    <input className='Input'
                        type="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임"
                        required
                    />
                    <input type="submit" className='Button' value="회원가입" />
                </form>
            </div>
        </div>
    );
}

export default Signup;
