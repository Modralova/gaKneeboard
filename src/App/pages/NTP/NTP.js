import React, {
  useMemo, useState, useRef, useReducer, useEffect,
} from 'react';

import { Box, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


import Toasts from './components/BOXES/Toasts';
import AppendQuery from './components/BOXES/AppendQuery';

import { Instrument} from './components/canvas/Instrument';
import * as fNTP from './functions/NTP_functions';

import { routeUpdate } from '@store/routeSlice';
import { setAlert, alertQuery } from '@store/alertSlice';
import { routeSave } from '@store/outputRouteSlice';

export const ntp = {};

//

ntp.IDs = [
  'ifrom',
  'ito',
  'iδm',
  'iδb',
  'idm',
  'iu',
  'lU',
  'inkdg',
  'iv',
  'lV',
  'is',
  'nmkm',
  'odn',
  'okw',
  'onkdm',
  'okb',
  'okz',
  'okm',
  'ow',
  'lW',
  'oVmin',
  'l5',
  'ot',
  'lT',
  'canvas',
  'bts',
  'formulas',
];

const auxStyle = {

  gap: 0.3, // column gap
  cW: '60px', // column width
  pT: 12,
};

// zmiana wartości przycisku konwersji
function reducer(state, action) {
  switch (action.type) {
    case 'unit': {
      // console.log(action);
      return {
        ...state,
        si: state.si === 'nm' ? 'km' : 'nm',
      };
    }

    // case 'append':

    // {
    //   console.log(action);
    //   return {
    //     ...state,
    //     value: action.val,
    //   };
    // }
  }

  throw Error(`Unknown action: ${action.type}`);
}

function NTP() {
  const routeState = useSelector((state) => state.routeReducer).route;
  const routeNameState = useSelector((state) => state.routeNameReducer).routeName;
  const routeOutput = useSelector((state) => state.outputReducer).route;
  const alertState = useSelector((state) => state.alertReducer);
  const idState = useSelector((state) => state.idReducer);
  const [t, i18n] = useTranslation('global');

  const dispatch = useDispatch();

  for (const ID of ntp.IDs) {
    ntp[`${ID}`] = {};
    ntp[`${ID}`].ref = useRef();
    ntp[`${ID}`].iRef = useRef();
  }

  ntp.initState = { si: 'nm', value: false };

  const [state, disp] = useReducer(reducer, ntp.initState);

  const [inputs, setInputs] = useState(() => ({ kz: 0, nkdg: 0, dm: 0 }));

  // flagi
  ntp.currentState = state;
  ntp.appendBlock = false;
  ntp.eraseBlock = false;
  ntp.saveBlock = false;

  // guziczkek nm/km
  const setButtons = useMemo(() => (

    {
      toggleUnit: () => {
        disp({ type: 'unit', info: 'unitDispatch' });
      },

      // blockAppend: (val) => {
      //   disp({ type: 'append', info: 'blockAppendDispatch', val });
      // },

    }

  ), []);

  // blokada przycisku save
  if (routeState.length === 0) {
    ntp.saveBlock = true;
  }

  // blokada przycisków append
  ntp.IDs.forEach((id, i) => {
    if (
      ntp[id].iRef.current
            && ntp[id].iRef.current.id.charAt(0) === 'i'
            && ['', ' '].some((val) => ntp[id].iRef.current.value === val)) {
      ntp.appendBlock = true;
    }
  });

  // wypełnianie pól z zapisanego odcinka
  useEffect(() => {
    if (idState.id === undefined) { } else {
      const getSectionData = routeState.find((section) => section.id === idState.id);

      if (getSectionData) {
        for (const ID of ntp.IDs) {
          if (['ifrom', 'ito', 'iδm', 'iδb', 'idm', 'iu', 'inkdg', 'iv', 'is'].some((id) => id === ID)) ntp[ID].iRef.current.value = getSectionData[ID.slice(1)];
        }

        const time = fNTP.fTime(getSectionData.s, getSectionData.w);

        setInputs((data) => ({
          ...data,
          ...fNTP.count(),
          s: ntp.is.iRef.current.value.replace(' ', ''),
          t: time.iso,
          sec: time.sec,
        }
        ));

        ntp.ot.iRef.current.value = time.iso === '00:00:00' ? ' ' : time.iso;
      }
    }
  }, [idState]);

  // zapisywanie trasy do routeOutput
  useEffect(() => {
    dispatch(routeSave({ newRoute: routeState }));
  }, [routeState]);

  const handleChange = (event) => {
    if (event.target.id !== 'is') {
      setInputs((data) => ({ ...data, ...fNTP.count()
      }));
    } else {
      const time = fNTP.fTime(parseInt(ntp.is.iRef.current.value, 10), parseInt(ntp.ow.iRef.current.value, 10));

      ntp.ot.iRef.current.value = time.iso === '00:00:00' ? ' ' : time.iso;

      setInputs((data) => ({
        ...data,
        s: ntp.is.iRef.current.value.replace(' ', ''),
        t: time.iso,
        sec: time.sec,
      }
      ));
    }
  };

  /// ////////////////////////////////

  const handleAddSectionToRoute = () => {
    // console.info("INPUTS: ", { inputs: inputs,routeStateL:routeState.route.length })

    const section = {

      ...inputs,

      id: `${inputs.from}=>${inputs.to}`,

    };

    if (!(routeState.some((item) => item.to === section.to && item.from === section.from))) {
      console.log('SECTION', section);

      const newRoute = [{ ...section }, ...routeState];

      dispatch(routeUpdate({ newRoute })); // dane do widoku draggable

      dispatch(routeSave({ newRoute })); // dane do wydruku

      dispatch(setAlert({ issue: 'success', message: `${t('ToV.msg.added.a')} ${section.id} ${t('ToV.msg.added.b')}` }));
    } else {
      dispatch(alertQuery({

        showQuery: true,
        issue: 'UPDATE_SECTION',

        message: `${t('ToV.msg.update.query.a')} ${section.id} ${t('ToV.msg.update.query.b')}`,

        data: { ...section },

      }));
    }
  };

  const handleRemoveSectionFromRoute = (event) => {
    const from = ntp.ifrom.iRef.current.value.replace(' ', '').toUpperCase();
    const to = ntp.ito.iRef.current.value.replace(' ', '').toUpperCase();

    const navpoints = [''].some((val) => val !== from && val !== to); // to & from != " "

    const INDEX = routeState.indexOf(routeState.find((section) => section.id === `${from}=>${to}`));

    // console.info({ index: INDEX, navpoints: navpoints, to: to, from: from, len: routeState.route.length });

    if (!navpoints) {
      if (routeState.length === 0) {
        dispatch(setAlert({ issue: 'info', message: t('ToV.msg.empty') }));

        return;
      }

      dispatch(alertQuery(
        {
          showQuery: true,
          issue: 'ROUTE_DELETE',
          message: t('ToV.msg.erase.query.c'),

        },

      ));
    } else if (INDEX < 0) {
      dispatch(setAlert({ issue: 'info', message: `${t('ToV.msg.noSlice.a')} ${from}=>${to} ${t('ToV.msg.noSlice.b')}` }));
    } else {
      dispatch(alertQuery({

        issue: 'REMOVE_SECTION',
        message: `${t('ToV.msg.erase.query.a')} ${from}=>${to} ${t('ToV.msg.erase.query.b')}`,
        data: { id: routeState[INDEX].id },

      }));
    }
  };

  const handleConvert = (e) => {
    const S__ = parseFloat(ntp.is.iRef.current.value);
    const S_min = parseFloat(ntp.oVmin.iRef.current.value);

    switch (state.si) {
      case 'nm':

        ntp.is.iRef.current.value = Number.isNaN(fNTP.milesToKm(S__)) ? ' ' : fNTP.milesToKm(S__);

        if (typeof (S_min) === 'number') {
          ntp.oVmin.iRef.current.value = fNTP.milesToKm(S_min).toFixed(1);
        }

        break;

      case 'km':

        ntp.is.iRef.current.value = Number.isNaN(fNTP.kmetersToNM(S__)) ? ' ' : fNTP.kmetersToNM(S__);

        if (typeof (S_min) === 'number') {
          ntp.oVmin.iRef.current.value = fNTP.kmetersToNM(S_min).toFixed(1);
        }
    }
  };

  // pobieranie xls'a
  const handleSaveRoute = (event) => {
    
    const url = process.env.TOV_URI+'/save';

    const config = {

      headers: { 'Content-Type': 'application/json' },
    };

    axios.post(url, JSON.stringify({data: routeOutput,route_name:routeNameState})).finally(() => {

      window.location.href = url + `?route_name=${ encodeURIComponent(routeNameState)}`;
      
    });
  };

  return (

    <Box
      className="NTP"
      sx={{
        marginY: '160px',
        padding: 3,
        '@media screen and (orientation:portrait)': {

          p: 2,
          pt: 1,
          marginY: 0
        },
      }}
    >

      <Toasts open={alertState.show} />
      <AppendQuery open={alertState.showQuery} />

      <Paper sx={{
        p: 5,
        pt: 5,
        '@media screen and (orientation:portrait)': {

          pl: 2, pr: 4, pt: 2, pb: 0,
        },
      }}
      >

        {/* <Typography variant="body3" component="p" sx={{ pt:3,pr:3,pb:0,pl:4, mb:0}}>NTP</Typography> */}

        <Box sx={{ // https://mui.com/system/grid/#api
          mt: 0,
          // p: 5,
          // pt: 5,
          display: 'grid',
          gridTemplateRows: 'repeat(10, 1fr)',
          gridTemplateColumns: 'repeat(9, 10%)',
          gridTemplateAreas:

                        `"ifrom  ifrom     ito      ito    ot    ot   .      .    .    "
                    "iδm    .        .      .    .     .   .    .    .    "
                    "iδb    .        .      .    .       canvas canvas canvas .   "
                    "idm    odn      okw   .    .       canvas canvas canvas  .  "
                    "iu     lU       .      .    .         canvas canvas canvas .   "
                    "inkdg  onkdm    okb   .    .    canvas canvas canvas       .    "
                    ".      okz      okm    .    .     .      .      .       .    "
                    "iv     lV       ow     lW   .     .      .      .       .    "
                    "is     nmkm     oVmin  l5   lt   . .      .       .    "
                    "formulas     .        .      .    .     .    bts    bts     bts  "`,
          gap: 1.2,
        }}
        >

          {ntp.IDs.map((cell, i) => {
            if (cell === 'canvas') {
              return (

                <Box
                  key={i}
                  id={cell}
                  ref={(canvas) => (ntp[cell].ref.current = canvas)}
                  sx={{
                    gridArea: cell, display: 'flex', justifyContent: 'right', my: 'auto', /* , borderStyle: "inset",boxSizing:"content-box" */
                  }}
                >

                  <Instrument

                    {...{
                      context: ntp.canvas.ref,
                      ...inputs,
                    }}
                  />

                </Box>
              );
            }

            if (['i', 'o'].some((char) => cell.charAt(0) === char)) {
              return (

                <TextField

                  key={i}
                  id={cell}
                  label={cell.slice(1).toUpperCase()}
                  ref={ntp[cell].ref}
                  inputRef={ntp[cell].iRef}

                  fullWidth
                  defaultValue={' '}
                  sx={{ gridArea: cell }}
                  variant="outlined"
                  size="small"

                  {
                                    ...cell.charAt(0) === 'i' && {

                                      onChange: handleChange,
                                      onInputCapture: handleChange,
                                      onBlur: handleChange,
                                      // placeholder:"ICAO"
                                    }
                                    }
                  {
                                    ...cell.charAt(0) === 'o'
                                    && {
                                      InputProps: { readOnly: true },
                                      // margin: "dense",
                                      required: true,
                                    }
                                    }
                />
              );
            }
            if (cell.charAt(0) === 'l') {
              return (
                <label
                  key={i}
                  id={cell}
                  htmlFor={ntp.IDs[i - 1]}
                  style={{ gridArea: cell, paddingTop: auxStyle.pT, fontSize: '.6em' }}
                >
                  {['lU', 'lV', 'lW'].some((label) => cell.includes(label)) && 'kt'}
                  {cell === 'l5' && state.si === 'nm' && 'nm/5min'}
                  {cell === 'l5' && state.si === 'km' && 'km/5min'}
                </label>
              );
            }

            if (cell.charAt(0) === 'n') {
              return (
                <Box
                  key={i}
                  id={cell}
                  sx={{ gridArea: cell }}
                >
                  <Button
                    variant="contained"
                    size="extraSmall"
                    onClick={() => {
                      handleConvert();
                      setButtons.toggleUnit();
                    }}
                  >
                    {state.si}
                  </Button>
                </Box>
              );
            }

            if (cell.charAt(0) === 'f') {
              return (
                <Box
                  key={i}
                  id={cell}
                  sx={{ gridArea: cell }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                  >
                    formulas
                  </Button>
                </Box>
              );
            }

            if (cell.charAt(0) === 'b') {
              return (
                <Box
                  key={i}
                  id={cell}
                  sx={{ gridArea: cell }}
                >
                  <ButtonGroup
                    variant="contained"
                    size="small"
                    aria-label="outlined primary button group"
                    sx={{
                      display: 'flex',
                      justifyContent: 'right',
                      gap: auxStyle.gap,
                      '& button': { width: '100%' },
                    }}
                  >
                    <Button id="appendBtn" onClick={handleAddSectionToRoute} disabled={ntp.appendBlock}><LibraryAddIcon /></Button>
                    <Button id="eraseBtn" onClick={handleRemoveSectionFromRoute}><BackspaceIcon /></Button>
                    <Button id="saveBtn" onClick={handleSaveRoute} disabled={ntp.saveBlock}><SaveAltIcon /></Button>
                  </ButtonGroup>
                </Box>
              );
            }
          })}

        </Box>
      </Paper>

    </Box>

  );
}

export default NTP;
