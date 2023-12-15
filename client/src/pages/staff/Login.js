import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Login = ({ updateLoginStatus }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your logic for handling the login process
    axios.get(`http://localhost:5000/api/staff/${username}`)
    .then(res=>res.data)
    .then((data)=>{
      if (data.type !== 'Accountant'){
        alert("You are not an Accountant")
      } else {
        localStorage.setItem('staffID', username);
        updateLoginStatus();
      }
    })
    .catch((err)=>{
      console.log(err)
      alert("Staff ID is invalid")
    })
    console.log('Username submitted:', username);
    // Add further logic (e.g., authentication) as needed
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="wraper">
        <Typography component="h1" variant="h5">
          Staff Login - Nhập ID nhân viên
        </Typography>
        <form className="form-class" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="btn-submit"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
