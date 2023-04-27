import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { CommonButton } from './Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, UseState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 220px;
  position: absolute;
  top: 47px;
  left: -87px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid hsl(210, 8%, 90%);
  border-radius: 15px;
  box-shadow: 0 1px 5px 3px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
    0 2px 8px hsl(0deg 0% 0% / 5%);
  .user-avatar {
    .user-avatar-icon {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      background: hsl(27, 95%, 90%);
      fill: hsl(27, 90%, 55%);
    }
  }
  .user-name {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
    color: hsl(210, 8%, 45%);
  }
  .logout-button {
    display: flex;
    align-items: center;
    .logout-icon {
      margin-right: 5px;
      width: 15px;
      height: 15px;
      fill: hsl(27, 90%, 55%);
    }
  }
`;

const UserProfile = ({ toggle, toggleSet }) => {
  UserProfile.propTypes = {
    toggle: Function,
    toggleSet: Function,
  };
  const navigate = useNavigate();
  let [NewNickName, setNickName] = useState([]);
  let token = localStorage.getItem('access_token');
  axios
    .get(
      'http://ec2-43-201-109-241.ap-northeast-2.compute.amazonaws.com/members',
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((결과) => {
      setNickName(결과.data.nickName);
    })
    .catch(() => {});

  const handleLogout = () => {
    toggleSet(!toggle);
    navigate('/logout');
  };

  return (
    <ProfileContainer>
      <div className="user-avatar">
        <AiOutlineUser className="user-avatar-icon" />
      </div>
      <div className="user-name">{NewNickName}</div>
      <CommonButton onClick={handleLogout}>
        <MdLogout className="logout-icon" />
        Log Out
      </CommonButton>
    </ProfileContainer>
  );
};

export default UserProfile;
