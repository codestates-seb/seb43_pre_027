import { RouterProvider } from 'react-router-dom';
import GlobalStyles from './Theme/GlobalStyles';
import router from './router';

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
