import AskQuestion from '../Components/AskQuestion';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import styled from 'styled-components';
import Header from '../Components/Header';
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

function Ask() {
  return (
    <>
      <Header />
      <CommonLayout>
        <LeftAside>
          <Nav />
        </LeftAside>
        <AskQuestion />
      </CommonLayout>
      <Footer />
    </>
  );
}

export default Ask;
