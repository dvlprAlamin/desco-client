import React from 'react';
import { ContextProvider } from './context';
import Home from './pages/Home';

const App = () => {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
};

export default App;