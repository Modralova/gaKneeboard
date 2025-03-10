import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';

const config = {

  headers: {

    'Content-Type': 'application/json',
  },
};



const TAF = await axios.get(process.env.WHEATHER_URI, config).then((res) => res.data);

function Weather() {
  return (

    <Box
      className="weather"
      key="0"
      sx={{
        p: 1,
        my: 1,
        mx: 'auto',
        height: 850,
        width: 400,
        overflow: 'auto',

      }}
    >
      {/* color:"#b5cfa9" */}
      {TAF && TAF.map((report) => (

        <Card
          key={`${report.id}`}
          sx={{
            mt: 0,
            mb: 1,
            mx: 3,
            p: 2,
            fontSize: 15,

            '@media screen and (orientation: portrait)': {
              fontSize: 12,
              px: 1,
            },

          }}
        >

          <Typography id="AP" variant="c1" component="p">
            {report.airport}
            {' '}
            {report.filetime}
          </Typography>
          <br />
          <Typography variant="c2" component="p">{report.valid_from}</Typography>
          <Typography variant="c2" component="p">{report.valid_to}</Typography>
          <br />
          <Typography variant="c3" component="p">{report.message}</Typography>
          <br />

        </Card>
      ))}

    </Box>
  );
}

export default Weather;
