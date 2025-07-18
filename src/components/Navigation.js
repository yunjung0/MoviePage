import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../api/SignupApi';
import './Navigation.css';

export default function Navigationbar() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // 로그아웃 후에 authenticated 값을 false로 갱신
  const handleLogout = async () => {
    try {
      await logout();
      setAuthenticated(false); // 상태 갱신
      navigate('/loginPage');
    } catch (err) {
      setAuthenticated(false); // 상태 갱신
      navigate('/loginPage');
    }
  };

  // 로그인/로그아웃 등 인증 상태가 변경될 때 state를 동기화
  useEffect(() => {
    setAuthenticated(isAuthenticated());
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

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout, isAuthenticated } from '../api/SignupApi';
// import './Navigation.css';

// export default function Navigationbar() {
//   const navigate = useNavigate();
//   const authenticated = isAuthenticated();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/loginPage');
//     } catch (err) {
//       navigate('/loginPage');
//     }
//   };

//   return (
//     <nav className="Navigation">
//       <div className="logo"><Link to='/' style={{ textDecoration: "none"}} className="topic" >BoogieMovie</Link></div>
//       <ul>
//         {authenticated ? (
//           <li>
//             <button onClick={handleLogout} className="logout-button">
//               로그아웃
//             </button>
//           </li>
//         ) : (
//           <li>
//             <Link to="/loginPage" style={{ textDecoration: "none"}}>로그인</Link>
//           </li>
//         )}
//         <li>
//           <Link to="/signupPage" style={{ textDecoration: "none"}}>회원가입</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
