import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Questions from './Pages/Questions';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
      background-color: white;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <Questions />
    </div>
  );
}

export default App;
