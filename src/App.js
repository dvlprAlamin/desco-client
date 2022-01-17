import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CustomAlert from './components/CustomAlert';
import PrivateRoute from './components/PrivateRoute';
import { ContextProvider } from './context';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <CustomAlert />
        <Switch>
          <PrivateRoute exact path={'/'}>
            <Home />
          </PrivateRoute>
          <Route exact path={'/login'} component={LoginSignup} />
          <Route exact path={'/Signup'} component={LoginSignup} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;