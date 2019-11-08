import React from 'react';
import logo from './logo.svg';
import './App.css';

import { S3Album } from 'aws-amplify-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <S3Album
        picker
        path=""
      />
      </header>
    </div>
  );
}

export default App;