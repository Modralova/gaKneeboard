import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSelector } from 'react-redux';

import axios from 'axios';

const auxStyle = {

  gap: 0.3, // column gap
  cW: '60px', // column width
  pT: 12,
};

export const logbook = {};

logbook.IDs = [

  ['lbr1', ' '],
  ['iD', 'date', 'DATE', 'yyyy-mm-dd'],
  ['lDep', 'departure:'],
  ['lArr', 'arrival:'],
  ['dT', 'departure_time', 'TIME', 'hh:mm'],
  ['dP', 'departure_place', 'PLACE', 'ICAO'],
  ['aP', 'arrival_place', 'PLACE', 'ICAO'],
  ['aT', 'arrival_time', 'TIME', 'hh:mm'],
  ['iES', 'engine_start', 'ENGINE START', 'hh:mm'],
  ['iESp', 'engine_stop', 'ENGINE STOP', 'hh:mm'],
  ['lAc', 'aircraft:'],
  ['iTp', 'aircraft_model', 'TYPE', 'C-152'],
  ['iRg', 'aircraft_registration', 'REGISTRATION', 'SP-XYZ'],
  ['lSp', 'single pilot:'],
  ['lMp', 'multi pilot:'],
  ['iMp', 'multi_pilot_flightime', 'MULTI PILOT TIME', 'hh:mm'],
  ['lFt', 'FLIGHT TIME:'],
  ['isE', 'single_pilot_flightime_single_engine', 'SINGLE EGN. TIME', 'hh:mm'],
  ['imE', 'single_pilot_flightime_multi_engine', 'MULTI EGN. TIME', 'hh:mm'],
  ['lTot', 'TOTAL:'],
  ['oBT', 'block_time', 'BLOCK TIME', 'hh:mm'],
  ['oAT', 'air_time', 'AIR TIME', 'hh:mm'],
  ['oTT', 'taxi_time', 'TAXI TIME', 'hh:mm'],
  ['iPIC', 'PIC_name', 'PIC name', 'JOHN SMITH'],
  ['lbr2', ' '],
  ['lL', 'landings:'],
  ['ilD', 'landings_day', 'DAY', 'integer'],
  ['ilN', 'landings_night', 'NIGHT', 'integer'],
  ['lOct', 'operational condition time:'],
  ['iNt', 'operational_condition_time_night', 'NIGHT', 'hh:mm'],
  ['iIFR', 'operational_condition_time_ifr', 'IFR', 'hh:mm'],
  ['lPft', 'pilot function time:'],
  ['aPIC', 'pilot_function_time_PIC', 'PIC', 'hh:mm'],
  ['aCp', 'pilot_function_time_coPilot', 'CO-PILOT', 'hh:mm'],
  ['aD', 'pilot_function_time_dual', 'DUAL', 'hh:mm'],
  ['aI', 'pilot_function_time_instructor', 'INSTRUCTOR', 'hh:mm'],
  ['iTk', 'task', 'TASK', 'A1'],
  ['bts', 'bts'],
];

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

