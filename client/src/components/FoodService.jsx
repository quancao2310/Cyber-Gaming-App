import React, { Fragment, useState,useLayoutEffect } from "react";
import axios from 'axios';
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

const FoodOrderPage = () => {

  const [foodItems, setFoodItems] = useState([]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/customer/login?redirect=/customer/food-order";
    }

    axios.get('http://localhost:5000/api/product')
    .then((res)=>{
      setFoodItems(res.data);
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, []);
  // Mock data for food items (replace this with your actual data)
  const f = [
    {
      id: 1,
      name: "Burger",
      description: "Delicious burger with fries",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 7.99,
    },
    {
      id: 2,
      name: "Pizza",
      description: "Classic pizza with your favorite toppings",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 12.99,
    },
    {
      id: 3,
      name: "Salad",
      description: "Fresh and healthy salad",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 6.99,
    },
    {
      id: 4,
      name: "Sushi",
      description: "Assorted sushi rolls",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 14.99,
    },
    {
      id: 5,
      name: "Pasta",
      description: "Homemade pasta with tomato sauce",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 9.99,
    },
    {
      id: 6,
      name: "Steak",
      description: "Juicy steak with roasted vegetables",
      image:
        "https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg",
      price: 18.99,
    },
    // Add more food items as needed
  ];

  const [quantities, setQuantities] = useState({});

  // Function to handle quantity change
  const handleQuantityChange = (foodItemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [foodItemId]: quantity,
    }));
  };

  // Function to handle food item selection
  const handleFoodItemClick = (foodItem) => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/customer/login";
    }
    // Access the quantity for the selected food item from state
    const quantity = quantities[foodItem.id] || 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [foodItem.id]: 0,
    }));
    const order = localStorage.getItem("order") || "[]";
    const orderList = JSON.parse(order);
    //Check if the food item is already in the order list
    const index = orderList.findIndex(
      (item) => item.foodItem.id === foodItem.id
    );
    if (index !== -1) {
      // If the food item is already in the order list, update the quantity
      const newQuantity =
        parseInt(orderList[index].quantity) + parseInt(quantity);
      orderList[index].quantity = newQuantity;
    } else {
      // If the food item is not in the order list, add it to the order list
      orderList.push({ foodItem, quantity: parseInt(quantity) });
    }
    localStorage.setItem("order", JSON.stringify(orderList));
    // Add your logic to handle the selected food item and quantity
    console.log("Selected Food Item:", foodItem);
    console.log("Quantity:", quantity);
  };

  return (
    <Fragment>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Order Food
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {foodItems.map((foodItem) => (
            <Grid item key={foodItem.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={foodItem.name}
                  height="240"
                  image={foodItem.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {foodItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {foodItem.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${foodItem.price.toFixed(2)}
                  </Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    inputProps={{ min: 1 }}
                    onChange={(e) =>
                      handleQuantityChange(foodItem.id, e.target.value)
                    }
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    value={quantities[foodItem.id] || ""}
                    fullWidth
                  />
                  <Button
                    onClick={() => handleFoodItemClick(foodItem)}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default FoodOrderPage;
