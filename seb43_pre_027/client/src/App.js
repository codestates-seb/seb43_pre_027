import './App.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
`;

function App() {
  return (
    <div>
      <div>qsadasds</div>
      <GlobalStyles />
    </div>
  );
}

export default App;
