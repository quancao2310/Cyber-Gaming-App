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
  const [slotItems, setSlotItems] = useState([]); // [1
  const [roomItems, setRoomItems] = useState([]); // [1

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("order")) || [];
    const storedSlot = JSON.parse(localStorage.getItem("orderComputer")) || []; // [2
    const storedRoom = JSON.parse(localStorage.getItem("orderRoom")) || []; // [2
    setRoomItems(storedRoom); // [3
    setSlotItems(storedSlot); // [3
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

  const handleRemoveFromSlot = (pcname) => {
    const updatedSlot = slotItems.filter((item) => item.computer !== pcname);
    setSlotItems(updatedSlot);
    localStorage.setItem("orderComputer", JSON.stringify(updatedSlot));
  };

  const handleQuantityChangeSlot = (pcname, newQuantity) => {
    const updatedSlot = slotItems.map((item) =>
      item.computer === pcname
        ? { ...item, playtime: parseInt(newQuantity) }
        : item
    );
    setSlotItems(updatedSlot);
    localStorage.setItem("orderComputer", JSON.stringify(updatedSlot));
  };

  // Calculate the total cost of items in the cart
  const calculateTotal = () => {
    const sumProduct = cartItems.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
    const sumSlot = slotItems.reduce(
      (total, item) => total + item.unit_price * item.playtime,
      0
    );
    return sumProduct + sumSlot;
  };

  return (
    <Fragment>
      <Navbar />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            justifyItems: "center",
          }}
        >
          <Typography
            variant="h4"
            align="left"
            style={{ marginTop: "20px" }}
            flexGrow={1}
          >
            Shopping Cart
          </Typography>
          <Typography
            variant="h5"
            align="center"
            style={{ marginTop: "20px", marginRight: "20px" }}
          >
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <Button
            style={{ marginTop: "16px", maxWidth: "120px", marginLeft: "auto" }}
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
              {slotItems.map((cartItem, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={cartItem.computer}
                      height="240"
                      image={
                        "https://thanhcongcomputer.vn/wp-content/uploads/2022/10/high-gaming-pc.jpg"
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {cartItem.computer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cartItem.room}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${cartItem.unit_price.toFixed(2)} x {cartItem.playtime}
                      </Typography>
                      <TextField
                        type="number"
                        label="Playtime"
                        inputProps={{ min: 1 }}
                        value={cartItem.playtime}
                        onChange={(e) =>
                          handleQuantityChangeSlot(
                            cartItem.computer,
                            e.target.value
                          )
                        }
                        fullWidth
                      />
                      <Button
                        onClick={() => handleRemoveFromSlot(cartItem.computer)}
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
               {roomItems.map((cartItem, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={cartItem.room}
                      height="240"
                      image={
                        "https://i.pinimg.com/736x/c2/4d/fa/c24dfaa601132af968087a4fd873d6ad.jpg"
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {cartItem.room}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cartItem.room}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${cartItem.unit_price.toFixed(2)} x {cartItem.quantity}
                      </Typography>
                      <TextField
                        type="number"
                        label="Playtime"
                        inputProps={{ min: 1 }}
                        value={cartItem.playtime}
                        
                        fullWidth
                      />
                      <Button
                        onClick={() => handleRemoveFromSlot(cartItem.computer)}
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
