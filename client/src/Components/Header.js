import styled, { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import React from 'react';
import { GlobalStyles } from 'styled-components';

const TopWrapper = styled.div`
  ${GlobalStyles}
  body {
    background-color: black;
  }
`;

function Header() {
  return <div>a</div>;
}

export default Header;
