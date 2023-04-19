import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function SignUp() {
  const [displayNameAlert, setDisplayNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const displayName = e.target['display-name'].value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setDisplayNameAlert(displayName === '' ? 'alert-on' : '');
    setEmailAlert(email === '' ? 'alert-on' : '');
    setPasswordAlert(password === '' ? 'alert-on' : '');

    if (displayName === '' || email === '' || password === '') return;

    return axios
      .post('/api/users', {
        displayName,
        email,
        password,
      })
      .then((res) => {
        // 성공하면 로그인 페이지로 이동
      })
      .catch((err) => {
        // 실패하면 에러 메시지 출력
      });
  };

  return (
    <div>
      <div>
        <h1>Join the Stack Overflow community</h1>
        <div>
          {/* icon */}
          <span>Get unstuck — ask a question</span>
        </div>
        <div>
          {/* icon */}
          <span>Unlock new privileges like voting and commenting</span>
        </div>
        <div>
          {/* icon */}
          <span>
            Save your favorite questions, answers, watch tags, and more
          </span>
        </div>
        <div>
          {/* icon */}
          <span>Earn reputation and badges</span>
        </div>
        <p>
          Collaborate and share knowledge with a private group for FREE. <br />
          <a href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up">
            Get Stack Overflow for Teams free for up to 50 users.
          </a>
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="display-name">Display name</label>
          <input type="text" id="display-name" className={displayNameAlert} />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={emailAlert} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className={passwordAlert} />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
