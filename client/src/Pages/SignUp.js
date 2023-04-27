import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Overview from '../Components/Overview';
import AuthInput from '../Components/AuthInput';

import { Link, useNavigate } from 'react-router-dom';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 48px;
  background-color: #eff0f1;
`;

const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 316px;
  gap: 40px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px;
    border-radius: 7px;
    background-color: #ffffff;
    box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
      0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  }

  .login {
    font-size: 13px;
    text-align: center;

    a {
      text-decoration: none;
      color: #0274cb;

      :hover {
        color: #0d96ff;
      }
    }
  }
`;

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    margin-bottom: 9px;
    color: #ffffff;
    background-color: #0a95ff;
    cursor: pointer;

    :hover {
      background-color: #0b74c5;
    }
  }

  p {
    display: none;
    color: #de4f54;
    font-size: 12px;
    text-align: center;
  }

  p.signup-failed {
    display: block;
  }
`;

function SignUp() {
  const [displayNameAlert, setDisplayNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [signupFailed, setSignupFailed] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const displayName = e.target['display-name'].value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setDisplayNameAlert(displayName === '' && 'Display name cannot be empty.');
    setEmailAlert(email === '' && 'Email cannot be empty.');
    setPasswordAlert(password === '' && 'Password cannot be empty.');

    if (displayName === '' || email === '' || password === '') return;

    return axios
      .post('https://ebee-49-143-68-94.ngrok-free.app/members', {
        nickName: displayName,
        email,
        password,
      })
      .then((res) => {
        // 성공하면 로그인 페이지로 이동
        navigate('/');
      })
      .catch((err) => {
        // 실패하면 에러 메시지 출력
        setSignupFailed('signup-failed');
      });
  };

  return (
    <Background>
      <Overview />
      <SignUpForm>
        <form onSubmit={handleSubmit}>
          <AuthInput
            label="Display name"
            type="text"
            id="display-name"
            alertMessage={displayNameAlert}
          />
          <AuthInput
            label="Email"
            type="email"
            id="email"
            alertMessage={emailAlert}
          />
          <AuthInput
            label="Password"
            type="password"
            id="password"
            alertMessage={passwordAlert}
          />
          <ButtonGroup>
            <button type="submit">Sign up</button>
            <p className={signupFailed}>Sign up failed</p>
          </ButtonGroup>
        </form>
        <p className="login">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </SignUpForm>
    </Background>
  );
}

export default SignUp;
