import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';


import LeftSide from "../../LeftSide/Tabs"
import RightSide from "../../RightSide/Tabs"

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const DrawerLeftHeader = styled('div')(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Desktop() {

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
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      
      <Main open={rightOpen}>
        {/* <DrawerLeftHeader />  <DrawerRightHeader /> */}


        <IconButton
          aria-label="open left drawer"
          edge="start"
          onClick={handleDrawerLeftOpen}
          sx={{ ...(leftOpen && { display: 'none' }) }}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          aria-label="open right drawer"
          edge="end"
          onClick={handleDrawerRightOpen}
          sx={{ ...(rightOpen && { display: 'none' }) }}
        >
          <ChevronLeftIcon />
        </IconButton>



        
      </Main>
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
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerLeftHeader>
        <Divider />
        <LeftSide />
      </Drawer>
    </Box>
  );
}