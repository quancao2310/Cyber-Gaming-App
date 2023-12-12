import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import BillingProcess from './BillingProcess';

const StaffHome = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/billing-process" element={<BillingProcess />} />
      </Routes>
  );
};

export default StaffHome;
