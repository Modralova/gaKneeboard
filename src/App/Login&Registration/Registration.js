/* eslint-disable react/jsx-props-no-spreading */
import React, { useState,} from 'react';
import { Typography,  OutlinedInput, Box, Button,} from '@mui/material';
import axios from 'axios';


const regist = {};

regist.IDs = ['pswd_reg,comparator_reg'];

function Registration() {
  const [inputs, setInputs] = useState({ password: '', comparator: '' });

  const comparePswd = () => (inputs.password === inputs.comparator);

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    // axios.post(SERVER_ADDRES, inputs).then(res => {
    axios.post(process.env.LOGIN_URI+'/register', { ...inputs }).then(() => {

    });
  };

  return (
    <Box>
      <span style={{ color: '#b5cfa9' }}>
        <Typography sx={{ margin: '10px' }}> gaKneeboard</Typography>
      </span>
      <Box
        className="RegistrationForm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

          <Typography>email:</Typography>
          <OutlinedInput
            sx={{ width: '300px' }}
            type="email"
            id="email_reg"
            name="email"
            onChange={handleChange}
            autoComplete=""
            required
          />

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
                            backgroundColor: 'rgba(217,0,0,0.2)',
                          },
                        }
                        }
            type="password"
            id="pswd_reg"
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
                            backgroundColor: 'rgba(217,0,0,0.2)',
                          },
                        }
                        }
            type="password"
            id="comparator_reg"
            name="comparator"
            onChange={handleChange}
            autoComplete=""
            required
          />

          <Button type="submit"  disabled={!comparePswd(inputs)}>
            send
          </Button>

        </form>
      </Box>
    </Box>

  );
}

export default Registration;
