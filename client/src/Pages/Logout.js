import styled from 'styled-components';
import axios from 'axios';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f1f2f3;

  h1 {
    margin-bottom: 24px;
    font-size: 21px;
    line-height: 1.3;
    text-align: center;
  }
`;

const Container = styled.div`
  max-width: 312px;
  padding: 24px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);

  .button-group {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    gap: 4px;

    button {
      padding: 10px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    button:first-child {
      color: #ffffff;
      background-color: #0a95ff;

      :hover {
        background-color: #0881dd;
      }
    }

    button:last-child {
      color: #0a95ff;
      background-color: #ffffff;

      :hover {
        background-color: #0a95ff10;
      }
    }
  }

  p {
    color: hsl(210, 8%, 45%);
    font-size: 12px;
    line-height: 1.3;
  }
`;

function Logout() {
  const handleLogout = () => {
    return axios
      .post('')
      .then((res) => {
        // 로그인 상태 변경 (false)
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCancel = () => {
    // useNavigate로 이전 페이지로 이동
  };

  return (
    <Background>
      <h1>
        Clicking “Log out” will log you out of the following <br /> domains on
        this device:
      </h1>
      <Container>
        <div className="button-group">
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <p>
          If you’re on a shared computer, remember to log out of your Open ID
          provider (Facebook, Google, Stack Exchange, etc.) as well.
        </p>
      </Container>
    </Background>
  );
}

export default Logout;
