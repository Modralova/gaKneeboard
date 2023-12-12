import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSelector, useDispatch } from "react-redux";
import { setSigns } from "../../../Store/planeSlice";


export default function BasicSelect(props) {
    const [plane, setPlane] = React.useState(" ");

    const planeState = useSelector(state => state.planeReducer).plane

    const dispatch = useDispatch();


  

const planes = props.planes


    const handleChange = (event) => {



        setPlane(event.target.value);
        dispatch(setSigns({plane: event.target.value}));
        
    };

    return (

        
        <Box sx={{ maxWidth: 120, height: 20,  p:0,m:0 }}>
     

            <FormControl 
            fullWidth={true}
            >
                <InputLabel 
                sx={{fontSize:10, m:0, p:0}}
                //id="demo-simple-select-label"
               
                >
                    Samolot
                    </InputLabel>

                <Select
                   // labelId="demo-simple-select-label"
                   // id="demo-simple-select"
                    defaultValue={" "}
                    value={plane}
                    sx={{fontSize:8, p:0, m:0, height:30 }}
                    label="samolot"
                    onChange={handleChange}
                >
                      <MenuItem sx={{fontSize:10}} key={0} value={" "}>{" "}</MenuItem>

                    {

                    planes.map( (plane,p) => {

                        return (

                            <MenuItem sx={{fontSize:10}} key={p+1} value={plane.sign}>{plane.sign}</MenuItem>

                        )
                    })
                    }


                </Select>

            </FormControl>
        </Box>
    );
}