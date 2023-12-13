import { Routes, Route } from "react-router-dom";
import Product from "./ProductManagement";

function AdminHome() {
  return (
    <>
    <h1>123</h1>
    {/* <Routes>
      <Route path ="/" >
        <Route index element={<h1>Welcome to Admin Home</h1>} />
        <Route path="product" element={<Product />} />
        <Route path="transaction" element={<div>Transaction Page</div>} />
        <Route path="discount-event" element={<div>Discount Event Page</div>} />
      </Route>
    </Routes> */}
    </>
  );
}

export default AdminHome;
