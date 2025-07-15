import React, { useState } from 'react';
import { signup } from '../api/SignupApi';
import '../components/Signup.css';


function Signup() {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(username, password1, password2, email, nickname);
            console.log('회원가입 성공:', res);
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
        } catch (err) {
            console.log('회원가입 실패');
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            console.log(err.response.data); // 서버에서 어떤 필드가 잘못됐는지 확인
}
        }

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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        required
                    />

                    <input className='Input'
                        type="text"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder="비밀번호"
                        required
                    />

                    <input className='Input'
                        type="text"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="비밀번호"
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
