import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import Navbar from './Navbar';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    e.preventDefault();
    // You can add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    localStorage.setItem('token', 'mytoken');
    window.location.href = redirect || '/customer';
  };

  return (
    <div style={{position:'relative',height:'100vh',width:'100vw'}}>
        <Navbar />
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
            <Container component="main" maxWidth="xs">
              <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
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
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Sign In
                  </Button>
                </form>
              </Paper>
            </Container>
        </div>
    </div>
  );
};

export default LoginForm;
