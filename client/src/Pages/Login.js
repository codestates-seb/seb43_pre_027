import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import AuthInput from '../Components/AuthInput';
// import { addUserId } from '../store';
import { ReactComponent as Logo } from '../Assets/login-logo.svg';
import { ReactComponent as GoogleLogo } from '../Assets/icon/google-login-icon.svg';
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

const GoogleOauthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1.4rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  margin: 5px 0px;
  vertical-align: middle;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  text-align: center;
  color: rgb(65, 63, 63);
  background-color: #fff;
  transition: all 0.6s ease;
  cursor: pointer;
`;

axios.defaults.withCredentials = true;

function Login() {
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [loginFailed, setLoginFailed] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // 공백인 경우 alert 표시
    setEmailAlert(email === '' && 'Email cannot be empty.');
    setPasswordAlert(password === '' && 'Password cannot be empty.');

    if (email === '' || password === '') return;

    // 로그인 처리
    axios
      .post('https://ebee-49-143-68-94.ngrok-free.app/auth/login', {
        username: email,
        password,
      })
      .then((res) => {
        console.log(res);
        // 로컬스토리지에 access-token, refresh token 저장
        // value가 undefined면 안됨
        localStorage.setItem('access_token', res.headers.authorization);
        localStorage.setItem('refresh_token', res.headers.refresh);
        // redux에 유저 아이디 저장 -> X
        // dispatch(addUserId(res.data.user.id));
        setLoginFailed('');
        // 페이지 이동
        navigate('/questions');
      })
      .catch((err) => {
        // 401 에러 : setLoginFailed로 로그인 실패 문구 띄우기
        console.log(err);
        setLoginFailed('login-failed');
      });
  };

  // Google Oauth
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/userinfo.email`;

  const handleGoogleLogin = () => {
    window.location.assign(oAuthURL);
  };

  const search = window.location.search;
  let authorizationCode;

  if (search) {
    authorizationCode = search.split('=')[1].split('&')[0];
  }

  // authorizationCode를 서버로 보내기
  if (authorizationCode) {
    console.log(authorizationCode);

    axios
      .post('', {
        authorizationCode,
      })
      .then((res) => {})
      .catch((err) => {});
  }

  return (
    <Background>
      <div className="container">
        <Logo className="logo" />
        <GoogleOauthButton onClick={handleGoogleLogin}>
          <GoogleLogo />
          Log in with Google
        </GoogleOauthButton>
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
