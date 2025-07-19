import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../api/SignupApi';
import './Navigation.css';

export default function Navigationbar() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const handleLogout = async () => {
    try {
      await logout();
      setAuthenticated(false);
      window.dispatchEvent(new Event("authChanged"));
      navigate('/');
    } catch (err) {
      setAuthenticated(false);
      window.dispatchEvent(new Event("authChanged"));
      navigate('/loginPage');
    }
  };

  useEffect(() => {
    const updateAuth = () => setAuthenticated(isAuthenticated());
    window.addEventListener("authChanged", updateAuth);
    return () => window.removeEventListener("authChanged", updateAuth);
  }, []);

  return (
    <nav className="Navigation">
      <div className="logo">
        <Link to='/' style={{ textDecoration: "none"}} className="topic" >BoogieMovie</Link>
      </div>
      <ul>
        {authenticated ? (
          <li>
            <button onClick={handleLogout} className="logout-button">
              로그아웃
            </button>
          </li>
        ) : (
          <li>
            <Link to="/loginPage" style={{ textDecoration: "none"}}>로그인</Link>
          </li>
        )}
        <li><Link to="/signupPage" style={{ textDecoration: "none"}}>회원가입</Link></li>
        <li><Link to="/profilePage" style={{ textDecoration: "none"}}>프로필</Link></li>
      </ul>
    </nav>
  );
}

