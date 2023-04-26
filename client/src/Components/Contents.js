import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserInfo } from './UserInfo';
import { getTimeElapsed } from './TimeElapsed';
import { useSelector } from 'react-redux';

const ContentWrapper = styled.section`
  display: flex;
  align-items: flex-start;
  .main-content {
    width: 100%;
    .text {
      margin: 0;
      font-size: 15px;
      line-height: 22.5px;
      padding-top: 4px;
    }
  }
`;

// 질문 내용 아래 공유, 수정, 삭제 옵션 ~ 작성자 정보 스타일링
const Utils = styled.div`
  display: flex;
  color: red;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 16px 0;
  padding-top: 4px;
  .modified-date {
    font-size: 12px;
    color: var(--blue-600);
    padding-top: 7px;
  }
`;

// 공유, 수정, 삭제 옵션들 스타일링
const Options = styled.div`
  display: flex;
  color: var(--black-500);
  font-size: 13px;
  margin: -4px;
  button {
    height: 17px;
    margin-top: 2px;
    padding-top: 7px;
    color: var(--black-500);
    font-size: 13px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const Content = () => {
  const { user } = useSelector((state) => state.loginReducer);
  const params = useParams();
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <div className="main-content">
        <Utils>
          <Options>
            <button>Share</button>
            <>
              <button>Edit</button>
              <button>Delete</button>
            </>
          </Options>

          <span className="modified-date">edited {getTimeElapsed()}</span>

          <UserInfo />
        </Utils>
      </div>
    </ContentWrapper>
  );
};
