import styled, { useTheme } from 'styled-components';
import { Link, Route } from 'react-router-dom';
import { ReactComponent as Footerlogo } from '../Assets/icon/Footerlogo.svg';
import { useState } from 'react';
const FooterContainer = styled.footer`
  width: 100%
  background-color: #232629;
  color: #9099a1;
  .footer-container {
    display: flex;
    justify-content: space-between;
    margin: 0 0 0 32px;
    padding: 32px 0px 12px;
    width: 100%;
    max-width: 1350px;
    margin: 0 auto;

    .logobox {
      flex: 0 0 300px;
    }
    .foot-logo {
      height: 150px;
      a {
        color: #9099a1;
      }
      ::marker {
        color: #232629;
      }
    }
    .bot-menu-container {
      display: flex;
      flex: 2 1 auto;
      > ul {
        flex: 1 0 auto;
        padding: 0 12px 24px 0;
        > h5 {
          margin: 0 0 18px;
          color: #babfc4;
        }
        > li {
          line-height: 2;
          font-size: 13px;
          ::marker {
            color: #232629;
          }
        }
      }
    }
    .sns-copyright {
      display: flex;
      flex-direction: column;
      flex: 1 1 150px;
      font-size: 11px;
      .sns-container {
        > ul {
          padding: 0;
          display: flex;
          > li {
            margin-left: 12px;
            padding: 4px 0;
            &:first-child {
              margin: 0;
            }
          }
        }
      }
      .copyright-container {
        margin: auto 0 24px;
      }
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ul className="footer-container">
        <logobox className="logobox">
          <li className="foot-logo">
            <Link to="/">
              <Footerlogo />
              <span className="foot-logo-image hide"></span>
            </Link>
          </li>
        </logobox>
        <li className="bot-menu-container">
          <ul>
            <h5>STACK OVERFLOW</h5>
            <li>About</li>
            <li>Press</li>
            <li>Work Here</li>
            <li>Contact Us</li>
            <li>Questions</li>
          </ul>
          <ul>
            <h5>PRODUCTS</h5>
            <li>Teams</li>
            <li>Advertising</li>
            <li>Collectives</li>
            <li>Talent</li>
          </ul>
          <ul>
            <h5>POLICIES</h5>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Settings</li>
            <li>Cookie Policy</li>
          </ul>
          <ul>
            <h5>CHANNELS</h5>
            <li>Blog</li>
            <li>Newsletter</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </li>
      </ul>
    </FooterContainer>
  );
}

export default Footer;
