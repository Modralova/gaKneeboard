import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';

// import { eraseResponse, unsetAlert } from "../../../../Store/ReduxReducers"

// import { unsetAlert } from '../../../../../Store/alertSlice';
import { unsetAlert } from '@store/alertSlice';

const Alert = React.forwardRef((props, ref) => <MuiAlert severity={props.severity} elevation={6} ref={ref} variant="filled" {...props} />);

export default function Toasts() {
  const dispatch = useDispatch();

  const AlertRef = React.createRef();

  const alertState = useSelector((state) => state.alertReducer);

  const handleClose = (event, reason) => {
    // console.info("onClose: ", { reason: reason, event: event })
    if (reason === 'clickaway') {
      return;
    }

    dispatch(unsetAlert());
  };

  return (

    ['error', 'info', 'success', 'warning'].some((issue) => alertState.issue === issue)

    && (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={alertState.show} autoHideDuration={2000} onClose={handleClose}>

        <Alert severity={alertState.issue} ref={AlertRef} sx={{ width: '100%' }} onClose={handleClose}>{alertState.message}</Alert>

      </Snackbar>

    </Stack>
    )
  );
}
