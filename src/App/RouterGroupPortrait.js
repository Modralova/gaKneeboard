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
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';


import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

        marginRight: -drawerWidth,

        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
        position: 'relative',
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {

        easing: theme.transitions.easing.sharp,

        duration: theme.transitions.duration.leavingScreen,

    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerRightHeader = styled('div')(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const DrawerLeftHeader = styled('div')(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



function RouterGroupPortrait() {


    const alertState = useSelector(state => state.alertReducer);
    const theme = useTheme();
    const [rightOpen, setRightOpen] = React.useState(false);
    const [leftOpen, setLeftOpen] = React.useState(false);

    const handleDrawerRightOpen = () => {

        setRightOpen(true);

    };

    const handleDrawerLeftOpen = () => {

        setLeftOpen(true);

    };

    const handleDrawerRightClose = () => {

        setRightOpen(false);

    };

    const handleDrawerLeftClose = () => {

        setLeftOpen(false);

    };
    return (
        <div className="App App__portrait">
            <Toasts open={alertState.show} />

            <MenuAppBar />
            <Box sx={{

                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }} className="chevrons">

                <Box open={leftOpen} className="chevronleft">
                    <IconButton
                        size="large"
                        color="info"
                        aria-label="open left drawer"
                        edge="start"
                        onClick={handleDrawerLeftOpen}
                        sx={{ ...(leftOpen && { display: 'none' }) }}
                    ><ChevronRightIcon /></IconButton>


                </Box>
                <Box open={rightOpen} className="chevronright">
                    <IconButton
                        size="large"
                        color="info"
                        aria-label="open right drawer"
                        edge="end"
                        onClick={handleDrawerRightOpen}
                        sx={{ ...(rightOpen && { display: 'none' }) }}
                    > <ChevronLeftIcon /></IconButton>


                </Box>


            </Box>



            <Main className="desktop"
                sx={{
                    "@media screen and (orientation:portrait)": {

                        marginY: 0
                    }
                }}>
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
                <Foot />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={rightOpen}
                >
                    <DrawerRightHeader>
                        <IconButton onClick={handleDrawerRightClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerRightHeader>
                    <Divider />
                    <RightSide />
                </Drawer>



                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={leftOpen}
                >
                    <DrawerLeftHeader>
                        <IconButton onClick={handleDrawerLeftClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerLeftHeader>
                    <Divider />
                    <LeftSide />
                </Drawer>
            </Main>
        </div>
    )
}

export default RouterGroupPortrait
