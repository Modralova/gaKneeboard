import React, { useEffect, useState, useRef, useMemo, useReducer } from "react";
import { Box, Button, Paper, Typography, OutlinedInput } from "@mui/material";
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProfileView } from "../../Store/viewSlice";
import { setTheme } from "../../Store/themeSlice";
import { useHistory } from "react-router-dom";


let settings = new Object;

settings.IDs = [



];

settings.initState = {

    mode: true

}

const reducer = (state, action) => {


    switch (action.type) {
        case 'mode': {

            return {
                ...state,
                mode: state.mode === true ? false : true,

            };
        }



        default:

            return state;

    }

}






const Settings = () => {


    let settingsState = useSelector(state => state.profileReducer);
    let [profile, setProfile] = useState({});
    const [state, dispatch] = useReducer(reducer, settings.initState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState(null);
    const stateDispatch = useDispatch();



    const profileView = () => {

      
      
       stateDispatch(setProfileView());

    }



    const switchSet = useMemo(() => (

        {
            toggleMode: () => {

                stateDispatch(setTheme());
                dispatch({ type: 'mode', info: "modeDispatch" });
            },



        }));



    const handelUpload = () => {


        if (!file) {

            setMsg("no file selected")

            return;
        }
        const dataForm = new FormData();
        dataForm.append('file', file);


        const config = {
            headers: {
                // 'Content-Type': 'application/json'
                'Custom-Header': 'value'
            }
        }


        setMsg("uploading...")
        setProgress(prev => { return { ...prev, started: true } })
        axios.post("http://localhost:8080/api/logbook/upload", dataForm, config).then(res => {

            onUploadProgress: (progressEvent) => { setProgress(prev => { return { ...prev, pc: progressEvent.progress * 100 } }) }

            setMsg("uploading sucseeded");
            console.log(res.data);

        }).catch(err => {
            setMsg("uploading sucseeded");
            console.err(err)
        }
        );


    }





    return (<Box className="settings" sx={{ marginX: '40px', marginY: '80px', padding: 3 }}>
        <Paper sx={{ p: 5, pt: 5 }}>
            <Typography>settings: </Typography>
            <Divider sx={{ my: 3 }} />
            
                <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                   <Typography>color theme: </Typography>
                    <FormGroup  >
                        <FormControlLabel
                            // sx={{display:"flex", justifyContent:"center"}}


                            control={
                                <Switch

                                    checked={state.mode}
                                    onChange={switchSet.toggleMode}
                                    aria-label="mode switch"
                                />
                            }
                            label={state.mode ? 'ligth' : 'dark'}
                        />
                    </FormGroup>
                </Box>
                <Divider sx={{ my: 3 }} />
          
<Box>
    <Typography>logbook:</Typography>
    <br/>
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
            <Typography>xls: </Typography>
                <OutlinedInput onChange={(e) => { setFile(e.target.files[0]) }} type="file" />
                <Button onClick={handelUpload}>upload</Button>
            </Box>
            </Box>
            {/* {progress.started && <progress max="100" value={progress.pc}></progress>}
            {msg && <span>{msg}</span>} */}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={profileView}>close</Button>
            </Box>
        </Paper>
    </Box>);
}

export default Settings;