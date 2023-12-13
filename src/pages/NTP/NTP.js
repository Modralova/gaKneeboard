import React, { useMemo, useState, useRef, useReducer, useEffect } from "react";

import { Box, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AppendQuery from "./components/BOXES/AppendQuery";
import Toasts from "./components/BOXES/Toasts"

import { useSelector, useDispatch } from "react-redux";
import { routeUpdate } from "../../Store/routeSlice";
import { setAlert, alertQuery } from "../../Store/alertSlice";
import { routeSave } from "../../Store/outputRouteSlice";

import { Instrument, img } from "./components/canvas/Instrument";
import * as fNTP from "./functions/NTP_functions";
import { useTranslation } from 'react-i18next';



import axios from "axios";


export let ntp = new Object();

//


ntp.IDs = [
    "ifrom",
    "ito",
    "iδm",
    "iδb",
    "idm",
    "iu",
    "lU",
    "inkdg",
    "iv",
    "lV",
    "is",
    "nmkm",
    "odn",
    "okw",
    "onkdm",
    "okb",
    "okz",
    "okm",
    "ow",
    "lW",
    "oVmin",
    "l5",
    "ot",
    "lT",
    "canvas",
    "bts",
    "formulas"
];



let auxStyle = {

    gap: .3,   //column gap
    cW: "60px", //column width
    pT: 12
};

// zmiana wartości przycisku konwersji
function reducer(state, action) {
    switch (action.type) {
        case 'unit': {
            console.log(action)
            return {
                ...state,
                si: state.si === "nm" ? "km" : "nm",
            };
        }

        case "append":

            {
                console.log(action)
                return {
                    ...state,
                    value: action.val
                };
            }

    }

    throw Error('Unknown action: ' + action.type);
}

const NTP = () => {

    const routeState = useSelector(state => state.routeReducer).route;
    const routeOutput = useSelector(state => state.outputReducer).route;
    const alertState = useSelector(state => state.alertReducer);
    const idState = useSelector(state => state.idReducer);
    const [t,i18n] = useTranslation("global");


    const themeState = useSelector(store => store.themeReducer).theme;



    const dispatch = useDispatch();





    for (const ID of ntp.IDs) {

        ntp[`${ID}`] = new Object();
        ntp[`${ID}`].ref = useRef();
        ntp[`${ID}`].iRef = useRef();

    }

    ntp.initState = { si: "nm", value: false }



    const [state, disp] = useReducer(reducer, ntp.initState);

    const [inputs, setInputs] = useState(() => { return { kz: 0, nkdg: 0, dm: 0 } });

    ntp.currentState = state;
    ntp.appendBlock = false;
    ntp.eraseBlock = false;
    ntp.saveBlock = false;


    const setButtons = useMemo(() => (

        {
            toggleUnit: () => {

                disp({ type: 'unit', info: "unitDispatch" });
            },

            blockAppend: (val) => {

                disp({ type: 'append', info: "blockAppendDispatch", val: val });
            },


        }


    ), []);


    if (routeState.length === 0) {

        ntp.saveBlock = true;

    }

    ntp.IDs.forEach((id, i) => {



        if (
            ntp[id].iRef.current &&
            ntp[id].iRef.current.id.charAt(0) === "i" &&
            ["", " "].some(val => ntp[id].iRef.current.value === val)) {

            ntp.appendBlock = true;

        }

    });


    // wypełnianie pól z zapisanego odcinka
    useEffect(() => {

        if (idState.id === undefined) { return; } else {


            const getSectionData = routeState.find(section => section.id === idState.id);

            if (getSectionData) {

                for (let ID of ntp.IDs) {

                    if (["ifrom", "ito", "iδm", "iδb", "idm", "iu", "inkdg", "iv", "is"].some(id => id === ID))

                        ntp[ID].iRef.current.value = getSectionData[ID.slice(1)];

                }


                let time = fNTP.fTime(getSectionData.s, getSectionData.w)

                setInputs(data => ({
                    ...data,
                    ...fNTP.count(), img: img,
                    s: ntp.is.iRef.current.value.replace(" ", ""),
                    t: time.iso,
                    sec: time.sec
                }
                ));


                ntp.ot.iRef.current.value = time.iso === "00:00:00" ? " " : time.iso;

            }

        }

    }, [idState])

    useEffect(() => {

        dispatch(routeSave({ newRoute: routeState }));

    }, [routeState]);


    const handleChange = event => {



        if (event.target.id != "is") {

            setInputs(data => ({ ...data, ...fNTP.count(), img: img }));

        } else {

            let time = fNTP.fTime(parseInt(ntp.is.iRef.current.value), parseInt(ntp.ow.iRef.current.value));

            ntp.ot.iRef.current.value = time.iso === "00:00:00" ? " " : time.iso;

            setInputs(data => ({
                ...data,
                s: ntp.is.iRef.current.value.replace(" ", ""),
                t: time.iso,
                sec: time.sec
            }
            ));

        }

    }

   
    ///////////////////////////////////

    const handelAddSectionToRoute = () => {

        // console.info("INPUTS: ", { inputs: inputs,routeStateL:routeState.route.length })

        let section = {

            ...inputs,

            img: {

                data: inputs.img,

                fileName: `${inputs.from}=>${inputs.to}`

            },

            id: `${inputs.from}=>${inputs.to}`

        };

        if (!(routeState.some(item => item.to === section.to && item.from === section.from))) {



            console.log('SECTION', section);



            let newRoute = [{ ...section }, ...routeState]



            dispatch(routeUpdate({ newRoute: newRoute }));  // dane do wizualizacji

            dispatch(routeSave({ newRoute: newRoute }));    // dane do wydruku

            dispatch(setAlert({ issue: "success", message: `${t("ToV.msg.added.a")} ${section.id} ${t("ToV.msg.added.b")}` }));


        } else {


            dispatch(alertQuery({

                showQuery: true,
                issue: "UPDATE_SECTION",

                message: `${t("ToV.msg.update.query.a")} ${section.id} ${t("ToV.msg.update.query.b")}`,

                data: { ...section }

            }));

        }

    };


    const handelRemoveSectionFromRoute = event => {

        let from = ntp.ifrom.iRef.current.value.replace(" ", "").toUpperCase();
        let to = ntp.ito.iRef.current.value.replace(" ", "").toUpperCase();



        let navpoints = [""].some(val => val != from && val != to); //to & from != " "

        let INDEX = routeState.indexOf(routeState.find(section => section.id === `${from}=>${to}`));

        // console.info({ index: INDEX, navpoints: navpoints, to: to, from: from, len: routeState.route.length });



        if (!navpoints) {

            if (routeState.length === 0) {

                dispatch(setAlert({ issue: "info", message: t("ToV.msg.empty") }));

                return;

            }

            dispatch(alertQuery(
                {
                    showQuery: true,
                    issue: "ROUTE_DELETE",
                    message: t("ToV.msg.erase.query.c"),

                }

            ));

        } else {


            if (INDEX < 0) {

                dispatch(setAlert({ issue: "info", message: `${t("ToV.msg.noSlice.a")} ${from}=>${to} ${t("ToV.msg.noSlice.b")}` }));

            } else {

                dispatch(alertQuery({

                    issue: "REMOVE_SECTION",
                    message: `${t("ToV.msg.erase.query.a")} ${from}=>${to} ${t("ToV.msg.erase.query.b")}`,
                    data: { id: routeState[INDEX].id }

                }));

            }
        }

    }


    const handleConvert = e => {

        var S__ = parseFloat(ntp.is.iRef.current.value);
        var S_min = parseFloat(ntp.oVmin.iRef.current.value);

        switch (state.si) {

            case "nm":

                ntp.is.iRef.current.value = isNaN(fNTP.milesToKm(S__)) ? " " : fNTP.milesToKm(S__);

                if (typeof (S_min) === "number") {

                    ntp.oVmin.iRef.current.value = fNTP.milesToKm(S_min).toFixed(1);
                }

                break;

            case "km":

                ntp.is.iRef.current.value = isNaN(fNTP.kmetersToNM(S__)) ? " " : fNTP.kmetersToNM(S__);

                if (typeof (S_min) === "number") {

                    ntp.oVmin.iRef.current.value = fNTP.kmetersToNM(S_min).toFixed(1);
                }
        }
    }


    const handleSaveRoute = event => {

        const url = "http://localhost:8080/api/tov/save";

        const config = {

            headers: { "Content-Type": "application/json" }
        };

        axios.post(url, JSON.stringify(routeOutput)).then(res => {

            window.location.href = url;

        });

    }



    return (


        <Box className="NTP" sx={{ marginY: '40px', padding: 3 }}>

            <Toasts open={alertState.show}
            />
            <AppendQuery open={alertState.showQuery} />

            <Paper sx={{ p: 5, pt: 5 }}>


                {/* <Typography variant="body3" component="p" sx={{ pt:3,pr:3,pb:0,pl:4, mb:0}}>NTP</Typography> */}

                <Box sx={{      //https://mui.com/system/grid/#api
                    mt: 0,
                    // p: 5,
                    // pt: 5,
                    display: 'grid',
                    gridTemplateRows: 'repeat(10, 1fr)',
                    gridTemplateColumns: 'repeat(9, 10%)',
                    gridTemplateAreas:

                        `"ifrom  ifrom     ito      ito    .     .  canvas canvas canvas    "
                    "iδm    .        .      .    .     .  canvas canvas canvas    "
                    "iδb    .        .      .    .     .  canvas canvas canvas    "
                    "idm    odn      okw   .    .     .  canvas canvas canvas    "
                    "iu     lU       .      .    .     .      .      .       .    "
                    "inkdg  onkdm    okb   .    .     .      .      .       .    "
                    ".      okz      okm    .    .     .      .      .       .    "
                    "iv     lV       ow     lW   .     .      .      .       .    "
                    "is     nmkm     oVmin  l5   lt    ot    ot      .       .    "
                    "formulas     .        .      .    .     .    bts    bts     bts  "`,
                    gap: .8,
                }}>

                    {ntp.IDs.map((cell, i) => {

                        if (cell === "canvas") {

                            return (

                                <Box
                                    key={i}
                                    id={cell}
                                    ref={canvas => (ntp[cell].ref.current = canvas)}
                                    sx={{ gridArea: cell, display: "flex", justifyContent: "right", my: "auto"/*, borderStyle: "inset",boxSizing:"content-box" */ }}
                                >

                                    <Instrument

                                        {...{
                                            context: ntp.canvas.ref,
                                            ...inputs
                                        }}
                                    />

                                </Box>
                            )
                        }

                        if (["i", "o"].some(char => cell.charAt(0) === char)) {

                            return (

                                <TextField

                                    key={i}
                                    id={cell}
                                    label={cell.slice(1).toUpperCase()}
                                    ref={ntp[cell].ref}
                                    inputRef={ntp[cell].iRef}

                                    fullWidth={true}
                                    defaultValue={" "}
                                    sx={{ gridArea: cell }}
                                    variant="outlined"
                                    size="small"

                                    {
                                    ...cell.charAt(0) === "i" && {

                                        onChange: handleChange,
                                        onInputCapture: handleChange,
                                        onBlur: handleChange
                                        // placeholder:"ICAO"
                                    }
                                    }
                                    {
                                    ...cell.charAt(0) === "o" &&
                                    {
                                        InputProps: { readOnly: true },
                                        // margin: "dense",
                                        required: true
                                    }
                                    }
                                />
                            )

                        }
                        if (cell.charAt(0) === "l") {
                            return (
                                <label
                                    key={i}
                                    id={cell}
                                    htmlFor={ntp.IDs[i - 1]}
                                    style={{ gridArea: cell, paddingTop: auxStyle.pT, fontSize: ".6em" }}>
                                    {["lU", "lV", "lW"].some(label => cell.includes(label)) && "kt"}
                                    {cell === "l5" && state.si === "nm" && "nm/5min"}
                                    {cell === "l5" && state.si === "km" && "km/5min"}
                                </label>
                            )
                        }

                        if (cell.charAt(0) === "n") {
                            return (
                                <Box
                                    key={i}
                                    id={cell}
                                    sx={{ gridArea: cell }}>
                                    <Button
                                        variant="contained"
                                        size="extraSmall"
                                        onClick={() => {
                                            handleConvert();
                                            setButtons.toggleUnit();
                                        }}
                                    >{state.si}</Button>
                                </Box>
                            )
                        }

                        if (cell.charAt(0) === "f") {
                            return (
                                <Box
                                    key={i}
                                    id={cell}
                                    sx={{ gridArea: cell }}>
                                    <Button
                                        variant="outlined"
                                        size="small"

                                    >formulas</Button>
                                </Box>
                            )
                        }

                        if (cell.charAt(0) === "b") {
                            return (
                                <Box
                                    key={i}
                                    id={cell}
                                    sx={{ gridArea: cell }}>
                                    <ButtonGroup variant="contained" size="small" aria-label="outlined primary button group"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "right",
                                            gap: auxStyle.gap,
                                            "& button": { width: "100%" },
                                        }}
                                    >
                                        <Button id="appendBtn" onClick={handelAddSectionToRoute} disabled={ntp.appendBlock}><LibraryAddIcon /></Button>
                                        <Button id="eraseBtn" onClick={handelRemoveSectionFromRoute}><BackspaceIcon /></Button>
                                        <Button id="saveBtn" onClick={handleSaveRoute} disabled={ntp.saveBlock}><SaveAltIcon /></Button>
                                    </ButtonGroup>
                                </Box>
                            )
                        }

                    })}

                </Box>
            </Paper>

        </Box>



    );
}



export default NTP;