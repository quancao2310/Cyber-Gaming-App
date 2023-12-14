import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import BillingProcess from './BillingProcess';
import {Box} from '@mui/material'
const StaffHome = () => {
    const [state, setState] = useState(localStorage.getItem('username')==null);
    // Function to update the count state in the parent component

    const updateState = () => {
      setState(!state);
    };

  return (
    <Box>
      {state? <Login updateLoginStatus={updateState}/> : <BillingProcess updateLoginStatus={updateState}/>}
    </Box>
  );
};

export default StaffHome;
