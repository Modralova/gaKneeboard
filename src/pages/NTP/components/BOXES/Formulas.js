import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef( function Alert(props, ref) 
  
  
{ return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;});


export default function Toasts(props) {


  console.log("toast,props: ",props)

  console.log("toast,issue: ",props.open.issue)

  return (


     <Stack spacing={2} sx={{ width: '100%' }}  >
     
      <Snackbar open={props.open.showFormulas}  onClose={props.onClose} >
      <Alert  severity={"info"} sx={{ width: '100%' }} {...props} >
        wartości pól:
        ΔM(W(-)/E(+)) : deklinacja : Kąt pomiędzy północą geograficzną a północą magnetyczną 
        ΔB : dewiacja 
        DM : meteorologiczny kierunek wiatru
        DN: nawigacyjny pkierunek wiatru : DN = DM - 180°
        U: prędkość wiatru w węzłach
        V: prędkość lotu
        W: prędkość względem ziemi
        KW: kąt wiatru : KW = DN - KB
        NKDG: nakazany geograficzny kąt drogi
        NKDM: nakazany magnetyczny kąt drogi : NKDM = NKDG - ΔM(-/+)
        KB : kurs busoli : KB = NKDG - ΔM(-/+) - ΔB(-/+)
        KZ : kąt znoszenia : sinKZ = (U*sinKW)/V , wartość w stopniach : KZ = sinKZ = 180/π
        KM : kurs z poprawką na wiatr : KM = KB +-KZ
        Vmin: fragment odcinka przebyty w ciągu 5min,
        T: szacowany czas przebytej drogi
    

        </Alert>
      </Snackbar>
      </Stack>
  );
} 


{/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    