import React, { useEffect } from "react";
import { useRef, useMemo, useReducer} from "react";
import { Box, Paper} from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import BasicSelect from "./components/select";
import TextField from '@mui/material/TextField';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CalculateIcon from '@mui/icons-material/Calculate';


import * as fLoad from "./LOAD_functions";

import { useSelector} from "react-redux";

let load = new Object();

load.IDs = [

    'plist',
    'oTyp',
    'oQmax',
    'nlbsBTN',
    'oQp',
    'lQp',
    'oMp',
    'lMp',
    'lQf',
    'oQf',
    'iFuel',
    'nflBTN',
    'oMf',
    'lMf',
    'iQcr',
    'lQcr',
    'oMcr',
    'lMcr',
    'iQlg',
    'lQlg',
    'oMlg',
    'lMlg',
    'oQ',
    'lQ',
    'oM',
    'lM',
    'oAgc',
    'lAgc',
    'oAdc',
    'lAdc',
    'bts'
];

// TODO: animacja pokazująca zachowanie samolotu przy danym załadunku w funkcji prędkości i pochylenia i przechylenia


let auxStyle = {

    gap: .3,   //column gap
    cW: "60px", //column width
    pT: 12
};


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

load.planes = await axios.get("http://localhost:8080/api/LOAD/planes", config).then(res => {


    return res.data;

})

load.initState = {

    weigth: "kg",
    weigthM: "kg/m",
    fuel: "l.",
    Agc: "m",

    fWeigth: fLoad.kgToLbs,
    fWeigthT: fLoad.kgmToLbsin,
    fFuel: fLoad.lToGal,
    fAgc: fLoad.mToIn
};

function reducer(state, action) {

    switch (action.type) {
        case 'weigth': {

            return {
                ...state,
                weigth: state.weigth === "kg" ? "lbs" : "kg",
                Agc: state.Agc === "m" ? "in" : "m",
                weigthM: state.weigthM === "kg/m" ? "lbs/in" : "kg/m",
                fAgc: state.fAgc === fLoad.inToM ? fLoad.mToIn : fLoad.inToM,
                fWeigth: state.fWeigth === fLoad.lbsToKg ? fLoad.kgToLbs : fLoad.lbsToKg,
                fWeigthT: state.fWeigthT === fLoad.lbsinToKgm ? fLoad.kgmToLbsin : fLoad.lbsinToKgm
            };
        }

        case 'fuel': {

            return {

                ...state,
                fuel: state.fuel === "l." ? "Gl." : "l.",
                fFuel: state.fFuel === fLoad.galToL ? fLoad.lToGal : fLoad.galToL

            };
        }

        default:

            return state;

    }

}



