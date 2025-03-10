import * as React from 'react';
// import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


import { setProfileView } from '@store/viewSlice';
import { fetchLogged } from '@store/loginSlice';

function MenuAppBar() {
  const [t, i18n] = useTranslation('global');
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginReducer);
  const [page, setPage] = React.useState(() => 'HOME');
  const [anchorElTools, setAnchorElTools] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    let currentPage = window.location.href.replace(window.location.origin.concat('/api'), '');

    if (currentPage === '') {
      currentPage = 'HOME';
    }

    setPage(() => currentPage.toUpperCase());
  }, [window.location.href]);

  // window.location.href.replace(window.location.origin.concat("/"), "");

  const handleLogout = () => {
    dispatch(fetchLogged());
    sessionStorage.removeItem('SESS_ID');
    sessionStorage.removeItem('SESSLOGIN');
  };

  const profileView = () => {
    dispatch(setProfileView());
  };

  const handleMenu = (event) => {
    switch (event.currentTarget.ariaLabel) {
      case 'tools':
        setAnchorElTools(event.currentTarget);
        break;

      case 'user':
        setAnchorElUser(event.currentTarget);
        break;

      default:
        break;
    }
  };

  const handleClose = (e) => {

    

    setAnchorElUser(null);
    setAnchorElTools(null);
  };

  return (

    <nav className="navbar">

      <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static">

          <Toolbar>

            <div>
              <IconButton
                size="large"
                aria-label="tools"
                aria-controls="menu-tools"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-tool"
                anchorEl={anchorElTools}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElTools)}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose}><Link to="/">{t('menus.leftMenuLables.HOME')}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/logbook">{t('menus.leftMenuLables.LOGBOOK')}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/triangle">{t('menus.leftMenuLables.ToV')}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/load">{t('menus.leftMenuLables.LOAD')}</Link></MenuItem>
                {/* <MenuItem onClick={handleClose}><Link to="/framer">{t('menus.leftMenuLables.FRAMER')}</Link></MenuItem> */}

              </Menu>

            </div>

            <Typography variant="h6" component="div" sx={{ flexGrow: 2, ml: 5 }}>{page === "/#/" ? "HOME" : page.replace("/#/","")}</Typography>

            <Box>

              <Typography variant="h9" component="div" sx={{ flexGrow: 2, ml: 5 }}>{userState.login}</Typography>
            </Box>

            <div>

              <IconButton
                size="large"
                aria-label="user"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
              >

                <MenuItem onClick={profileView}><Link to="/">profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/myAccount">my account</Link></MenuItem>
                <MenuItem onClick={handleLogout}><Link to="/">logout</Link></MenuItem>

              </Menu>
            </div>

          </Toolbar>
        </AppBar>
      </Box>
    </nav>

  );
}

export default MenuAppBar;
