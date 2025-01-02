import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Dashboard from './Dashboard';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orbitron', sans-serif;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Dashboard />
    </>
  );
};

export default App;

