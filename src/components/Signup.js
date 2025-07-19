import React, { useState } from 'react';
import { signup } from '../api/SignupApi';
import {useNavigate } from 'react-router-dom';
import '../components/Signup.css';


function Signup() {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
    const res = await signup(email, password1, password2, username, nickname);
    alert('회원가입이 완료되었습니다! 로그인해주세요.');
    console.log('회원가입 완료');
    navigate('/loginPage');
} catch (err) {
    console.log('회원가입 실패');
    if (err.response && err.response.data) {
        alert('회원가입에 실패했습니다: ' + JSON.stringify(err.response.data));
        console.log(err.response.data);
    } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        console.log(err);
    }
} }


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
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder="비밀번호"
                        required
                    />

                    <input className='Input'
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="비밀번호 확인"
                        required
                    />

                    <input className='Input'
                        type="text"
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
