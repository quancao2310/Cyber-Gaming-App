import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "./Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("order")) || [];
    setCartItems(storedCart);
  }, []);

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.foodItem.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("order", JSON.stringify(updatedCart));
  };

  // Function to handle changing the quantity of an item in the cart
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.foodItem.id === itemId
        ? { ...item, quantity: parseInt(newQuantity) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("order", JSON.stringify(updatedCart));
  };

  // Calculate the total cost of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
  };

  return (
    <Fragment>
      <Navbar />
      <Container>
        <div style={{display:"flex",justifyContent:"space-around",justifyItems:"center"}}>
            <Typography variant="h4" align="left" style={{ marginTop: "20px" }} flexGrow={1}>
              Shopping Cart
            </Typography>
            <Typography variant="h5" align="center" style={{ marginTop: "20px", marginRight: "20px" }} >
            Total: ${calculateTotal().toFixed(2)}
            </Typography>
            <Button
              style={{ marginTop: "16px", maxWidth:"120px",marginLeft:"auto" }}
              color="primary"
              align="right"
              variant="contained"
              fullWidth
            >
                Order
            </Button>
        </div>
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
              {cartItems.map((cartItem) => (
                <Grid item key={cartItem.foodItem.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={cartItem.foodItem.name}
                      height="240"
                      image={cartItem.foodItem.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {cartItem.foodItem.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cartItem.foodItem.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${cartItem.foodItem.price.toFixed(2)} x{" "}
                        {cartItem.quantity}
                      </Typography>
                      <TextField
                        type="number"
                        label="Quantity"
                        inputProps={{ min: 1 }}
                        value={cartItem.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            cartItem.foodItem.id,
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                      <Button
                        onClick={() =>
                          handleRemoveFromCart(cartItem.foodItem.id)
                        }
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Remove from Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Fragment>
  );
};

export default CartPage;
