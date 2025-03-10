import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { setExpa } from '@store/LogbookSlice';
import { setLogbookId } from '@store/idSlice';

const fetchLogbook = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.get(process.env.LOGBOOK_URI, config).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).catch();
};

function Logbook() {
  const [logbook, setLogbook] = useState([]);

  const loginState = useSelector((state) => state.loginReducer).logged;

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginState) {
      fetchLogbook().then((logboookData) => {
        setLogbook(logboookData);
      });
    }
  }, [loginState]);

  const handleSetLogbookId = (event) => {
    let idToSet = '';

    if (event.target.className.includes('logbook-card') && window.location.href === process.env.LOGIN_URI+'#/logbook') {
      idToSet = event.target.id;
      dispatch(setLogbookId({ logbookId: idToSet }));
    }

    if (event.target.parentNode.className.includes('logbook-card') && window.location.href === process.env.LOGIN_URI+'#/logbook') {
      idToSet = event.target.parentNode.id;

      dispatch(setLogbookId({ logbookId: idToSet }));
    }
  };

  const Experience = logbook && logbook.reduce((total, fligth) => {
    const miliseconds = (timeString) => Date.parse(`1970-01-01 ${timeString} GMT+00:00`);

    const timeOutput = (time) => {
      const tArry = (time / 3600000).toFixed(2).toString().trim().split('.');

      return `${tArry[0]}:${((tArry[1] / 100) * 60).toFixed(0)}`;
    };

    return {
      block_time: total.block_time += miliseconds(fligth.block_time),
      taxi_time: total.taxi_time += miliseconds(fligth.taxi_time),
      air_time: total.air_time += miliseconds(fligth.air_time),
      block_time_string: timeOutput(total.block_time),
      taxi_time_string: timeOutput(total.taxi_time),
      air_time_string: timeOutput(total.air_time),
    };
  }, { block_time: 0, air_time: 0, taxi_time: 0 });

  useEffect(() => {
    dispatch(setExpa(Experience));
  }, [Experience]);

  return (
    <Box
      className="logbook"
      key="3"
      sx={{
        my: 1, mx: 'auto', height: 700, width: 400, overflow:"scroll"
      }}
    >

      {

         !logbook ? <CircularProgress /> : logbook.toReversed().map((fligth) => (
           <Card
             key={v4()}
             className="logbook-card"
             id={fligth.id}
             sx={{
               mt: 0,
               mb: 1,
               mx: 4,
               p: 2,
               fontSize: 15,
               '@media screen and (orientation: portrait)': {
                 fontSize: 12,
                 px: 1,
               },
             }}
             onClick={handleSetLogbookId}
           >

             <Typography id="AP" variant="c1" component="p">{fligth.date}</Typography>
             <Typography id="AP" variant="c2" component="p">
               {fligth.departure_place}
               {'=>'}
               {fligth.arrival_place}
             </Typography>
             <Typography id="AP" variant="c1" component="p">
               {fligth.departure_time}
               {'=>'}
               {fligth.arrival_time}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {fligth.aircraft_model}
               {', '}
               {fligth.aircraft_registration}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'PIC: '}
               {fligth.PIC_name}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'task: '}
               {fligth.task}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'landings: '}
               {fligth.landings_day}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'block time: '}
               {fligth.block_time}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'air time: '}
               {fligth.air_time}
             </Typography>
             <Typography id="AP" variant="c3" component="p">
               {'taxi time: '}
               {fligth.taxi_time}
             </Typography>
           </Card>
         ))

        }

    </Box>
  );
}

export default Logbook;
