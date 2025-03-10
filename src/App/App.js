import {
  ThemeProvider, CssBaseline,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import NotFound from '@pages/NOTFOUND/NotFound';
import Toasts from '@pages/NTP/components/BOXES/Toasts';

import Login from './Login&Registration/Login';
import Registration from './Login&Registration/Registration';

import Settings from './Account/Profile/Profile';

import RouterGroupLandscape from './RouterGroupLandscape';
import RouterGroupPortrait from './RouterGroupPortrait';
import './App.min.css';

import darkTheme from '../styles/MUI_darkTheme';
import lightTheme from '../styles/MUI_lightTheme';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const alertState = useSelector((state) => state.alertReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const viewState = useSelector((state) => state.viewReducer);
  const [theme, setTheme] = useState(lightTheme);
  const themeState = useSelector((store) => store.themeReducer).theme;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLandscape = windowWidth / windowHeight > 1;

  useEffect(() => {
    if (themeState === 'light') setTheme(lightTheme);
    else setTheme(darkTheme);
  }, [themeState]);

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!loginState.logged

        && (
        <Router>
          <div className="App App__login App__register">

            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/register">
                <Registration />
              </Route>
              <Route path="/updateps">
                <Registration />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
            <Toasts open={alertState.show} />
          </div>
        </Router>
        )}

      {loginState.logged && viewState.mainView

        && (
        <Router>
          {isLandscape ? <RouterGroupLandscape /> : <RouterGroupPortrait x />}
        </Router>
        )}

      {viewState.profileView

        && (
        <Router>
          <div className="App App__profile, App__account">
            <Route path="/">
              <Settings />
            </Route>
          </div>
        </Router>
        )}

    </ThemeProvider>

  );
}

export default App;
