import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/admin/Home";
import StaffHome from "./pages/staff/Home";
import CustomerHome from "./pages/customer/Home";
import BillingProcess from "./pages/staff/BillingProcess";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import DepositPage from "./components/Cash";
import LoginForm from "./components/Login";
import HomeCustomerPage from "./components/CustomerHomePage";
import FoodOrderPage from "./components/FoodService";
import CartPage from "./components/Cart";
import OrderRoomPage from "./components/RoomService";
import ComputerOrderPage from "./components/SlotService";
import OrderSuccessPage from "./components/OrderSuccess";
import DepositSuccessPage from "./components/CashInSuccess";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route
            path="/customer/order/success"
            element={<OrderSuccessPage />}
          />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/order-slot" element={<ComputerOrderPage />} />
          <Route path="/customer/order-room" element={<OrderRoomPage />} />
          <Route path="/customer/order-food" element={<FoodOrderPage />} />
          <Route path="/customer/login" element={<LoginForm />} />
          <Route
            path="/customer/cash/success"
            element={<DepositSuccessPage />}
          />
          <Route path="/customer/cash" element={<DepositPage />} />
          <Route path="/customer" element={<HomeCustomerPage />} />

          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/staff" element={<StaffHome />} />
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/billing-process" element={<BillingProcess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