const LOAD = () => {

    const themeState = useSelector(store => store.themeReducer).theme;

    const [state, dispatch] = useReducer(reducer, load.initState);

    const planeState = useSelector(state => state.planeReducer).plane

   
    for (let ID of load.IDs) {
        load[`${ID}`] = new Object();

        load[ID].ref = useRef();
        load[ID].iRef = useRef();
    }


    const setButtons = useMemo(() => (

        {
            toggleWeigth: () => {

                dispatch({ type: 'weigth', info: "weigthDispatch" });
            },

            toggleFuel: () => {

                dispatch({ type: 'fuel', info: "fuelDispatch" });
            },

        }));


    const countLoad = () => {

        let v = new Object();
        let type = load.oTyp.iRef.current.value;
        let dc;

        if (type === 'AT-3') dc = 1.27; //mean aerodynamic chord
        if (type === 'C-152') dc = "";


        for (let ID of load.IDs) {


            v[ID] = parseFloat(

                ["oQp", "oQf", "iQcr", "iQlg", "oMp", "oMf", "oMcr", "oMlg"]
                    .some(id => id === ID) && load[ID].iRef.current.value

            );

        }


        v.oQ = (v.oQp + v.oQf + v.iQcr + v.iQlg).toFixed(3);
        v.oM = (v.oMp + v.oMf + v.oMcr + v.oMlg).toFixed(3);

        if (state.weigth === 'lbs') {

            v.oQ = state.fWeigth(v.oQ).toFixed(3);
            v.oM = state.fWeigthT(v.oM).toFixed(3);
            v.Agc = state.fAgc(v.Agc);


        }


        v.oAgc = (v.oM / v.oQ).toFixed(3);
        v.oAdc = (v.oAgc / dc * 100).toFixed(0);


        if (type === 'AT-3') {

            for (let ID of load.IDs) {

                if (["oQ", "oM", "oAgc", "oAdc"].some(id => id === ID))

                    load[ID].iRef.current.value = v[ID]


            }

        }

    };



    const handleConvertWeigth = () => {


        for (let ID of load.IDs) {

            if (["oQp", "oQf", "iQcr", "iQlg", "oQmax", "oQ"].some(id => id === ID)) {
                load[ID].iRef.current.value = state.fWeigth(load[ID].iRef.current.value).toFixed(3);
            }

            if (["oMp", "oMf", "oMcr", "oMlg", "oM"].some(id => id === ID)) {
                load[ID].iRef.current.value = state.fWeigthT(load[ID].iRef.current.value).toFixed(3);
            }

            if (["oAgc"].some(id => id === ID)) {
                load[ID].iRef.current.value = state.fAgc(load[ID].iRef.current.value);
            }

        }

    };


    const handleConvertFuel = () => {

        let fuel = parseFloat(load.iFuel.iRef.current.value);
        let Qf = parseFloat(load.oQf.iRef.current.value);

        if (fuel != "" && !isNaN(fuel)) {

            let F__ = parseFloat(fuel);
            let Qf__ = parseFloat(Qf);

            load.iFuel.iRef.current.value = state.fFuel(fuel)//.toFixed(3);   
            load.oQf.iRef.current.value = Qf.toFixed(3);
            

        }

    };


    const handleChangeFuel = () => {

        let fArm__;
        let type = load.oTyp.iRef.current.value;

        if (type === 'AT-3') fArm__ = - .0257
        if (type === 'C-152') fArm__ = ""

        if (state.weigth === "lbs")

            load.oQf.iRef.current.value = fLoad.kgToLbs(load.iFuel.iRef.current.value * .721);

        else

            load.oQf.iRef.current.value = (load.iFuel.iRef.current.value * .721).toFixed(3);


        if (state.fuel === 'Gl.') {

            load.oQf.iRef.current.value = fLoad.galToL(load.iFuel.iRef.current.value * .721)
        }

        load.oMf.iRef.current.value = (load.oQf.iRef.current.value * fArm__).toFixed(3);

    };


    const handleChangeCrew = () => {

        let crArm__;
        let type = load.oTyp.iRef.current.value;

        if (type === 'AT-3') crArm__ = .6
        if (type === 'C-152') crArm__ = ""


        if (state.weigth === 'lbs')

            load.oMcr.iRef.current.value = fLoad.kgToLbs(load.iQcr.iRef.current.value * crArm__)

        else

            load.oMcr.iRef.current.value = load.iQcr.iRef.current.value * crArm__;
    }

    const handleChangeLuggage = () => {

        let lgArm__;
        let type = load.oTyp.iRef.current.value;

        if (type === 'AT-3') lgArm__ = 1.125
        if (type === 'C-152') lgArm__ = ""


        if (state.weigth === 'lbs')

            load.oMlg.iRef.current.value = fLoad.kgToLbs(load.iQlg.iRef.current.value * lgArm__)

        else

            load.oMlg.iRef.current.value = load.iQlg.iRef.current.value * lgArm__;

    }

    useEffect(() => {

        // planeState ustawiany jest w pliku "./components/select.js"

        if (planeState) {

            for (let ID of load.IDs) {

                if (["i", "o"].some(k => k === ID.charAt(0)))

                    load[ID].iRef.current.value = " ";
            }

            if (load.planes.find(plane => (plane.sign === planeState)).oQmax.includes('lbs') && state.weigth !== "lbs")

                setButtons.toggleWeigth();

            if (load.planes.find(plane => (plane.sign === planeState)).oQmax.includes('kg') && state.weigth !== "kg")

                setButtons.toggleWeigth();

            handleConvertWeigth();


            for (let ID of load.IDs)// pobieranie wartości pól tablicy do texteditów
            {
                let param = load.planes.find(plane => (plane.sign === planeState))[ID];


                if (param) {

                    load[ID].iRef.current.value = param.replace(/_\w+/, "");
                }
            };
        }

    }, [planeState]);



    return (
        <Box
            className="LOAD"
            sx={{ marginY: '80px', padding: 3,  "@media screen and (orientation:portrait)": {

                p: 0, pt: 4,
                marginY: 0
            } }}
        >
            <Paper
                sx={{ p: 5, "@media screen and (orientation:portrait)": {

                    pl: 0, pr:4, pt: 3, pb:2,
                } }}
            >

                <Box
                    sx={{
                        mt: 0,

                        display: 'grid',
                        gridTemplateRows: 'repeat(9, 1fr)',
                        gridTemplateColumns: 'repeat(3, 1fr 2fr 1fr)',
                       // gridTemplateColumns: '1fr 2fr 1fr 1fr 2fr 1fr 1fr 2fr 1fr',
                        gridTemplateAreas:

                            `"llP plist .  llT  oTyp .  llQmax oQmax nlbsBTN "
                            ". . . llQp oQp lQp   llMp oMp lMp  "
                            ". iFuel nflBTN  llQf oQf lQf llMf oMf lMf "
                            ". . .  llQcr iQcr lQcr llMcr oMcr lMcr  "
                            ". .  . llQlg iQlg lQlg llMlg oMlg lMlg   "
                            ". . .  llQ  oQ lQ llM oM  lM  "
                            ". . . . . .  llAgc oAgc lAgc  "
                            ". . . . . .  llAdc  oAdc lAdc  "
                            " . .  .  . . . . bts . "`
                        , gap: .8
                    }}>



                    {load.IDs.map((cell, i) => {

                        //     console.log("id: ", cell)

                        if (cell.charAt(0) === "p") {




                            return (
                                <Box
                                    key={i}
                                    sx={{ gridArea: cell }}
                                    id={cell}
                                >
                                    <BasicSelect
                                        planes={[...load.planes]}


                                    />
                                </Box>
                            )

                        }


                        else if (cell.charAt(0) === "i") {
                            return (
                                <TextField
                                    fullWidth={true}

                                    defaultValue={" "}
                                    key={i}
                                    id={cell}
                                    label={cell.slice(1)}
                                    ref={load[cell].ref}
                                    inputRef={load[cell].iRef}
                                    sx={{ gridArea: cell }}
                                    onChange={() => {


                                        if (cell === "iFuel") {

                                            handleChangeFuel();
                                        }

                                        if (cell === "iQcr") {

                                            handleChangeCrew();
                                        }

                                        if (cell === "iQlg") {

                                            handleChangeLuggage();
                                        }
                                    }

                                    }

                                    variant="outlined"
                                    size="small"
                                    required
                                />
                            )

                        }

                        if (cell.charAt(0) === "o") {

                            return (
                                <TextField
                                    fullWidth={true}
                                    key={i}
                                    sx={{ gridArea: cell }}
                                    // margin="dense"
                                    id={cell}
                                    defaultValue={" "}
                                    label={cell.slice(1)}
                                    ref={load[cell].ref}
                                    inputRef={load[cell].iRef}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            )

                        }

                        else if (cell.charAt(0) === "l") {
                            return (
                                <label
                                    key={i}
                                    id={cell}

                                    //  htmlFor={cell[i - 1]}
                                    style={
                                        {

                                            gridArea: cell,
                                            paddingTop: auxStyle.pT,
                                            fontSize: ".6em",


                                        }}>

                                    {['lQp', 'lQf', 'lQf', 'lQcr', 'lQlg', 'lQ']
                                        .some(label => load.IDs[i].includes(label))
                                        && state.weigth}

                                    {['lMp', 'lMf', 'lMf', 'lMcr', 'lMlg', 'lM']
                                        .some(label => load.IDs[i].includes(label))
                                        && state.weigthM}

                                    {cell === "lAgc" && state.Agc}
                                    {cell === "lAdc" && "%"}

                                </label>
                            )
                        }

                        else if (cell.charAt(0) === "n") {
                            return (
                                <Box
                                    key={i}
                                    id={cell}
                                    sx={{ gridArea: cell }}>
                                    <Button

                                        variant="contained"
                                        size="extraSmall"

                                        onClick={() => {

                                            if (cell === "nflBTN") {
                                                handleConvertFuel();
                                                setButtons.toggleFuel();
                                            }
                                            if (cell === 'nlbsBTN') {
                                                handleConvertWeigth();
                                                setButtons.toggleWeigth();
                                            }
                                        }
                                        }
                                    >
                                        {cell === "nflBTN" && state.fuel}
                                        {cell === 'nlbsBTN' && state.weigth}
                                    </Button>
                                </Box>
                            )
                        }

                        // else if (cell.charAt(0) === "f") {
                        //     return (
                        //         <Box
                        //             key={i}
                        //             id={load.IDs[i]}
                        //             sx={{ gridArea: load.IDs[i] }}>
                        //             <Button
                        //                 variant="outlined"
                        //                 size="small"
                        //             // onClick={() => {
                        //             //     handleConvert();
                        //             //     setButtons.toggleUnit();
                        //             // }}
                        //             >formulas
                        //                 {/* {load.currentState.si} */}
                        //             </Button>
                        //         </Box>
                        //     )
                        // }

                        else if (cell.charAt(0) === "b") {
                            return (
                                <Box
                                    key={i}
                                    id={cell}
                                    sx={{ gridArea: cell }}>
                                    <ButtonGroup variant="contained" size="small" aria-label="outlined primary button group"
                                        sx={{ display: "flex", justifyContent: "right", gap: auxStyle.gap, "& button": { width: "100%" } }}


                                    >
                                        {/* <Button id="countBtn" onClick={calcNTP}><CalculateIcon /></Button> */}
                                        {/* <Button id="countdBtn" onClick={handelAddSectionToRoute} disabled={load.appendBlock}><LibraryAddIcon /></Button> */}
                                        <Button onClick={countLoad} ><CalculateIcon /></Button>
                                    </ButtonGroup>
                                </Box>
                            )
                        }

                    })


                    }


                </ Box>
            </Paper>
        </Box>

   



    );
}

export default LOAD;
