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
    input {
      width: 100%;
      padding: 9px 8px;
      border: 1px solid #babfc4;
      border-radius: 3px;

      &:focus {
        border: 1px solid #59a4de;
        outline: 4px solid #59a4de3f;
      }
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
  return (
    <Background>
      <Logo className="logo" />
      <Container>
        <form>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                size="30"
                maxLength="100"
                name="email"
              />
              {/* <Alert /> */}
            </div>
            {/* <p>Email cannot be empty.</p> */}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                autoComplete="off"
                name="password"
              />
              {/* <Alert /> */}
              {/* <p>Password cannot be empty.</p> */}
            </div>
          </FormGroup>
          <LoginBtn type="submit">Log in</LoginBtn>
        </form>
      </Container>
      <SignUp>Don’t have an account? Sign up</SignUp>
    </Background>
  );
}

export default Login;
