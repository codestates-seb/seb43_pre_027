import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../Assets/login-logo.svg';
import { ReactComponent as Alert } from '../Assets/alert.svg';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f1f2f3;

  .logo {
    margin-bottom: 24px;
  }
`;

const Container = styled.div`
  padding: 24px;
  border-radius: 7px;
  margin-bottom: 40px;
  background-color: #fff;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 700;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    position: relative;

    svg {
      position: absolute;
      right: 8px;
    }

    input {
      width: 100%;
      padding: 9px 8px;
      border: 1px solid #babfc4;
      border-radius: 3px;

      &:focus {
        border-color: #59a4de;
        outline: 4px solid #59a4de3f;
      }
    }
  }

  p {
    font-size: 12px;
  }

  svg,
  p {
    display: none;
  }

  &.email.alert-on,
  &.password.alert-on {
    input {
      border-color: #de4f54;
    }

    input:focus {
      border-color: #de4f54;
      outline: 4px solid #de4f543c;
    }

    svg,
    p {
      display: flex;
    }

    p {
      color: #de4f54;
    }
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  background-color: #0a95ff;
`;

const SignUp = styled.p`
  font-size: 13px;
`;

function Login() {
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setEmailAlert(email === '' ? 'email alert-on' : '');
    setPasswordAlert(password === '' ? 'password alert-on' : '');
  };

  return (
    <Background>
      <Logo className="logo" />
      <Container>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormGroup className={emailAlert}>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                size="30"
                maxLength="100"
                name="email"
              />
              <Alert />
            </div>
            <p>Email cannot be empty.</p>
          </FormGroup>
          <FormGroup className={passwordAlert}>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                autoComplete="off"
                name="password"
              />
              <Alert />
            </div>
            <p>Password cannot be empty.</p>
          </FormGroup>
          <LoginBtn type="submit">Log in</LoginBtn>
        </form>
      </Container>
      <SignUp>Don’t have an account? Sign up</SignUp>
    </Background>
  );
}

export default Login;
