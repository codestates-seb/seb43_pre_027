import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
    body {
        background-color: white;
    }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
    </div>
  );
}

export default App;
