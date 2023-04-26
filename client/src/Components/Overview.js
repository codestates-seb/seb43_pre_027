import styled from 'styled-components';
import { ReactComponent as Question } from '../Assets/icon/question.svg';
import { ReactComponent as Vote } from '../Assets/icon/vote.svg';
import { ReactComponent as Tag } from '../Assets/icon/tag.svg';
import { ReactComponent as Badge } from '../Assets/icon/badge.svg';

const Container = styled.div`
  max-width: 405px;

  h1 {
    margin-bottom: 32px;
    font-size: 27px;
  }

  .description {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    gap: 8px;

    svg {
      flex-shrink: 0;
    }

    span {
      font-size: 15px;
    }
  }

  p {
    font-size: 13px;
    line-height: 1.3;
    color: #6a737c;

    a {
      text-decoration: none;
      color: #0274cb;

      :hover {
        color: #0d96ff;
      }
    }
  }
`;

function Overview() {
  return (
    <Container>
      <h1>Join the Stack Overflow community</h1>
      <div className="description">
        <Question />
        <span>Get unstuck — ask a question</span>
      </div>
      <div className="description">
        <Vote />
        <span>Unlock new privileges like voting and commenting</span>
      </div>
      <div className="description">
        <Tag />
        <span>Save your favorite questions, answers, watch tags, and more</span>
      </div>
      <div className="description">
        <Badge />
        <span>Earn reputation and badges</span>
      </div>
      <p>
        Collaborate and share knowledge with a private group for FREE. <br />
        <a href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up">
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </p>
    </Container>
  );
}

export default Overview;
