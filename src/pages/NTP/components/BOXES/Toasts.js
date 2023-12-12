import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSelector } from "react-redux";
import store from "../../../../Store/ReduxStore";
//import { eraseResponse, unsetAlert } from "../../../../Store/ReduxReducers"
import { useAutocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
import { unsetAlert } from '../../../../Store/alertSlice';






const Alert = React.forwardRef(function Alert(props, ref) {

  return <MuiAlert severity={props.severity} elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Toasts(props) {

  const dispatch = useDispatch();


  const AlertRef = React.createRef();

  const alertState = useSelector(state => state.alertReducer);



  const handleClose = (event, reason) => {
    // console.info("onClose: ", { reason: reason, event: event })
    if (reason === 'clickaway') {
      return;
    }

    dispatch(unsetAlert())
  };

return (
 
  ["error","info","success","warning"].some(issue => alertState.issue === issue) &&

  
    <Stack spacing={2} sx={{ width: '100%' }}  >

      <Snackbar open={alertState.show} autoHideDuration={2000} onClose={handleClose}>

        <Alert severity={alertState.issue} ref={AlertRef} sx={{ width: '100%'}} onClose={handleClose} >{alertState.message}</Alert>

      </Snackbar>

    </Stack>
);
  
}


{/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
