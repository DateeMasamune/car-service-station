import React from 'react';

import Router from './components/Router/Router';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <SideBar>
      <Router />
    </SideBar>
  );
}

export default App;
