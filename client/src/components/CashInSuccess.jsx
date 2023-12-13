import React from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import Navbar from "./Navbar";

const DepositSuccessPage = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const amount = new URLSearchParams(window.location.search).get("amount");
  const depositDetails = {
    amount: parseFloat(amount),
    transactionId: "1234567890",
    depositDate: `${day}-${month}-${year}`,
  };
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Deposit Successful!
        </Typography>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Deposit Summary:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Amount Deposited: ${depositDetails.amount.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Transaction ID: {depositDetails.transactionId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Deposit Date: {depositDetails.depositDate}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "20px" }}
        >
          Thank you for your deposit! Your transaction was successful.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            // Redirect to home page or other relevant pages
            window.location.href = "/customer";
          }}
        >
          Continue
        </Button>
      </Container>
    </>
  );
};

export default DepositSuccessPage;
