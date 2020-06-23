import React from 'react';
import './App.css';

import Post1 from './components/usingCallbackPost';
import Post2 from './components/usingCalllbackAndMemoPosts';
import Count from './components/countUseCallback';

function App() {
  return (
    <div className="App">
      <Post1 />
      <hr/>
      <Post2 />
      <hr />
      <Count/>
    </div>
  );
}

export default App;
