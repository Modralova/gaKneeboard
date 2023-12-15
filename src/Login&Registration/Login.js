
import React, { useState, useRef, useEffect } from "react";
import { Typography, Paper, ThemeProvider, CssBaseline } from "@mui/material";
import { OutlinedInput, Box, Button } from "@mui/material";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setLogin, fetchLogged } from "../Store/loginSlice";
import cookies from "../cookieParser";
import { setAlert } from "../Store/alertSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";


// const SERVER_ADDRES = process.env.NODE_ENV === "development" ?
// process.env.REACT_APP_DEV_SERVER_ADDRESS :
// process.env.REACT_APP_SERVER_ADDRESS;


const Login = () => {

    const loginState = useSelector(state => state.loginReducer);
    const [inputs, setInputs] = useState({ username: "" });
    const [response, setResponse] = useState(null);
    const history = useHistory();

    const dispatch = useDispatch();



    useEffect(() => {

        if (response !== null) {

            if (response && response.logged || cookies.PHPSESSID === sessionStorage.getItem("SESS_ID")) {

                dispatch(setLogin({ login: inputs.username }));
                dispatch(setAlert({ issue: "success", message: `Cześć ${inputs.username}` }));

                sessionStorage.setItem("SESS_ID", cookies.PHPSESSID);
                sessionStorage.setItem("SESSLOGIN", cookies.SESSLOGIN);

                history.push("/");


            } else {




                sessionStorage.removeItem("SESS_ID");
                sessionStorage.removeItem("SESSLOGIN");

                dispatch(fetchLogged());

                history.push("/");


            }
        }

    }, [response]);



    if (cookies.PHPSESSID === sessionStorage.getItem("SESS_ID")) {


        dispatch(setLogin({ login: cookies.SESSLOGIN }))


    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(data => ({ ...data, [name]: value, logged: loginState.logged }));

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.defaults.withCredentials = true;

        // axios.post(SERVER_URI, inputs).then(res => {
        axios.post("http://localhost:8080/api/", inputs).then(res => {




            setResponse(res.data);
        })

    }



    return (<Box>
        <span style={{ color: "#b5cfa9" }}>
            <Typography sx={{ margin: "10px" }}> gaKneeboard</Typography>
        </span>
        <Box className="LoginForm" sx={{


            display: 'flex',
            alignItems: 'center',
            alignContent: "center",
            flexDirection: "column",
            justifyContent: "center",
            paddingY: 20,

                

        }}>
            <form onSubmit={handleSubmit} style={{
                display: "flex", flexDirection: "column"
            }} >
                <Typography>user:</Typography>
                <OutlinedInput
                    sx={{ width: "300px" }}
                    type="text"

                    name="username"
                    onChange={handleChange}
                    autoComplete='off'
                    required
                />
                <Typography>password:</Typography>
                <OutlinedInput type="password"

                    name="password"
                    onChange={handleChange}
                    autoComplete='off'
                    required
                />
                <Button type="submit">login</Button>
            </form>
            <span style={{ fontSize: "10px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                <Link to="/register" style={{ textDecoration: "none", color: "#b5cfa9" }}> registration </Link>
                <Link to="/updateps" style={{ textDecoration: "none", color: "#6F7E8C" }}>reset password </Link>
            </span>
        </Box>
    </Box>);
}

export default Login;