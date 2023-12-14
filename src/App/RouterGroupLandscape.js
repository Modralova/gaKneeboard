import React from 'react'

import { Route, Switch } from 'react-router-dom';

import LeftSide from "../components/LeftSide/Tabs";
import RightSide from "../components/RightSide/Tabs";
import Foot from "../components/Foot/Foot";
import Home from "../components/Home/Home";
import NotFound from "../pages/NOTFOUND/NotFound";
import Toasts from "../pages/NTP/components/BOXES/Toasts";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar";

import NTP from "../pages/NTP/NTP";
import LOAD from "../pages/LOAD/LOAD";
import LogBook from "../pages/LOGBOOK/LOGBOOK";
import { useSelector, useDispatch } from "react-redux";

function RouterGroupLandscape() {
  const alertState = useSelector(state => state.alertReducer);

  return (

    <div className="App App__landscape">
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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
    <Foot />
  </div>
  )
}

export default RouterGroupLandscape
