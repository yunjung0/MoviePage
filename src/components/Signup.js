import React, { useState } from 'react';
import { signup } from '../api/SignupApi';


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await signup(username, email, password);
            console.log('회원가입 성공:', res);
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
        } catch (err) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='SignupContainer'>
            <h2 className='Title'>회원가입</h2>
            <form onSubmit={handleRegister}>
                <input className='Input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="usename"
                    required
                />

                <input className='Input'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="아이디"
                    required
                />

                <input className='Input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                />
                <input type="submit" className='Button' value="회원가입" />
            </form>
        </div>
    );
}

export default Signup;
