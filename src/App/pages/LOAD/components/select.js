import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

// import { setSigns } from '../../../../Store/planeSlice';
import { setSigns } from '@store/planeSlice';

export default function BasicSelect(props) {
  const [plane, setPlane] = React.useState(' ');

  const dispatch = useDispatch();

  const { planes } = props;

  const handleChange = (event) => {
    setPlane(event.target.value);
    dispatch(setSigns({ plane: event.target.value }));
  };

  return (

    <Box sx={{
      maxWidth: 120, height: 20, p: 0, m: 0,
    }}
    >

      <FormControl
        fullWidth
      >
        <InputLabel
          sx={{ fontSize: 12, m: 0, p: 0 }}
        >
          Samolot
        </InputLabel>

        <Select
                   // labelId="demo-simple-select-label"
                   // id="demo-simple-select"
          defaultValue={' '}
          value={plane}
          sx={{
            fontSize: 8, p: 0, m: 0, height: 30, width: 'full',
          }}
          label="samolot"
          onChange={handleChange}
        >
          <MenuItem sx={{ fontSize: 20 }} key={0} value={' '}>{' '}</MenuItem>

          {

                    planes.map((pl) => (

                      <MenuItem sx={{ fontSize: 20 }} key={v4} value={pl.sign}>{pl.sign}</MenuItem>

                    ))
                    }

        </Select>

      </FormControl>
    </Box>
  );
}
