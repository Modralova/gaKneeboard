import React from "react";
import { Paper } from "@mui/material";

import Box from '@mui/material/Box';
import "./Home.min.css"



const Home = () => {
    return (
        <Box className="home" sx={{ marginY: '80px',
        padding: 3,
        "@media screen and (orientation: portrait)": {
           marginY: "40px"
        }
       
        }} >
       
        <Paper className="weather-paper"  sx={{ display: "flex", justifyContent: "center",   mt: 0 }}>
    
       
                    <img id="significant" src="https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF"  alt="https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF" />
        
        </Paper>
        </Box>
    );
}

export default Home;