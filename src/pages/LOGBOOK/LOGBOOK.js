import React, {useState, useRef} from "react";
import { useSelector} from "react-redux";

import { Box, Paper} from "@mui/material";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';



import axios from "axios";


let auxStyle = {

    gap: .3,   //column gap
    cW: "60px", //column width
    pT: 12
};

export let logbook = new Object();

logbook.IDs = [
    
    ["lbr1", " "],
    ["iD","date", "DATE","yyyy-mm-dd"],
    ["lDep", "departure:"],
    ["lArr", "arrival:",],
    ["dT","departure_time", "TIME","hh:mm"],
    ["dP","departure_place", "PLACE","ICAO"],
    ["aP","arrival_place", "PLACE","ICAO"],
    ["aT","arrival_time", "TIME","hh:mm"],
    ["lAc", "aircraft:"],
    ["iTp","aircraft_model", "TYPE","C-152"],
    ["iRg","aircraft_registration", "REGISTRATION","SP-XYZ"],
    ["lSp", "single pilot:"],
    ["lMp", "multi pilot:"],
    ["iMp","multi_pilot_flightime", "MULTI PILOT TIME","hh:mm"],
    ["lFt", "FLIGHT TIME:"],
    ["isE","single_pilot_flightime_single_engine", "SINGLE EGN. TIME","hh:mm"],
    ["imE","single_pilot_flightime_multi_engine", "MULTI EGN. TIME","hh:mm"],
    ["oTT","total_time", "TOTAL TIME","hh:mm"],
    ["iPIC","PIC_name", "PIC name","JOHN SMITH"],
    ["lbr2", " "],
    ["lL", "landings:"],
    ["ilD","landings_day", "DAY","integer"],
    ["ilN","landings_nigth", "NIGHT","integer"],
    ["lOct", "operational condition time:"],
    ["iNt","operational_condition_time_nigth", "NIGHT","hh:mm"],
    ["iIFR","operational_condition_time_ifr", "IFR","hh:mm"],
    ["lPft", "pilot function time:"],
    ["aPIC","pilot_function_time_PIC", "PIC","hh:mm"],
    ["aCp","pilot_function_time_coPilot", "CO-PILOT","hh:mm"],
    ["aD","pilot_function_time_dual", "DUAL","hh:mm"],
    ["aI","pilot_function_time_instructor", "INSTRUCTOR","hh:mm"],
    ["iTk","task", "TASK","A1"],
    ["bts","bts"]
];


const LogBook = () => {

    const themeState = useSelector(store => store.themeReducer).theme;

    const [inputs, setInputs] = useState(() => { return {} });



    for (const ID of logbook.IDs) {

        logbook[`${ID[0]}`] = new Object();
        logbook[`${ID[0]}`].ref = useRef();
        logbook[`${ID[0]}`].iRef = useRef();

    }

    const handleChange = () => {

        for (const ID of logbook.IDs) {

            

            ["i", "d", "a","o"].some(char => ID[0].charAt(0) === char) && 

                 setInputs(data =>({

                    ...data,
                    [ID[1]]: logbook[ID[0]].iRef.current.value.replace(/^ | $/g,"").toUpperCase()
                   
                 }));

    
        }


    }

    const saveToLogbook = () => {


        const config = {

            headers: { "Content-Type": "application/json" }
        };

        axios.post("http://localhost:8080/api/logbook/save", JSON.stringify(inputs)).then(res => {

            console.log(res.data);
        });

    }

  const   handelAddSectionToRoute = () =>{


    const config = {

        headers: { "Content-Type": "application/json" }
    };

    axios.get("http://localhost:8080/api/logbook/read", config).then(res => {

        console.log(res.data);
    });


  }
    
    return (

        <Box className="logbook" sx={{ height: 500, overflow: "auto", marginY: '40px', padding: 3 }}>

            <Paper sx={{ p: 5, pt: 5 }}>

                <Box
                    id="GRID"
                    sx={{      //https://mui.com/system/grid/#api
                        mt: 0,
                        // p: 5,
                        // pt: 5,
                        display: 'grid',
                        gridTemplateRows: 'repeat(18, 1fr)',
                        gridTemplateColumns: 'repeat(4, 20%)',
                        gridTemplateAreas: 
`"iD  iPIC iTk ."
"lAc . . . "
"iTp iRg  . ."
"lDep  . lArr ."
"dP dT  aP aT"
"lL . . ."
"ilD ilN . ."
"lbr2 . . . "
"lFt . . ."
"lSp . lMp ."
"isE imE  iMp . "
"lPft lPft .   ."
"aPIC aCp aD aI"
"lOct lOct . ."
"iNt iIFR . ."
"lbr1 .  . ."
" . . . oTT "
" bts bts . ."
`,
                        gap: .7,
                    }}>
                    {
                        logbook.IDs.map((cell, i) => {


                            if (["i", "d", "a", "o"].some(char => cell[0].charAt(0) === char)) {
                                return (

                                    <TextField

                                        key={i}
                                        id={cell[0]}
                                        label={cell[2]}
                                        ref={logbook[cell[0]].ref}
                                        inputRef={logbook[cell[0]].iRef}
                                        placeholder={cell[3]}
                                        fullWidth={true}
                                        //defaultValue={" "}
                                        sx={{ gridArea: cell[0]}}
                                        variant="outlined"
                                        size="small"

                                    onChange={handleChange}
                                    onInput={handleChange}
                                    onBlur={handleChange}

                                    />)
                            }

                            if (cell[0].charAt(0) === "l") {
                                return (
                                    <label
                                        key={i}
                                        id={cell[0]}
                                        //htmlFor={logbook.IDs[i - 1]}
                                        style={{ gridArea: cell[0], paddingTop: auxStyle.pT, fontSize: ".6em" }}>
                                        {cell[1]}

                                    </label>
                                )
                            }

                            if (cell[0].charAt(0) === "b") {
                                return (
                                    <Box
                                        key={i}
                                        id={cell[0]}
                                        sx={{ gridArea: cell[0] }}>
                                        <ButtonGroup variant="contained" size="small" aria-label="outlined primary button group"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "right",
                                                gap: auxStyle.gap,
                                                "& button": { width: "100%" },
                                            }}
                                        >
                                            <Button id="appendBtn" onClick={saveToLogbook} /* disabled={ntp.appendBlock}*/><LibraryAddIcon /></Button>
                                            <Button id="saveBtn" onClick={handelAddSectionToRoute} /*disabled={ntp.saveBlock}*/><SaveAltIcon /></Button>
                                        </ButtonGroup>
                                    </Box>
                                )
                            }


                        }

                        )}

                </Box>
            </Paper>
        </Box>




    );
}

export default LogBook;