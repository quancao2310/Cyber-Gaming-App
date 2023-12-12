import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/admin/Home";
import StaffHome from "./pages/staff/Home";
import CustomerHome from "./pages/customer/Home"; 
import BillingProcess from "./pages/staff/BillingProcess"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/staff" element={<StaffHome />} />
              <Route path="/customer" element={<CustomerHome />} />
              <Route path="/billing-process" element={<BillingProcess />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
