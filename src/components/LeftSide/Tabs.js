import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Weather from "./Tabs/Wheather/Weather"
import { useTranslation } from 'react-i18next';


import notam from "../../images/n_logo_dins.gif";




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
      {value === index && (
        <Box sx={{ p: 0, heigth: 480, overflow: "scroll" }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
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


export default function LeftSide() {

  const [value, setValue] = React.useState(0);
  const [t,i18n] = useTranslation("global");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="leftSide" sx={{ py: 2, width: '90%', 
   
    
    }}>
      <Box sx={{ borderBottom: 1, 
        borderColor: 'divider' 
       
        }}>
        <Tabs value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label={t("tabs.leftTabLabels.TAF")} />
          <Tab label={t("tabs.leftTabLabels.LINKS")} />
          <Tab label={t("tabs.leftTabLabels.NOTEPAD")} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Weather />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ m: 5 }}>
          <a href={"https://www.notams.faa.gov/dinsQueryWeb/"} rel="noreferrer" target="_blank">
            <img src={notam} alt="notam" width="243px" height="70px" />
          </a>
          <Typography component="p">
            <a href={"https://www.ais.pansa.pl/publikacje/aip-vfr/"}
              rel="noreferrer" target="_blank"
              style={{ textDecoration: "none" }}>
              - AIP
            </a>
          </Typography>
          <Typography component="p">
            <a href={" https://airspace.pansa.pl/"}
              rel="noreferrer" target="_blank"
              style={{ textDecoration: "none" }}>
              - AUP/UUP
            </a>
          </Typography>
          {/* https://www.icao.int/Pages/default.aspx */}
          {/* https://pl.sat24.com/pl/forecastimages */}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>


      </CustomTabPanel>
    </Box>
  );
}