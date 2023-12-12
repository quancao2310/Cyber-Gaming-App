import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminHome from "./admin/Home";
import StaffHome from "./staff/Home";
import CustomerHome from "./customer/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

function Main() {
  const [theme, colorMode] = useMode();

  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="admin" element={<AdminHome />} />
            <Route path="staff" element={<StaffHome />} />
            <Route path="customer" element={<CustomerHome />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default Main;
