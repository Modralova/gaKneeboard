import React from 'react';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';
import './Home.min.css';

function Home() {
  return (
    <Box
      className="home"
      sx={{ mx: 'auto', 
        my: 10, 
        height:800,
        overflow:"auto",
        '@media screen and (orientation:portrait)': {
          height:700,
          my:0
        }

      }}
    > 

      <Paper className="weather-paper" sx={{ display: 'flex', padding: 3 }}>

        <img id="significant"
          src={process.env.SIGMET_URI}
          alt="https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF" />

      </Paper>
    </Box>
  );
}

export default Home;
