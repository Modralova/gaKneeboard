import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NTP from '@pages/NTP/NTP';
import Toasts from '@pages/NTP/components/BOXES/Toasts';
import LOAD from '@pages/LOAD/LOAD';
import LogBook from '@pages/LOGBOOK/LOGBOOK';
import NotFound from '@pages/NOTFOUND/NotFound';

import LeftSide from '@components/LeftSide/Tabs';
import RightSide from '@components/RightSide/Tabs';
import Foot from '@components/Foot/Foot';
import Home from '@pages/HOME/Home';
import MenuAppBar from '@components/MenuAppBar/MenuAppBar';

// import Framer from '@pages/FRAMER/Framer';

function RouterGroupLandscape() {
  const alertState = useSelector((state) => state.alertReducer);

  return (

    <div className="App App__landscape">

      <Toasts open={alertState.show} />

      <MenuAppBar />
      <LeftSide />
      <RightSide />

      <main className="desktop">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/logbook">
            <LogBook />
          </Route>
          <Route path="/triangle">
            <NTP />
          </Route>
          <Route path="/load">
            <LOAD />
          </Route>
          {/* <Route path="/framer">
            <Framer />
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Foot />
    </div>
  );
}

export default RouterGroupLandscape;
