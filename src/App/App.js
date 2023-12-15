import { Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";


import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import NotFound from "../pages/NOTFOUND/NotFound";
import Toasts from "../pages/NTP/components/BOXES/Toasts";

import Login from "../Login&Registration/Login";
import Registration from "../Login&Registration/Registration";

import Settings from "../Account/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";



import RouterGroupLandscape from "./RouterGroupLandscape";
import RouterGroupPortrait from "./RouterGroupPortrait";
import "./App.min.css";

import darkTheme from "../styles/MUI_darkTheme";
import ligthTheme from "../styles/MUI_ligthTheme";



const App = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const alertState = useSelector(state => state.alertReducer);
  const loginState = useSelector(state => state.loginReducer);
  const viewState = useSelector(state => state.viewReducer);
  const [theme, setTheme] = useState(ligthTheme);
  const themeState = useSelector(store => store.themeReducer).theme;

  const handleResize = () => {

    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {

      window.removeEventListener("resize", handleResize);
    }
  }, [])


  let isLandscape = windowWidth / windowHeight > 1;







  useEffect(() => {


    themeState === "ligth" ? setTheme(ligthTheme) : setTheme(darkTheme)


  }, [themeState]);




  return (


    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!loginState.logged && 


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
      }

      {loginState.logged && viewState.mainView &&

        <Router>
          {isLandscape ? <RouterGroupLandscape /> : <RouterGroupPortrait x />}


          {/* <div className="App App__landscape App__portrait">
            <Toasts open={alertState.show} />
            <MenuAppBar />


            <LeftSide />
            <RightSide />




            <main className="desktop" >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/logbook">
                  <LogBook />
                </Route>
                <Route path="/tov">
                  <NTP />
                </Route>
                <Route path="/load">
                  <LOAD />
                </Route>
                <Route path="/desktop">
                  <Desktop/>
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </main>
            <Foot />
          </div> */}


        </Router>



      }

      {viewState.profileView &&


        <Router>
          <div className="App App__profile, App__account">
            <Route path="/">
              <Settings />
            </Route>
          </div>
        </Router>

      }

    </ThemeProvider>

  );
}

export default App;