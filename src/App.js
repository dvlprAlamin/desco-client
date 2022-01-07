import { ThemeProvider } from '@mui/styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { ContextProvider } from './context';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            {/* <PrivateRoute exact path={'/'}>
              <Home />
            </PrivateRoute> */}
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={LoginSignup} />
            <Route exact path={'/Signup'} component={LoginSignup} />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;