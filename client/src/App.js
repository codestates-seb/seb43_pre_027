import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import QuestionsDetail from './Pages/QuestionsDetail';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
  }
  body {
    background-color: white;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <QuestionsDetail />
    </div>
  );
}

export default App;
