import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Ask from './Pages/Ask';
import Questions from './Pages/Questions';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

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
  // let [isLogin, setisLogin] = useState(false);

  return (
    <div>
      <GlobalStyles />
      <Routes>
        {/* /questions */}
        <Route path="/" element={<Questions />} />
        {/* /questions/ask */}
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </div>
  );
}

export default App;
