import React, {
  useState, useMemo, useReducer,
} from 'react';
import {
  Box, Button, Paper, Typography, OutlinedInput,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import {
  useDispatch,
} from 'react-redux';
import axios from 'axios';
import {
  setProfileView,
} from '@store/viewSlice';
import {
  setTheme,
} from '@store/themeSlice';

const settings = {};

settings.IDs = [];

settings.initState = { mode: true };

const reducer = (state, action) => {
  switch (action.type) {
    case 'mode': {
      return {
        ...state,
        mode: !state.mode,
      };
    }
    default:
      return state;
  }
};

function Settings() {
  const [state, dispatch] = useReducer(reducer, settings.initState);
  const [file, setFile] = useState(null);
  const stateDispatch = useDispatch();
  const profileView = () => {
    stateDispatch(setProfileView());
  };

  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');


  const switchSet = useMemo(() => (

    {
      toggleMode: () => {
        stateDispatch(setTheme());
        dispatch({ type: 'mode', info: 'modeDispatch' });
      },

    }));

  const handelUpload = () => {
    const dataForm = new FormData();
    dataForm.append('file', file);

    const config = {
      headers: {
        'Custom-Header': 'value',
      },
    };

    axios.post('http://localhost:8080/api/logbook/upload', dataForm, config).then(() => {
    }).catch(() => {
    });
  };

  return (
    <Box className="settings" sx={{ marginX: '40px', marginY: '80px', padding: 3 }}>
      <Paper sx={{ p: 5, pt: 5 }}>
        <Typography>settings: </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>color theme: </Typography>
          <FormGroup>
            <FormControlLabel // sx={{display:"flex", justifyContent:"center"}}
              control={(
                <Switch
                  checked={state.mode}
                  onChange={switchSet.toggleMode}
                  aria-label="mode switch"
                />
              )}
              label={state.mode ? 'light' : 'dark'}
            />
          </FormGroup>
        </Box>
        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography>logbook:</Typography>
          <br />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>xls: </Typography>
            <OutlinedInput onChange={(e) => { setFile(e.target.files[0]); }} type="file" />
            <Button onClick={handelUpload}>upload</Button>
          </Box>
        </Box>
        {/* {progress.started && <progress max="100" value={progress.pc}></progress>}
            {msg && <span>{msg}</span>} */}
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={profileView}>close</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Settings;
