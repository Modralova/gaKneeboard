import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { setRouteNameR } from '@store/routeNameSlice';

export default function BasicSelect(props) {
  const [routeName, setRouteName] = React.useState('');
  const dispatch = useDispatch();

  const { children } = props;

  // console.log('PROPS:', children.smruty);

  const handleChangeSelect = (event) => {
    setRouteName(event.target.value);
    dispatch(setRouteNameR({ routeName: event.target.value }));
  };

  return (

    <Box sx={{
      height: 20, p: 0, m: 2,
    }}
    >

      <FormControl
        fullWidth
      >
        <InputLabel
          sx={{ fontSize: 12, m: 0, p: 0 }}
        >
        </InputLabel>

        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          defaultValue={''}

          sx={{
            fontSize: 13, p: 0, m: 0, height: 40, width: 250,
          }}
          onChange={handleChangeSelect}
        >
          {/* <MenuItem sx={{ fontSize: 10 }} key={0} value={' '}>{' '}</MenuItem> */}

          {

        children.routeList &&    children.routeList.map((route, i) => (

              <MenuItem sx={{ fontSize: 20 }} key={route.route_name} value={route.route_name}>{`- ${route.route_name} - ${route.date} -`}</MenuItem>

            ))
          }

        </Select>

      </FormControl>
    </Box>
  );
}
