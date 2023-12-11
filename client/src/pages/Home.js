import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./admin/Home";
import StaffHome from "./staff/Home";
import CustomerHome from "./customer/Home"; 
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";

function Home() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
                <Route index="/admin" element={<AdminHome />} />
                <Route index="/staff" element={<StaffHome />} />
                <Route index="/customer" element={<CustomerHome />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Home;
