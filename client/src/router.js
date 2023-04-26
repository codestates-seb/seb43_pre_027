import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import UserInfo from './Pages/test-UserInfo';
import QuestionsDetail from './Pages/test-QuestionsDetail';
import Ask from './Pages/Ask';
import Common from './Components/Common';
import Header from './Components/Header';
import NotFound from './Pages/test-NotFound';

const auth = () => {};

const loggedIn = () => {};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
    loader: loggedIn,
  },
  {
    path: '/signup',
    element: <SignUp />,
    loader: loggedIn,
  },
  {
    path: '/logout',
    element: <Logout />,
    loader: auth,
  },
  {
    path: '/questions',
    element: (
      <>
        <Header />
        <Common />
      </>
    ),
    loader: auth,
  },
  {
    path: '/questions/:id',
    element: <QuestionsDetail />,
    loader: auth,
  },
  {
    path: '/ask',
    element: <Ask />,
    loader: auth,
  },
  {
    path: '/userinfo',
    element: <UserInfo />,
    loader: auth,
  },
]);

export default router;
