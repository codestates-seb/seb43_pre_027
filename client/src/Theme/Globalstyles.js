import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
      position : relative;
      display : block;
      width : 100%
      height : 100%;
      line-height : 1.5;
      margin : 0 auto;
      font-family:
      "Montserrat",
      "Helvetica Neue",
      "NanumSquare",
      "Noto Sans",
      "Noto Sans CJK KR",
      sans-serif;
      work-break : keep-all;
      work-wrap : break-word;
      text-rendering : optimizeLegibility;
      -webkit-font-smoothing:antialiased;
  }
`;

export default GlobalStyles;
Footer;
