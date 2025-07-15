import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
            <div className='footer-icon'>
              <img src="/free-icon-instagram-2111463.png" alt="instagram Icon" />
              <img src="/free-icon-facebook-2504903.png" alt="facebook Icon" />
              <img src="/free-icon-twitter-logo-3938028.png" alt="twitter Icon" />
              <img src="/free-icon-youtube-220211.png" alt="youtube Icon" />


            </div>
            <div className="footer-box">
              <p>프론트엔드 박윤정</p>
              <p> 프론트엔드 최선지</p>
              <p>백엔드 황준호</p>
              <p>백엔드 조현한</p>
            </div>
        {/* <div className="footer-links">
          <a href="/privacy-policy">개인정보 처리방침</a>
          <span> | </span>
          <a href="/terms-of-service">이용약관</a>
          <span> | </span>
          <a href="/contact">문의하기</a>
        </div> */}
        <div className='footer-date'>
          <p>2025.7.14-15 미니 해커톤 한국외국어대학교 아기사자</p>
          
        </div>
    </div>
  );
}
        