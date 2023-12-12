
import React, { useState, useRef, useEffect, useMemo, useReducer } from "react";
import { Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";
import { OutlinedInput, Box, Button } from "@mui/material";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {v4} from "uuid";



const reducer = (state, action) => {

    state.pswd = action.pswd,
        state.comparator = action.comparator

}

let regist = new Object();

regist.IDs = ["pswd_reg,comparator_reg"]


const Registration = () => {


    const loginState = useSelector(state => state.loginReducer);
    const [inputs, setInputs] = useState({ password: "", comparator: "" });
    const [response, setResponse] = useState();
    


    const comparePswd = (inputs) => {

   
     return  inputs.password === inputs.comparator ? true : false;

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(data => ({ ...data, [name]: value }));
        // console.log("inputs: ",inputs)
    }


    const handleSubmit = (e) => {

            e.preventDefault();
            axios.defaults.withCredentials = true;

            // axios.post(SERVER_ADDRES, inputs).then(res => {
            axios.post("http://localhost:8080/api/register", {...inputs,uuid:v4()}).then(res => {

                console.log("response: ", res.data);
                setResponse(res.data);
            })
       
    }


   
    return (
        <Box>
            <span style={{ color: "#b5cfa9" }}>
                <Typography sx={{ margin: "10px" }}> gaKneeboard</Typography>
            </span>
            <Box className="RegistrationForm"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: "center",
                    flexDirection: "column",
                    justifyContent: "center"
                }}><form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>email:</Typography>
                    <OutlinedInput
                        sx={{ width: "300px" }}
                        type="email"
                        id="email_reg"
                        name="email"
                        onChange={handleChange}
                        autoComplete=""
                        required
                    ></OutlinedInput>
                    <Typography>login:</Typography>
                    <OutlinedInput
                        type="text"

                        id="login_reg"
                        name="username"
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                    <Typography>password:</Typography>
                    <OutlinedInput
                        {
                        ...!comparePswd(inputs) && {
                            sx: {
                                backgroundColor: "rgba(217,0,0,0.2)"
                            }
                        }
                        }

                        type="password"
                      
                        id='pswd_reg'
                        name="password"
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                    <Typography>confirm password:</Typography>
                    <OutlinedInput
                        {
                        ...!comparePswd(inputs) && {
                            sx: {
                                backgroundColor: "rgba(217,0,0,0.2)"
                            }
                        }
                        }
                        type="password"
                        id='comparator_reg'
                        name="comparator"
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                    <Button type="submit" disabled={!comparePswd(inputs)}>send</Button>
                </form>
            </Box> </Box>


    );
}

export default Registration;