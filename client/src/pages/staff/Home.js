import React, { useState, useEffect } from 'react';
import Login from './Login';
import BillingProcess from './BillingProcess';
import {Box} from '@mui/material'
const StaffHome = () => {
    const [loadLogin, setLoadLogin] = useState(localStorage.getItem('username')==null);
    // Function to update the count state in the parent component

    const updateState = () => {
      setLoadLogin(!loadLogin);
    };

  return (
    <Box>
      {loadLogin? <Login updateLoginStatus={updateState}/> : <BillingProcess updateLoginStatus={updateState}/>}
    </Box>
  );
};

export default StaffHome;
