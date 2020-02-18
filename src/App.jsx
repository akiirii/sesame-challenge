import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Typeahead from './Typeahead/index';
import mockData from './mock/mockData';
import '@csstools/normalize.css';

import { COLORS } from './Typeahead/constants';

const Main = styled.div`
  background: ${COLORS.greyPastel};
  height: 100vh;
  padding: 50px;
`;

const Box = styled.div`
  max-width: 400px;
  margin: auto
`;

const App = () => {
  const [fruit, setFruit] = useState('');
  return (

    <Main className="App">
      <Box>
        <h2>
          Sesame FE Code Challenge:
          {fruit}
        </h2>
        <Typeahead dataSource={mockData} value={fruit} onChange={setFruit} />
      </Box>
    </Main>
  );
};

export default hot(module)(App);
