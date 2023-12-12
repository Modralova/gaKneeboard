import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import { useSelector, useDispatch } from "react-redux";
import { unsetAlert,alertResponse, setAlert } from '../../../../Store/alertSlice';
import {  routeDelete, updateSection, removeSection } from '../../../../Store/routeSlice';



export default function AppendQuery(props) {


  const alertState = useSelector(state => state.alertReducer)

  const dispatch = useDispatch();

//  console.log("ApendQuery.alertState: ", alertState)

  const [open, setOpen] = React.useState(alertState.showQuery);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

   
  React.useEffect(() => { setOpen(props.open); }, [props])

  //console.log("queryProps:",props)


  const handleClose = () => {

    dispatch(unsetAlert())

  };

  const handleUpdate = () => {

    let message = ""

   // console.log("AS:", alertState)

    if (alertState.issue === "ROUTE_DELETE") {

      message = "schowek opróżniony";

      dispatch(routeDelete());

    }


    if (alertState.issue === "UPDATE_SECTION") {

      message = `odcinek ${alertState.data.id} zaktualizowany`;

      dispatch(updateSection({section: alertState.data}));
     

    }

    
    if (alertState.issue === "REMOVE_SECTION") {

      message = `odcinek ${alertState.data.id} usunięty`;

      dispatch(removeSection({id: alertState.data.id}));

    }

      dispatch(alertResponse({ message: message }));

  }


 // console.log("AQ: ",open)

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Aktualizacja"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alertState.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            nie
          </Button>
          <Button
            onClick={handleUpdate}
            autoFocus>
            tak
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}