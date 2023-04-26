import styled from 'styled-components';
import { getTimeElapsed } from './TimeElapsed';
import { AiOutlineUser } from 'react-icons/ai';

const UserInfoContainer = styled.section`
  width: 200px;
  padding: 7px 6px 7px 7px;
  border-radius: 3px;
  background-color: ${(props) => props.bgColor};
  color: hsl(210, 8%, 45%);
  font-size: 12px;
  .asked-time {
    margin-bottom: 4px;
  }
  .avatar-wrapper {
    float: left;
    width: 32px;
    height: 32px;
    background-color: hsl(210, 8%, 95%);
    border-radius: 4px;
    svg {
      width: 32px;
      height: 32px;
      border-radius: 3px;
    }
  }
  .user-detail {
    float: left;
    margin-left: 8px;
    a {
      font-size: 13px;
      color: hsl(206, 100%, 40%);
    }
  }
`;

export const UserInfo = () => {
  return (
    <UserInfoContainer>
      <div className="asked-time">
        <span>{getTimeElapsed()}</span>
      </div>
      <div className="avatar-wrapper">
        <AiOutlineUser size="32px" />
      </div>
      <div className="user-detail"></div>
    </UserInfoContainer>
  );
};
