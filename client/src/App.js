import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import QuestionList from './Pages/QuestionList';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
      background-color: white;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <QuestionList />
    </div>
  );
}

export default App;
