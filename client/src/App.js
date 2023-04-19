import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Ask from './Pages/Ask';
import Questions from './Pages/Questions';
import { Routes, Route } from 'react-router-dom';

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
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </div>
  );
}

export default App;
