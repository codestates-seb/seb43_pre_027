import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { ReactComponent as InboxIcon } from '../Assets/icon/InboxIcon.svg';
import { ReactComponent as AchieveIcon } from '../Assets/icon/ArchiveIcon.svg';
import { ReactComponent as HelpIcon } from '../Assets/icon/HelpIcon.svg';
import { ReactComponent as SwitcherIcon } from '../Assets/icon/SwitcherIcon.svg';
import UserProfile from './UserProfile';
import { useState } from 'react';

const UtileMenuContainer = styled.div`
  display: flex;
  height: 100%;
  .util-menu-container {
    display: flex;
    padding-right: 12px;
    > li {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 10px;
      cursor: pointer;
      > svg {
        fill: var(--black-600);
      }
    }
    li.profile {
      margin: 0 12px;
      position: relative;
      > button {
        display: flex;
        align-items: center;
        border: none;
        background: none;
      }
      .avatar {
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 3px;
        background: var(--black-075);
      }
      .reputation {
        font-size: 12px;
        font-weight: bold;
        margin: 0 2px 0 5px;
      }
      .triangle {
        width: 15px;
        height: 15px;
        fill: var(--orange-500);
      }
    }
  }
`;

const UtilMenu = () => {
  const [toggle, toggleSet] = useState(false);

  const handleToggle = () => {
    toggleSet(!toggle);
  };
  return (
    <UtileMenuContainer>
      <ul className="util-menu-container">
        <li className="profile">
          <button onClick={handleToggle}>
            <AiOutlineUser className="avatar" />
            <span className="reputation"></span>
            {!toggle ? (
              <VscTriangleDown className="triangle" />
            ) : (
              <VscTriangleUp className="triangle" />
            )}
          </button>
          {toggle ? (
            <UserProfile toggle={toggle} toggleSet={toggleSet} />
          ) : null}
        </li>
        <li>
          <InboxIcon />
        </li>
        <li>
          <AchieveIcon />
        </li>
        <li>
          <HelpIcon />
        </li>
        <li>
          <SwitcherIcon />
        </li>
      </ul>
    </UtileMenuContainer>
  );
};

export default UtilMenu;
