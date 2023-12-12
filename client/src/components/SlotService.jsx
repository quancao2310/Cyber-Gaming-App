import React, { useState } from "react";
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

const roomWithSlots = [
  {
    id: 1,
    name: "Conference Room",
    description: "A spacious conference room for meetings.",
    image: "path/to/conference-room-image.jpg",
    price: 199.99,
    slots: [
      { id: 101, time: "10:00 AM", isAvailable: true },
      { id: 102, time: "02:00 PM", isAvailable: true },
      { id: 103, time: "04:00 PM", isAvailable: false },
      // Add more slots as needed
    ],
  },
  {
    id: 2,
    name: "Event Hall",
    description: "A versatile event hall for various occasions.",
    image: "path/to/event-hall-image.jpg",
    price: 499.99,
    slots: [
      { id: 201, time: "11:00 AM", isAvailable: true },
      { id: 202, time: "03:00 PM", isAvailable: true },
      { id: 203, time: "05:00 PM", isAvailable: true },
      // Add more slots as needed
    ],
  },
  // Add more rooms with slots as needed
];

const SlotOrderRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setSelectedSlot(null); // Reset selected slot when changing rooms
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleOrderSlot = () => {
    // Add your logic to handle the slot reservation/order
    if (selectedRoom && selectedSlot) {
      console.log(`Ordered ${selectedSlot.time} in ${selectedRoom.name}`);
      // Add additional logic (e.g., API calls, updating state, etc.)
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Order a Slot in a Room
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {roomWithSlots.map((room) => (
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

            <Typography variant="h6" style={{ marginTop: "20px" }}>
              Available Slots:
            </Typography>
            <Grid container spacing={2}>
              {selectedRoom.slots.map((slot) => (
                <Grid item key={slot.id} xs={6}>
                  <Button
                    onClick={() => handleSlotSelection(slot)}
                    color="primary"
                    variant={
                      selectedSlot === slot && slot.isAvailable
                        ? "contained"
                        : slot.isAvailable
                        ? "outlined"
                        : "disabled"
                    }
                    fullWidth
                  >
                    {slot.time}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {selectedSlot && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6">
                  Selected Slot: {selectedSlot.time}
                </Typography>
                <Button
                  onClick={handleOrderSlot}
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  disabled={!selectedSlot.isAvailable}
                >
                  Order Slot
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default SlotOrderRoomPage;
