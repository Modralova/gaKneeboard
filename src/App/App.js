import { Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeftSide from "../components/LeftSide/Tabs";
import RightSide from "../components/RightSide/Tabs";
import Foot from "../components/Foot/Foot";
import Home from "../components/Home/Home";
import NotFound from "../pages/NOTFOUND/NotFound";
import Toasts from "../pages/NTP/components/BOXES/Toasts";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar";
import Login from "../Login&Registration/Login";
import Registration from "../Login&Registration/Registration";
import NTP from "../pages/NTP/NTP";
import LOAD from "../pages/LOAD/LOAD";
import LogBook from "../pages/LOGBOOK/LOGBOOK";
import Settings from "../Account/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import Desktop from "../components/Desktop/Desktop/Desktop";


import RouterGroupLandscape from "./RouterGroupLandscape";
import RouterGroupPortrait from "./RouterGroupPortrait";
import "./App.min.css";

import darkTheme from "../styles/MUI_darkTheme";
import ligthTheme from "../styles/MUI_ligthTheme";



const App = () => {


  const alertState = useSelector(state => state.alertReducer);
  const loginState = useSelector(state => state.loginReducer);
  const viewState = useSelector(state => state.viewReducer);
  const [theme, setTheme] = useState(ligthTheme);


  const themeState = useSelector(store => store.themeReducer).theme;

  const dispatch = useDispatch();

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

          <RouterGroupLandscape className="App App__landscape"/>
          <RouterGroupPortrait className="App App__portrait"/>

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