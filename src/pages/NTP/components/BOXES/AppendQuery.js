import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';


import { useSelector, useDispatch } from "react-redux";
import { unsetAlert,alertResponse, setAlert } from '../../../../Store/alertSlice';
import {  routeDelete, updateSection, removeSection } from '../../../../Store/routeSlice';



export default function AppendQuery(props) {

  const [t,i18n] = useTranslation("global");


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

      message = t("ToV.msg.empty");

      dispatch(routeDelete());

    }


    if (alertState.issue === "UPDATE_SECTION") {

      message = `${t("ToV.msg.update.a")} ${alertState.data.id} ${t("ToV.msg.update.b")}`;

      dispatch(updateSection({section: alertState.data}));
     

    }

    
    if (alertState.issue === "REMOVE_SECTION") {

      message = `${t("ToV.msg.erase.a")} ${alertState.data.id} ${t("ToV.msg.erase.b")}`;

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
        {t("dialog.update")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alertState.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          {t("dialog.negative")}
          </Button>
          <Button
            onClick={handleUpdate}
            autoFocus>
            {t("dialog.positive")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}