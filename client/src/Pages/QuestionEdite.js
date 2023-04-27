import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import { useNavigate, useParams } from 'react-router-dom';
const CommonLayout = styled.main`
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
`;

const LeftAside = styled.aside`
  position: sticky;
  top: 50px;
  height: 100%;
  min-width: 164px;
  padding-top: 24px;
  margin-bottom: 8px;
`;

const RightAside = styled.aside`
  height: 100%;
  display: block;
  margin-top: 30px;
  padding-right: 24px;
  ul {
    width: 300px;
    padding: 0;
    display: block;
    text-align: left;
    align-items: center;
    height: auto;
    background-color: hsl(47, 87%, 94%);
    border-radius: 3px;
    border: 1px solid hsl(47, 65%, 84%);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
    > li {
      width: 100%;
      padding: 0 15px;
      margin: 12px 0;
      font-size: 13px;
      list-style-type: disc;
      list-style-position: inside;
    }
    .widget-header {
      width: 100%;
      height: 41px;
      padding: 15px;
      font-weight: 700;
      font-size: 12px;
      background-color: hsl(47, 83%, 91%);
      border-bottom: 1px solid hsl(47, 65%, 84%);
      list-style-type: none;
      margin: 0;
    }
    .widget-header:nth-child(4) {
      border-top: 1px solid hsl(47, 65%, 84%);
    }
  }
`;
let Container = styled.div`
  padding: 24px 24px 24px 24px;
`;

let 설명 = styled.div`
  background-color: #fdf7e3;
  border: 1px solid #e7cf79;
  padding: 24px;
  margin-bottom: 25px;
  border-radius: 3px;
`;

let 설명제목 = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

let 설명내용 = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

let TitleBox = styled.div`
  border: 1px solid black;
  padding: 24px;
  border-radius: 3px;
  margin-bottom: 25px;
`;

let Title제목 = styled.div`
  font-size: 21px;
  font-weight: 700;
`;

let Title입력 = styled.input`
  width: 100%;
  border: 1px solid black;
  padding: 7.8px 9.1px;
  border: 1px solid black;
  border-radius: 3px;
  margin: 10px 0px;
`;

let Title버튼 = styled.button`
  background-color: #2f95e2;
  border-radius: 3px;
  padding: 0.7em 1em 0.7em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  :hover {
    background: #0274cc;
  }
`;

let Body입력 = styled(Title입력)`
  width: 100%;
  border: 1px;
  padding: 7.8px 9.1px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px 0px;
  height: 200px;
`;

function QuestionEdite() {
  let navigate = useNavigate();
  let token = localStorage.getItem('access_token');
  const [타이틀내용, set타이틀내용] = useState('');
  const [바디내용, set바디내용] = useState('');
  let { id } = useParams();
  return (
    <>
      <Header />

      <CommonLayout>
        <LeftAside>
          <Nav />
        </LeftAside>
        <Container>
          <설명>
            <설명제목>
              Your edit will be placed in a queue until it is peer reviewed.
            </설명제목>
            <설명내용>
              We welcome edits that make the post easier to understand and more
              valuable for readers. Because community members review edits,
              please try to make the post substantially better than how you
              found it, for example, by fixing grammar or adding additional
              resources and hyperlinks.
            </설명내용>
          </설명>
          {타이틀내용.length < 5 && 타이틀내용.length !== 0 && (
            <p style={{ color: 'red' }}>
              경고: 타이틀 내용은 5글자 이상이어야 합니다.
            </p>
          )}
          <TitleBox>
            <Title제목>Title</Title제목>
            <div>
              Be specific and imagine you’re asking a question to another
              person.
            </div>
            <Title입력
              placeholder="e.g Is there an R function for finding the index of an element in a vector?"
              type="text"
              value={타이틀내용}
              onChange={(e) => {
                set타이틀내용(e.target.value);
              }}
            ></Title입력>
          </TitleBox>
          {바디내용.length < 20 && 바디내용.length !== 0 && (
            <p style={{ color: 'red' }}>
              경고: 바디 내용은 20글자 이상이어야 합니다.
            </p>
          )}
          <TitleBox>
            <Title제목>What are the details of your problem?</Title제목>
            <div>
              Describe what you tried, what you expected to happen, and what
              actually resulted. Minimum 20 characters.
            </div>
            <Body입력
              value={바디내용}
              onChange={(e) => {
                set바디내용(e.target.value);
              }}
            ></Body입력>
          </TitleBox>
          <Title버튼
            onClick={() => {
              axios
                .patch(
                  '/questions/' + id,
                  {
                    title: 타이틀내용,
                    body: 바디내용,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                )
                .catch(() => {
                  console.log('실패함');
                });
              if (바디내용.length >= 20 && 타이틀내용.length >= 5) {
                set타이틀내용('');
                set바디내용('');
                navigate('/questions/' + id);
              }
            }}
          >
            Save Edit
          </Title버튼>
        </Container>
        <RightAside>
          <ul>
            <li className="widget-header">The Overflow Blog</li>
            <li>
              A flight simulator for developers to practice real world
              challenges and...
            </li>
            <li>
              Goodbye Webpack, hello Turbopack! The big news from today’s
              Next.JS conference
            </li>
            <li className="widget-header">Featured on Meta</li>
            <li>The 2022 Community-a-thon has begun!</li>
            <li>Mobile app infrastructure being decommissioned</li>
            <li>Staging Ground Workflow: Canned Comments</li>
            <li>The Ask Wizard (2022) has graduated</li>
          </ul>
        </RightAside>
      </CommonLayout>
      <Footer />
    </>
  );
}

export default QuestionEdite;
