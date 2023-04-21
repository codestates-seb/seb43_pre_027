import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ReactComponent as Question } from '../Assets/icon/question.svg';
import { ReactComponent as Vote } from '../Assets/icon/vote.svg';
import { ReactComponent as Tag } from '../Assets/icon/tag.svg';
import { ReactComponent as Badge } from '../Assets/icon/badge.svg';
import { ReactComponent as Alert } from '../Assets/icon/alert.svg';

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

    > div {
      margin-bottom: 25px;
    }

    div {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: 700;
      }

      input {
        padding: 7px 9px;
        border: 1px solid #babfc4;
        border-radius: 3px;
        outline: none;

        :focus {
          border-color: #0a95ff;
          outline: 4px solid #0a95ff27;
        }
      }

      p {
        display: none;
        font-size: 12px;
      }
    }

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

  .input-group {
    margin-bottom: 8px;
    position: relative;

    svg {
      display: none;
      position: absolute;
      top: 7px;
      right: 8px;
    }
  }

  .alert-on {
    input {
      border-color: #de4f54;

      :focus {
        border-color: #de4f54;
        outline: 4px solid #de4f5433;
      }
    }

    svg,
    p {
      display: block;
    }

    p {
      color: #de4f54;
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
          <div className={displayNameAlert}>
            <label htmlFor="display-name">Display name</label>
            <div className="input-group">
              <input type="text" id="display-name" />
              <Alert />
            </div>
            <p>Display name cannot be empty.</p>
          </div>
          <div className={emailAlert}>
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <input type="email" id="email" />
              <Alert />
            </div>
            <p>Email cannot be empty.</p>
          </div>
          <div className={passwordAlert}>
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input type="password" id="password" />
              <Alert />
            </div>
            <p>Password cannot be empty.</p>
          </div>
          <button type="submit">Sign up</button>
        </form>
      </SignUpForm>
    </Background>
  );
}

export default SignUp;
