import React from "react";
import { Paper} from "@mui/material";

import Box from '@mui/material/Box';
import "./Home.min.css"



const Home = () => {
    return (

  
    <Paper>
        <Box sx={{ display:"flex",   justifyContent:"center",margin : 15, padding:3}}>
              <img src="https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF" width={420} heigth={140} 
                  alt="https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF" /> 
             
        </Box>
        </Paper>
   
    );
}

export default Home;