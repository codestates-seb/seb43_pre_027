import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AuthInput from '../Components/AuthInput';
import { ReactComponent as Logo } from '../Assets/login-logo.svg';

import { useNavigate, Link } from 'react-router-dom';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f1f2f3;

  .container {
    flex-basis: 288px;
  }

  .logo {
    display: block;
    margin: 0 auto 24px auto;
  }
`;

const FormContainer = styled.div`
  padding: 24px;
  border-radius: 7px;
  margin-bottom: 40px;
  background-color: #fff;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
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
  }

  p {
    display: none;
    color: #de4f54;
    font-size: 12px;
    text-align: center;
  }

  p.login-failed {
    display: block;
  }
`;

const SignUp = styled.p`
  font-size: 13px;
  text-align: center;

  a {
    text-decoration: none;
    color: #0274cb;

    :hover {
      color: #0d96ff;
    }
  }
`;

axios.defaults.withCredentials = true;

function Login() {
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [loginFailed, setLoginFailed] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // 공백인 경우 alert 표시
    setEmailAlert(email === '' && 'Email cannot be empty.');
    setPasswordAlert(password === '' && 'Password cannot be empty.');

    if (email === '' || password === '') return;

    // 서버에서 쿠키 생성 (임시)
    document.cookie = 'token=%1234%; path=/'; // 쿠키 생성

    if (document.cookie) {
      return navigate('/questions');
    }

    // 로그인 처리
    /*
    axios
      .post('', {
        username: email,
        password,
      })
      .then((res) => {
        // 로그인 상태 바꾸기
        // 상태 코드가 200이나 300이면..? 
        setLoginFailed('');
        navigate('/questions');
      })
      .catch((err) => {
        setLoginFailed('login-failed');
      });
    */
  };

  return (
    <Background>
      <div className="container">
        <Logo className="logo" />
        <FormContainer>
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Log in</button>
              <p className={loginFailed}>Login failed</p>
            </ButtonGroup>
          </form>
        </FormContainer>
        <SignUp>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </SignUp>
      </div>
    </Background>
  );
}

export default Login;
