import React, { useLayoutEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";

const availableRooms = [
  {
    id: 3,
    name: "Couple Room",
    description: "A romantic room for couples.",
    image:
      "https://i.pinimg.com/originals/48/0e/8b/480e8b4bcb61706fad950f33e9e415e0.jpg",
    price: 199.99,
    isAvailable: false,
  },
  {
    id: 4,
    name: "Smoking Room",
    description: "A smoking room with a view.",
    image:
      "https://www.reviewjournal.com/wp-content/uploads/2022/08/16755189_web1_16755189-0c928ffac2a44c0c96a6947bf8443dbf.jpg?w=1067",
    price: 99.99,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Bida Room",
    description: "A room with a pool table.",
    image:
      "https://product.hstatic.net/1000028508/product/176430504_127772386049509_4380114269469069265_n_29b647272cde43818e060ff00d06d93a.jpg",
    price: 299.99,
    isAvailable: true,
  },
  // Add more room options as needed
];

const OrderRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/customer/login?redirect=/customer/order-room";
    }
  }, []);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleOrderRoom = () => {
    // Add your logic to handle the room reservation/order
    if (selectedRoom) {
      console.log(`Ordered ${selectedRoom.name}`);
      // Add additional logic (e.g., API calls, updating state, etc.)
    }
    const orderRoom = localStorage.getItem("orderRoom") ? JSON.parse(localStorage.getItem("orderRoom")) : [];
    let flag = false;
    for (let i = 0; i < orderRoom.length; i++) {
      if (orderRoom[i].room === selectedRoom.name) {
        orderRoom[i].quantity = parseInt(orderRoom[i].quantity) + 1;
        flag = true;
      }
    }
    if (!flag) {
      const order = {
        room: selectedRoom.name,
        quantity: 1,
        unit_price: selectedRoom.price,
      };
      orderRoom.push(order);
    }
    localStorage.setItem("orderRoom", JSON.stringify(orderRoom));
    setSelectedRoom(null);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Order a Room
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {availableRooms.map((room) => (
            <Grid item key={room.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={room.name}
                  height="240"
                  image={room.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${room.price.toFixed(2)}
                  </Typography>
                  <Button
                    onClick={() => handleRoomSelection(room)}
                    color="primary"
                    variant={selectedRoom === room ? "contained" : "outlined"}
                    fullWidth
                  >
                    {selectedRoom === room ? "Selected" : "Select Room"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedRoom && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h5">
              Selected Room: {selectedRoom.name}
            </Typography>
            <Typography variant="h6">
              Price: ${selectedRoom.price.toFixed(2)}
            </Typography>
            <Button
              onClick={handleOrderRoom}
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Order Room
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default OrderRoomPage;
