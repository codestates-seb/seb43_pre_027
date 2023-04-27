import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import QuestionsDetail from './Pages/QuestionsDetail';
import Ask from './Pages/Ask';
import Questions from './Pages/Questions';
import NotFound from './Pages/NotFound';
import QuestionEdite from './Pages/QuestionEdite';
import UserProfile from './Components/UserProfile';

const auth = () => {
  const value = localStorage.getItem('access_token');

  if (!value) {
    return redirect('/');
  }

  return null;
};

const loggedIn = () => {
  const value = localStorage.getItem('access_token');

  if (value) {
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
    path: '/questions/:id/edite',
    element: <QuestionEdite />,
    loader: auth,
  },
  {
    path: '/ask',
    element: <Ask />,
    loader: auth,
  },
  {
    path: '/userprofile',
    element: <UserProfile />,
    loader: auth,
  },
]);

export default router;
