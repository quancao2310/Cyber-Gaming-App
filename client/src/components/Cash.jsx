import React, { useLayoutEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Navbar from './Navbar';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    // Add your deposit logic here
    console.log('Amount:', amount);
    console.log('Payment Method:', paymentMethod);
    // You can make API calls or update the state accordingly
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/customer/login';
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Deposit Money
          </Typography>
          <form onSubmit={handleDeposit} style={{ width: '100%', marginTop: '16px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <FormControl variant="outlined" fullWidth margin="normal" required>
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                id="payment-method"
                label="Payment Method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                {/* Add more payment methods as needed */}
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>
              Deposit
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default DepositPage;
