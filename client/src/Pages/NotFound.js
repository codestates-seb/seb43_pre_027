import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as NotFoundIcon } from '../Assets/not-found.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 30px;
  background-color: #f1f2f3;
`;

const Information = styled.div`
  h1 {
    margin-bottom: 8px;
    font-size: 27px;
  }

  p {
    margin-bottom: 23px;
    font-size: 19px;
  }

  li {
    font-size: 15px;

    a {
      color: #0274cb;
      text-decoration: none;

      :hover {
        color: #0d96ff;
      }
    }
  }

  li:not(:last-child) {
    margin-bottom: 15px;
  }
`;

function NotFound() {
  return (
    <Container>
      <NotFoundIcon />
      <Information>
        <h1>Page not found</h1>
        <p>We&#39;re sorry, we couldn&#39;t find the page you requested.</p>
        <ul>
          <li>
            Browse our <Link to="/questions">recent questions</Link>
          </li>
          <li>
            If you feel something is missing that should be here,{' '}
            <a href="https://stackoverflow.com/contact">contact us.</a>
          </li>
        </ul>
      </Information>
    </Container>
  );
}

export default NotFound;
