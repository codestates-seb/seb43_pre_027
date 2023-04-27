/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const AnswerLayout = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  padding-bottom: calc(8px * 1);
  margin-bottom: calc(16px * 1);
  border-color: hsl(210, 8%, 90%);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const LayoutLeft = styled.div`
  width: auto;
  padding-right: calc(16px * 1);
  vertical-align: top;
  grid-column: 1;
`;

const VoteGroupUP = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  margin: calc((4px * 1) / 2 * -1);
  color: hsl(210, 8%, 75%);
  button {
    margin: calc((4px * 1) / 2);
    outline: initial;
    cursor: pointer;
    border: none;
    background-color: white;
  }
`;

const VoteTotal = styled.div`
  margin: calc((4px * 1) / 2);
  display: flex;
  font-size: 1.61538462rem;
  align-items: center;
  flex-direction: column;
  color: hsl(210, 8%, 45%);
  box-sizing: inherit;
`;

const VoteGroupDown = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  margin: calc((4px * 1) / 2 * -1);
  color: hsl(210, 8%, 75%);
  button {
    margin: calc((4px * 1) / 2);
    outline: initial;
    cursor: pointer;
    border: none;
    background-color: white;
  }
`;

const LayoutRigth = styled.div`
  vertical-align: top;
  padding-right: calc(16px * 1);
  grid-column: 2;
  width: auto;
  min-width: 0;
`;

const AnswerBody = styled.div`
  width: 100%;
  margin-bottom: 1.1em;
  clear: both;
  margin-top: 0;
  li {
    word-wrap: break-word;
  }
`;

const AnswerInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
  margin: calc((8px * 1) / 2 * -1);
`;

const UserInfo = styled.div`
  margin-right: 0;
  margin-left: 0;
  margin: calc((8px * 1) / 2);
  box-sizing: border-box;
  padding: 5px 6px 7px 7px;
  text-align: left;
  vertical-align: top;
  width: 200px;
`;

const UserName = styled.div`
  color: hsl(206, 100%, 40%);
  text-decoration: none;
  cursor: pointer;
`;

const AnswerEdit = styled.div`
  padding-top: 2px * 1;
  flex: 1 1 100px;
  input {
    padding: 10px;
    margin: -1px 0 0;
    height: 100px;
    line-height: 1.3;
    width: 100%;
    font-size: 1.15384615rem;
    tab-size: 4;
  }
  button {
    border: none;
    background-color: white;
    color: hsl(210, 8%, 45%);
  }
`;

const AnswerDelete = styled.div`
  button {
    border: none;
    background-color: white;
    color: hsl(210, 8%, 45%);
  }
`;

function AnswerItem({ id, answerItem, addAnswer, setAddAnswer }) {
  const [answerScore, setAnswerScore] = useState(0);

  const handleUpVote = () => {
    setAnswerScore(answerScore + 1);
  };

  const handleDownVote = () => {
    setAnswerScore(answerScore - 1);
  };

  const totalScore = answerScore;
  const totalVotes = Math.max(answerScore, 0) + Math.max(-answerScore, 0);
  const [edited, setEdited] = useState(false);
  const [newAnswer, setNewAnswer] = useState(answerItem.answer);

  const onChangeEditInput = (e) => {
    setNewAnswer(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextAnswerList = addAnswer.map((item) => ({
      ...item,
      answer: item.id === answerItem.id ? newAnswer : item.answer,
    }));
    setAddAnswer(nextAnswerList);

    setEdited(false);
  };

  const onClickEditButton = () => {
    setEdited(true);

    let token = localStorage.getItem('access_token');

    axios
      .patch(
        // comments뒤에는 member-id/댓글id
        'http://ec2-13-125-207-209.ap-northeast-2.compute.amazonaws.com/comments/' +
          id,
        {
          body: newAnswer,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((결과) => {
        console.log(결과.data);
      })
      .catch(() => {
        console.log('실패함');
      });
  };

  const editInputRef = useRef(null);

  const onClickDeletButton = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      const nextAnswerList = addAnswer.map((item) => ({
        ...item,
        deleted: item.id === answerItem.id ? true : item.deleted,
      }));
      setAddAnswer(nextAnswerList);
    }

    let token = localStorage.getItem('access_token');

    axios
      .delete(
        // comments뒤에는 member-id/댓글id
        'http://ec2-13-125-207-209.ap-northeast-2.compute.amazonaws.com/comments/' +
          id,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((결과) => {
        console.log(결과.data);
      })
      .catch(() => {
        console.log('실패함');
      });
  };

  return (
    <AnswerLayout>
      <LayoutLeft>
        <VoteGroupUP>
          <button onClick={handleUpVote}>
            <svg
              aria-hidden="true"
              className="svg-icon-up"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill={totalScore > 0 ? '#FFB41E' : '#BABFC3'}
            >
              <path d="M2 25h32L18 9 2 25Z"></path>
            </svg>
          </button>
        </VoteGroupUP>
        <VoteTotal>{totalScore}</VoteTotal>
        <VoteGroupDown>
          <button onClick={handleDownVote}>
            <svg
              aria-hidden="true"
              className="svg-icon-down"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill={totalScore < 0 ? '#FFB41E' : '#BABFC3'}
            >
              <path d="M2 11h32L18 27 2 11Z"></path>
            </svg>
          </button>
        </VoteGroupDown>
      </LayoutLeft>
      <LayoutRigth>
        <AnswerBody>{answerItem}</AnswerBody>
        <AnswerInfo>
          <AnswerDelete>
            <button type="button" onClick={onClickDeletButton}>
              Delete
            </button>
          </AnswerDelete>
          <AnswerEdit>
            {edited ? (
              <input
                type="textarea"
                value={newAnswer}
                ref={editInputRef}
                onChange={onChangeEditInput}
              />
            ) : (
              <span>{answerItem.text}</span>
            )}
            {edited ? (
              <button type="button" onClick={onClickSubmitButton}>
                👌
              </button>
            ) : (
              <button type="button" onClick={onClickEditButton}>
                Edited
              </button>
            )}
          </AnswerEdit>
          <UserInfo>
            <UserName></UserName>
          </UserInfo>
        </AnswerInfo>
      </LayoutRigth>
    </AnswerLayout>
  );
}

export default AnswerItem;
