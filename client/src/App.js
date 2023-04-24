import GlobalStyles from './Theme/GlobalStyles';
import { reset } from 'styled-reset';
import Ask from './Pages/Ask';
import Questions from './Pages/Questions';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header';
import Common from './Components/Common';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';

function App() {
  // let [isLogin, setisLogin] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        {/* /questions */}
        <Route path="/" element={<Common />} />
        {/* /questions/ask */}
        <Route path="/ask" element={<Ask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
