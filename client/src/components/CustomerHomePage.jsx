import React, { Fragment } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";

const HomeCustomerPage = () => {
  // You can add onClick handlers for each service button

  return (
    <Fragment>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Welcome to Our Services
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginTop: "40px" }}
        >
          <Grid item xs={12} sm={4}>
            <img
              src="/images/food.webp"
              alt="Order Food"
              style={{ width: "100%", borderRadius: "8px", height: "256px", marginBottom: "16px" }}
            />
            <Button variant="contained" color="primary" fullWidth size="large">
              Order Food
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src="/images/cyber-gaming.jpg"
              alt="Order Room"
              style={{ width: "100%", borderRadius: "8px", height: "256px", marginBottom: "16px" }}
            />
            <Button variant="contained" color="primary" fullWidth size="large">
              Order Room
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src="/images/gaming.webp"
              alt="Order Slot"
              style={{ width: "100%", borderRadius: "8px", height: "256px", marginBottom: "16px" }}
            />
            <Button variant="contained" color="primary" fullWidth size="large">
              Order Slot
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeCustomerPage;
