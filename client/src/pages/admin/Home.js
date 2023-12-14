import { Routes, Route } from "react-router-dom";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function AdminHome() {
  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<></>}>
                <Route path="transaction" element={<></>} />
                <Route path="discount-event" element={<></>} />
              </Route>
            </Routes>
          </main>
        </div>
      /* </ThemeProvider>
    </ColorModeContext.Provider> */
  );
}

export default AdminHome;
