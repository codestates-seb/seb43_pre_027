import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import UserInfo from './Pages/test-UserInfo';
import Questions from './Pages/Questions';
import QuestionsDetail from './Pages/test-QuestionsDetail';
import Ask from './Pages/Ask';
import NotFound from './Pages/test-NotFound';

const auth = () => {
  if (!document.cookie) {
    return redirect('/');
  }

  return null;
};

const loggedIn = () => {
  if (document.cookie) {
    return redirect('/questions');
  }

  return null;
};

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
    element: <Questions />,
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
