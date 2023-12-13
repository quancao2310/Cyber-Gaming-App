import { Routes, Route, BrowserRouter } from "react-router-dom";
import Product from "./admin/ProductManagement";
import Home from "./Home";
import AdminHome from "./admin/Home";
import StaffHome from "./staff/Home";
import CustomerHome from "./customer/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import DiscountEvent from "./admin/DiscountEventManagement";
import Transaction from "./admin/TransactionManagement";

function Main() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path='/'>
                <Route index element={<Transaction />} />
                <Route path='admin' element={<AdminHome />} />
              </Route>
              <Route path='admin' element={<AdminHome />} />
              <Route path='*' element={<h1>NOT FOUND!</h1>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Main;
