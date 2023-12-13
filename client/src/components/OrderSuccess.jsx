import React, { useLayoutEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  CardMedia,
  Card,
} from "@mui/material";
import Navbar from "./Navbar";

const OrderSuccessPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  useLayoutEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/customer/login?redirect=/customer";
    }
    if (!localStorage.getItem("totalPrice")) {
      window.location.href = "/customer";
    }
    if (localStorage.getItem("totalPrice") === "0") {
      window.location.href = "/customer";
    }
    const totalPrice = localStorage.getItem("totalPrice")
      ? parseFloat(localStorage.getItem("totalPrice"))
      : 0;
    setTotalPrice(totalPrice);
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Order Successfully!
        </Typography>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "20px" }}
        >
          Thank you for your order! Your order will be directed to our staff to
          prepare. Have a nice day!
        </Typography>
        <Card
          style={{
            maxWidth: "360px",
            maxHeight: "40vh",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <CardMedia
            component="img"
            alt={"Preparing your order"}
            height="100%"
            image={
              "https://media1.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif"
            }
          />
        </Card>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            // Redirect to home page or other relevant pages
            localStorage.removeItem("totalPrice");
            window.location.href = "/customer";
          }}
        >
          Continue Shopping
        </Button>
      </Container>
    </>
  );
};

export default OrderSuccessPage;
