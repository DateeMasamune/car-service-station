import { SnackbarProvider } from 'notistack';
import React from 'react';
import Router from './components/Router/Router';

function App() {
  return (
    <SnackbarProvider>
      <Router />
    </SnackbarProvider>
  );
}

export default App;
