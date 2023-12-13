import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import BillingProcess from './BillingProcess';
import {Box} from '@mui/material'
import { mockDataInvoices } from '../../data/mockData'
const StaffHome = () => {
    const [state, setState] = useState(localStorage.getItem('username')==null);
    const [invoices, setInvoices] = useState([]);
    // Function to update the count state in the parent component

    const updateState = () => {
      if (state) {
        setInvoices(mockDataInvoices)
      }
      setState(!state);
    };

  return (
    <Box>
      {state? <Login updateLoginStatus={updateState}/> : <BillingProcess updateLoginStatus={updateState} invoices={invoices}/>}
    </Box>
  );
};

export default StaffHome;
