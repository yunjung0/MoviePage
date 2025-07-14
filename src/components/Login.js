import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {login} from '../api/SignupApi';
import '../components/Login.css';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            console.log('로그인 성공:', res);
            alert('로그인 성공!');
            navigate('/')
        } catch (err) {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className='Login'>
            <div className='LoginContainer'>
                <div className='Title'>로그인</div>
                <form onSubmit={handleLogin}>
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
                    <input type="submit" className='Button' value="로그인"/>
                </form>
            </div>
        </div>
    );
}

export default Login;

