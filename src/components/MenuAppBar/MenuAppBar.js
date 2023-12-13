import * as React from 'react';
//import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setProfileView } from '../../Store/viewSlice';
import {fetchLogged }from "../../Store/loginSlice";
import { useTranslation } from 'react-i18next';



const  MenuAppBar = () => {

  const [t,i18n] = useTranslation("global");
  const dispatch = useDispatch();
  // const outerTheme = useTheme();

  const userState = useSelector(state => state.loginReducer);
  const [page, setPage] = React.useState(() => { return "HOME" });
  const [auth, setAuth] = React.useState(true);
  // const [mode, setMode] = React.useState(true);    //https://mui.com/material-ui/customization/dark-mode/

  const [anchorEl_tools, setAnchorEl_tools] = React.useState(null);
  const [anchorEl_user, setAnchorEl_user] = React.useState(null);



  React.useEffect(() => {

    let currentPage = window.location.href.replace(window.location.origin.concat("/"), "")


    if (currentPage === "") {

      currentPage = "HOME";

    }

    setPage(() => { return currentPage.toUpperCase() });

  }, [window.location.href]);

  //window.location.href.replace(window.location.origin.concat("/"), "");


  const handleChange = (event) => {
    setAuth(event.target.checked);

  };

  const handleModeChange = (event) => {
    setMode(event.target.checked);
    console.log("mode: ", mode);
  };

  const handleLogout = () =>{

   
     dispatch(fetchLogged());
     sessionStorage.removeItem("SESS_ID");
     sessionStorage.removeItem("SESSLOGIN");
     
    
  }

  const profileView =() =>{


     dispatch(setProfileView());

  }


  const handleMenu = (event) => {

    switch (event.currentTarget.ariaLabel) {
      case "tools":
        setAnchorEl_tools(event.currentTarget);
        break;

      case "user":
        setAnchorEl_user(event.currentTarget);
        break;

      default:
        break;
    }
  };


  const handleClose = (e) => {

    setPage(e.target.textContent);

    setAnchorEl_user(null);
    setAnchorEl_tools(null);

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
                anchorEl={anchorEl_tools}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl_tools)}
                onClose={handleClose}
              >
               
                <MenuItem onClick={handleClose}><Link to="/" >{t("menus.leftMenuLables.HOME")}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/logbook" >{t("menus.leftMenuLables.LOGBOOK")}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/ntp" >{t("menus.leftMenuLables.ToV")}</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/load" >{t("menus.leftMenuLables.LOAD")}</Link></MenuItem>
                
              </Menu>

            </div>


            <Typography variant="h6" component="div" sx={{ flexGrow: 2, ml: 5 }}>{page}</Typography>

            <Box> <Typography variant="h9" component="div" sx={{ flexGrow: 2, ml: 5 }}>{userState.login}</Typography></Box>


            {auth && (
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
                  anchorEl={anchorEl_user}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl_user)}
                  onClose={handleClose}
                >
                  
                  <MenuItem onClick={profileView}><Link to="/" >profile</Link></MenuItem>
                  <MenuItem onClick={handleClose}><Link to="/myAccount" >my account</Link></MenuItem>
                  <MenuItem onClick={handleLogout}><Link to="/" >logout</Link></MenuItem>
                
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
 

  );
}

export default MenuAppBar;

