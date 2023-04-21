import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AuthInput from '../Components/AuthInput';
import { ReactComponent as Question } from '../Assets/icon/question.svg';
import { ReactComponent as Vote } from '../Assets/icon/vote.svg';
import { ReactComponent as Tag } from '../Assets/icon/tag.svg';
import { ReactComponent as Badge } from '../Assets/icon/badge.svg';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 48px;
  background-color: #eff0f1;
`;

const Overview = styled.div`
  max-width: 405px;

  h1 {
    margin-bottom: 32px;
    font-size: 27px;
  }

  .description {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    gap: 8px;

    svg {
      flex-shrink: 0;
    }

    span {
      font-size: 15px;
    }
  }

  p {
    font-size: 13px;
    line-height: 1.3;
    color: #6a737c;

    a {
      text-decoration: none;
      color: #0274cb;

      :hover {
        color: #0d96ff;
      }
    }
  }
`;

const SignUpForm = styled.div`
  flex-basis: 316px;
  padding: 24px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
      padding: 10px;
      border: none;
      border-radius: 3px;
      color: #ffffff;
      background-color: #0a95ff;
      cursor: pointer;

      :hover {
        background-color: #0b74c5;
      }
    }
  }
`;

function SignUp() {
  const [displayNameAlert, setDisplayNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

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
    <Background>
      <Overview>
        <h1>Join the Stack Overflow community</h1>
        <div className="description">
          <Question />
          <span>Get unstuck — ask a question</span>
        </div>
        <div className="description">
          <Vote />
          <span>Unlock new privileges like voting and commenting</span>
        </div>
        <div className="description">
          <Tag />
          <span>
            Save your favorite questions, answers, watch tags, and more
          </span>
        </div>
        <div className="description">
          <Badge />
          <span>Earn reputation and badges</span>
        </div>
        <p>
          Collaborate and share knowledge with a private group for FREE. <br />
          <a href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up">
            Get Stack Overflow for Teams free for up to 50 users.
          </a>
        </p>
      </Overview>
      <SignUpForm>
        <form onSubmit={handleSubmit}>
          <AuthInput
            label="Display name"
            type="text"
            id="display-name"
            alert={displayNameAlert}
          />
          <AuthInput label="Email" type="email" id="email" alert={emailAlert} />
          <AuthInput
            label="Password"
            type="password"
            id="password"
            alert={passwordAlert}
          />
          <button type="submit">Sign up</button>
        </form>
      </SignUpForm>
    </Background>
  );
}

export default SignUp;
