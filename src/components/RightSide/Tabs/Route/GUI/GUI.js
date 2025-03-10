import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonGroup, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import TextField from '@mui/material/TextField';

import BasicSelect from '../components/select';
import { routeUpdate } from '@store/routeSlice';
import axios from 'axios';


const config = {

  headers: {

    'Content-Type': 'application/json',
  },
};


const fetchRoutes = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.get(process.env.TOV_URI, config).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).catch();
};


export default function GUI() {




  const dispatch = useDispatch();
  const routeNameState = useSelector((state) => state.routeNameReducer).routeName;
  const routeState = useSelector((state) => state.routeReducer).route;
  const [routeName, setRouteName] = useState(() => ({ rName: "" }));
  const [routeList, setRouteList] = useState([]);
  const loginState = useSelector((state) => state.loginReducer).logged;

  useEffect(() => {
    if (loginState) {
      fetchRoutes().then((routesData) => {
        setRouteList(routesData);
      });
    }
  }, [loginState]);

  const auxStyle = {

    gap: 0.3, // column gap
    cW: '60px', // column width
    pT: 12,
  };

  const handleInputChange = (e) => {

    setRouteName((data) => ({ ...data, rName: e.target.value }));


  }

  const handleLoad = () => {

    if (routeNameState) {
      let savedRoute = routeList.find((route) => route.route_name === routeNameState);

      dispatch(routeUpdate({ newRoute: JSON.parse(savedRoute.route_data).toReversed() }));
    }

  };
  const handleSave = () => {



    if ((routeName.rName.length > 0)) {

    

      let routeToSave = {
        route_name: routeName.rName,
        route_data: JSON.stringify(routeState)
      }


      let url = "";


      if (routeNameState !== routeName.rName) {

        url = process.env.TOV_URI+'/dbsave';


      } else {

        url = process.env.TOV_URI+'/dbupdate';


      }


      axios.post(url, JSON.stringify(routeToSave)).then((res) => {
      }).finally(() => {
        fetchRoutes().then((routesData) => {
          setRouteList(routesData);
        });
      });

    }

  };
  const handleDelete = () => {



    const url = process.env.TOV_URI+'/dbdelete';


    axios.post(url, JSON.stringify({ route_name: routeName.rName })).then((res) => {
    }).finally(() => {
      fetchRoutes().then((routesData) => {
        setRouteList(routesData);
      });
    });





  };

  const textFieldRef = useRef();

  useEffect(() => {

    setRouteName((data) => ({ ...data, rName: routeNameState }));

    textFieldRef.current.value = routeNameState;


  }, [routeNameState]);




  return (
    <Box sx={{ // https://mui.com/system/grid/#api
      mt: 0,

      // p: 5,
      // pt: 5,
      display: 'grid',
      justifyItems: 'center',
      gridTemplateRows: 'repeat(1, 1fr)',
      gridTemplateColumns: 'repeat(1, 1fr )',
      gridTemplateAreas:
        `"sel "
         "tF"
         "bG "`,
      gap: 1,
    }}
    >
      <BasicSelect

        sx={{
          gridArea: 'sel',

        }}

      >
        {{ routeList }}
      </BasicSelect>
      <TextField
        inputRef={textFieldRef}
        defaultValue={' '}
        sx={{ gridArea: 'tF', width: '250px' }}
        variant="outlined"
        size="small"
        onChange={handleInputChange}


        required

      />
      <ButtonGroup
        variant="contained"
        size="small"
        aria-label="outlined primary button group"
        sx={{
          gridArea: 'bG',
          display: 'flex',
          justifyContent: 'center',
          gap: auxStyle.gap,
          '& button': { width: '100%' },
        }}
      >
        <Button id="appendBtn" onClick={handleLoad} disabled={false}><GetAppIcon /></Button>
        <Button id="eraseBtn" onClick={handleSave}><SaveIcon /></Button>
        <Button id="saveBtn" onClick={handleDelete} disabled={false}><DeleteIcon /></Button>
      </ButtonGroup>
    </Box>
  );
}
