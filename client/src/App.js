import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Ask from './Pages/Ask';
import Questions from './Pages/Questions';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header';
import Common from './Components/Common';
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
      <Header />
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
