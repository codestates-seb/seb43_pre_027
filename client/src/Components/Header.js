import styled from 'styled-components';
import { reset } from 'styled-reset';
import React from 'react';
import GlobalStyles from '../Theme/GlobalStyles';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useSelector } from 'react-redux';
import sprites from '../Assets/icon/Sprites.svg';
import UtilMenu from './UtilMenu';

export const CommonButton = styled.button`
  background-color: ${(props) => props.bgColor || 'hsl(205, 46%, 92%)'};
  color: ${(props) => props.color || ' hsl(205, 47%, 42%)'};
  margin: 4px;
  padding: 10px;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
  border-radius: 3px;
  font-size: 13px;
  border: 1px solid ${(props) => props.border || 'hsl(206, 100%, 40%)'};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  z-index: 10;
  height: 50px;
  border-top: 3px solid hsl(27, 90%, 55%);
  background-color: hsl(210, 8%, 97.5%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  .header-container {
    width: 1264px;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 100%;
      margin: 0;
      padding: 0 8px;
      display: flex;
      align-items: center;
      .logo-img {
        display: block;
        width: 150px;
        height: 30px;
        margin-top: -4px;
        background: url(${sprites}) 0 -500px no-repeat;
      }
    }
    .gnb {
      display: flex;
      align-items: center;
      padding: 2px 0;
      margin: -2px;
      color: hsl(210, 8%, 35%);
      font-size: 13px;
      li {
        padding: 6px 12px;
        margin: 2px;
      }
    }
    .button-container {
      display: flex;
    }
    .button-container button {
      padding: 8px 10px;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <HeaderContainer>
      <div className="header-container">
        <h1 className="logo">
          <Link to="/">
            <span className="logo-img hide"></span>
          </Link>
        </h1>
        <ul className="gnb">
          <li>About</li>
          <li>Products</li>
          <li>For Teams</li>
        </ul>
        <Search />
        <UtilMenu />
      </div>
    </HeaderContainer>
  );
};

export default Header;
