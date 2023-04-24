import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { RouterProvider } from 'react-router-dom';
import router from './router';

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