function LogBook() {
  const [logBook, setLogbook] = useState([]);

  const loginState = useSelector((state) => state.loginReducer).logged;

  const [inputs, setInputs] = useState(() => ({}));

  const idState = useSelector((state) => state.idReducer).logbookId;

  useEffect(() => {
    if (loginState) {
      fetchLogbook().then((logboookData) => {
        setLogbook(logboookData);
      });
    }
  }, [loginState]);

  for (let i = 0; i < logbook.IDs.length; i++) {
    logbook[`${logbook.IDs[i][0]}`] = {};
    logbook[`${logbook.IDs[i][0]}`].ref = useRef();
    logbook[`${logbook.IDs[i][0]}`].iRef = useRef();
  }

  const handleChange = () => {
    // setInputs((data) => ({
    //   ...data,
    //   [logbook.IDs.find((ID) => ID[0] === e.target.id)[1]]: logbook[logbook.IDs.find((ID) => ID[0] === e.target.id)[0]]
    //     .iRef
    //     .current.value
    //     .replace(/^ | $/g, '').toUpperCase(),
    // }));

    for (let i = 0; i < logbook.IDs.length; i++) {
      ['i', 'd', 'a', 'o'].some((char) => logbook.IDs[i][0].charAt(0) === char)

        && setInputs((data) => ({

          ...data,
          [logbook.IDs[i][1]]: logbook[logbook.IDs[i][0]].iRef.current.value
            .replace(/^ | $/g, ''),

        }));
    }
  };

  useEffect(() => {
    if (!idState || logBook.length === 0) {
    } else {
      const logbookRecord = logBook.find((record) => record.id === parseInt(idState, 10));

      for (const ID of logbook.IDs) {
        if (
          ['date',
            'PIC_name',
            'task',
            'aircraft_model',
            'aircraft_registration',
            'departure_place',
            'departure_time',
            'arrival_place',
            'arrival_time',
            'air_time',
            'taxi_time',
            'block_time',
            'landings_day',
            'landings_night',
            'multi_pilot_flightime',
            'operational_condition_time_ifr',
            'operational_condition_time_night',
            'pilot_function_time_PIC',
            'pilot_function_time_coPilot',
            'pilot_function_time_dual',
            'pilot_function_time_instructor',
            'single_pilot_flightime_single_engine',
            'single_pilot_flightime_multi_engine',
          ].some((prop) => prop === ID[1])) {
          logbook[logbook.IDs.find((id) => id[0] === ID[0])[0]].iRef.current.value = logbookRecord[ID[1]];

          setInputs(() => ({
            ...logbookRecord,
          }));
        }
      }
    }
  }, [idState]);

  const time1 = `${inputs.date}T${inputs.engine_start}:00.000Z`;
  const time2 = `${inputs.date}T${inputs.engine_stop}:00.000Z`;
  const time3 = Date.parse(time2) - Date.parse(time1);

  const time4 = `${inputs.date}T${inputs.departure_time}:00.000Z`;
  const time5 = `${inputs.date}T${inputs.arrival_time}:00.000Z`;
  const time6 = Date.parse(time5) - Date.parse(time4);

  const time7 = Date.parse(time4) - Date.parse(time1);
  const time8 = Date.parse(time2) - Date.parse(time5);
  const time9 = time7 + time8;

  if (!Number.isNaN(time3)) {
    const blockTime = new Date(time3).toISOString().slice(11, 16);

    logbook.oBT.iRef.current.value = blockTime;
  }
  if (!Number.isNaN(time6)) {
    const airTime = new Date(time6).toISOString().slice(11, 16);

    logbook.oAT.iRef.current.value = airTime;
  }

  if (!Number.isNaN(time9)) {
    const taxiTime = new Date(time9).toISOString().slice(11, 16);

    logbook.oTT.iRef.current.value = taxiTime;
  }

  const saveToLogbook = () => {
    const save = process.env.LOGBOOK_URI+'/save';
    const update = process.env.LOGBOOK_URI+'/update';

    let address = '';

    if ('id' in inputs) {
      address = update;
    } else {
      address = save;
    }

    axios.post(address, JSON.stringify(inputs)).then(() => {

    });
  };

  return (

    <Box
      className="logbook"
      sx={{
        height: 800,
        overflow: 'auto',
        marginY: '50px',
        padding: 3,
        p: 5,
        pt: 5,
        '@media screen and (orientation:portrait)': {

          p: 2,
          pt: 1,
          marginY: 0,
          height:700
        }

      }}
    >

      <Paper sx={{
        display:"flex",
       justifyContent: 'space-around',
        width: "100%",  
        flexGrow: 1, 
        p: 5,
        pt: 5,
        '@media screen and (orientation:portrait)': {

          p: 2, pt: 2,
        },
      }}
      >

        <Box
          id="GRID"
          sx={{ // https://mui.com/system/grid/#api
            mt: 0,
            width: "100%",  
            display: 'grid',
            gridTemplateRows: 'repeat(21, 1fr)',
            gridTemplateColumns: 'repeat(4, 20%)',
            gridTemplateAreas:
              `"iD  iPIC iTk ."
"lAc . . . "
"iTp iRg  . ."
"lDep  . lArr ."
"dP iES  aP aT"
". dT  . iESp"
"lL . . ."
"ilD ilN . ."
"lbr2 . . . "
"lFt . . ."
"lSp . lMp . "
"isE imE  iMp . "
"lPft lPft .   ."
"aPIC aCp aD aI"
"lOct lOct . ."
"iNt iIFR . ."
"lbr1 .  . ."
" . lTot . . "
" . oTT oAT oBT "
" . . . . "
". .  bts bts"
`,
            gap: 0.7,
          }}
        >
          {
            logbook.IDs.map((cell) => {
              if (['i', 'd', 'a', 'o'].some((char) => cell[0].charAt(0) === char)) {
                return (
                  <TextField
                    key={cell[0]}
                    id={cell[0]}
                    label={cell[2]}
                    ref={logbook[cell[0]].ref}
                    inputRef={logbook[cell[0]].iRef}
                    placeholder={cell[3]}
                    fullWidth
                    sx={{ gridArea: cell[0] }}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    onInput={handleChange}
                    onBlur={handleChange}

                    required

                    defaultValue=" "

                  />

                );
              }

              if (cell[0].charAt(0) === 'l') {
                return (
                  <p
                    key={cell[0]}
                    id={cell[0]}
                    style={{ gridArea: cell[0], paddingTop: auxStyle.pT, fontSize: '.8em' }}
                  >
                    {cell[1]}
                  </p>
                );
              }

              if (cell[0].charAt(0) === 'b') {
                return (
                  <Box
                    key={cell[0]}
                    id={cell[0]}
                    sx={{ gridArea: cell[0] }}
                  >
                    <ButtonGroup
                      variant="contained"
                      size="small"

                      sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        gap: auxStyle.gap,
                        '& button': { width: '100%' },
                      }}
                    >
                      <Button id="appendBtn" onClick={saveToLogbook}><LibraryAddIcon /></Button>
                      {/* <Button id="saveBtn" onClick={handelAddSectionToRoute}><SaveAltIcon /></Button> */}
                    </ButtonGroup>
                  </Box>
                );
              }
            })
          }
        </Box>
      </Paper>
    </Box>

  );
}

export default LogBook;
