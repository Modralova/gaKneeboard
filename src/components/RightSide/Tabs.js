import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Route from './Tabs/Route/Route';
import Logbook from './Tabs/Logbook/Logbook';

import { useSelector } from "react-redux";
// import store from "../../Store/ReduxStore";
// import { addSection, removeSection, routeUpdate, alertQuery, setAlert } from "../../Store/ReduxReducers"

import { ThemeProvider } from "@mui/material";
import RouteTheme from "./Tabs/Route/Route_theme";



function CustomTabPanel(props) {


  const { children, value, index, ...other } = props;



  return (

    <div

      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&

        (
          <Box sx={{ p: 0 ,heigth: 630, overflow: "scroll"}}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
        )
      }
    </div>
  );
}



CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function RightSide() { 

  const routeState = useSelector(state => state.routeReducer).route;
  const logbookTimesState = useSelector(state => state.expaReducer);


  let total = routeState.reduce((total, slice) => {

    return { time: total.time += slice.sec, distance: total.distance += parseInt(slice.s) };

  }, { time: 0, distance: 0 });




  var date = new Date(0);

  date.setSeconds(total.time);

  var time = date.toISOString().substring(11, 19);



  const [value, setValue] = React.useState(0);



  const handleChange = (event, newValue) => {



    setValue(newValue);
  };



  return (
    <Box className="rightSide" sx={{ py: 2, width: '90%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}
          onChange={handleChange}
          aria-label="rightSide"
          textColor="secondary"
          indicatorColor="secondary"
        > 
        
          <Tab label="ROUTE" />
          <Tab label="LOAD" />
          <Tab label="LOGBOOK" />
         
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}  >
        <Box sx={{ p: 3 }}>
         
           <span style={{ display: "flex", flexDirection: "row", padding: "0px 30px 0px 30px",  justifyContent:"space-between",fontSize: 12   }}>
              <Typography variant="c3" component="p">total distance: </Typography>
              <Typography id="AP" variant="c1" component="p" >&nbsp; {total.distance}nm </Typography>
            </span>  
             <span style={{ display: "flex", flexDirection: "row", padding: "0px 30px 0px 30px",  justifyContent:"space-between",fontSize: 12   }}>
              <Typography variant="c3" component="p">total time: </Typography>
              <Typography id="AP" variant={"c1"} component="p" >&nbsp; {time}</Typography>
            </span>
         
        </Box>
        <Route />
       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} />
      <CustomTabPanel value={value} index={2} >
     
      <Box sx={{ p: 3}}>
          
            <span style={{ display: "flex", flexDirection: "row",  padding: "0px 30px 0px 30px",  justifyContent:"space-between",fontSize: 12  }}>
              <Typography variant="c3" component="p">total air time: </Typography>
              <Typography id="AP" variant={"c1"} component="p" >&nbsp; {logbookTimesState.airTime}</Typography>
            </span> 
            <span style={{ display: "flex", flexDirection: "row",  padding: "0px 30px 0px 30px",  justifyContent:"space-between",fontSize: 12  }}>
              <Typography variant="c3" component="p">total taxi time: </Typography>
              <Typography id="AP" variant={"c1"} component="p" >&nbsp; {logbookTimesState.taxiTime}</Typography>
            </span>  
            <span style={{ display: "flex", flexDirection: "row", padding: "0px 30px 0px 30px",  justifyContent:"space-between",fontSize: 12 }}>
              <Typography variant="c3" component="p">total block time: </Typography>
              <Typography id="AP" variant={"c1"} component="p" >&nbsp; {logbookTimesState.blockTime}</Typography>
            </span>   
          
        </Box>
       
        <Logbook/>
      </CustomTabPanel>
   
      
    
    </Box>
  );
}