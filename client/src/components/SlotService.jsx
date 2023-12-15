import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
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

const roomWithComputers = [
  {
    id: 1,
    name: "Gaming Room 1",
    description: "A gaming room with high-performance computers.",
    image:
      "https://file.hstatic.net/200000536009/article/thiet_ke_chua_co_ten__15__85dd4fe0c8ee45dca39d23ea2f4ff879.png",
    price: 1.99,
    computers: [
      { id: 101, name: "PC-1", isAvailable: true },
      { id: 102, name: "PC-2", isAvailable: true },
      { id: 103, name: "PC-3", isAvailable: false },
      // Add more computers as needed
    ],
  },
  {
    id: 2,
    name: "Gaming Room 2",
    description: "Another gaming room with powerful gaming setups.",
    image:
      "https://cybercore.vn/wp-content/uploads/2020/09/thiet-ke-quan-game-cyber-gia-re-quan-3.png",
    price: 2.99,
    computers: [
      { id: 201, name: "PC-4", isAvailable: true },
      { id: 202, name: "PC-5", isAvailable: true },
      { id: 203, name: "PC-6", isAvailable: true },
      // Add more computers as needed
    ],
  },
  // Add more rooms with computers as needed
];

const ComputerOrderPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [playtime, setPlaytime] = useState("");
  const [roomWithComputers, setAvailableRooms] = useState([]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setSelectedComputer(null); // Reset selected computer when changing rooms
  };

  const handleComputerSelection = (computer) => {
    setSelectedComputer(computer);
  };

  const handlePlaytimeChange = (event) => {
    setPlaytime(event.target.value);
  };

  const handleOrderComputer = () => {
    // Add your logic to handle the computer reservation/order with playtime
    if (selectedRoom && selectedComputer && playtime.trim() !== "") {
      console.log(
        `Ordered ${selectedComputer.name} in ${selectedRoom.name} for ${playtime} hours`
      );
      const orderComputer = localStorage.getItem("orderComputer")
        ? JSON.parse(localStorage.getItem("orderComputer"))
        : [];
      //Handle if computer is in orderComputer
      let flag = false;
      for (let i = 0; i < orderComputer.length; i++) {
        if (
          orderComputer[i].room === selectedRoom.name &&
          orderComputer[i].computer === selectedComputer.name
        ) {
          orderComputer[i].playtime =
            parseInt(orderComputer[i].playtime) + parseInt(playtime);
          flag = true;
        }
      }
      if (!flag) {
        const order = {
          room: selectedRoom.name,
          computer: selectedComputer.name,
          playtime: parseInt(playtime),
          unit_price: selectedRoom.price,
        };
        orderComputer.push(order);
      }
      localStorage.setItem("orderComputer", JSON.stringify(orderComputer));
      setPlaytime("");
      // Add additional logic (e.g., API calls, updating state, etc.)
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/customer/login/?redirect=/customer/order-slot";
    }
    axios.get("http://localhost:5000/api/room/public-room")
    .then((res)=>{
      console.log(res.data)
      const availableRooms = []
      for (let i = 0; i < res.data.length; i++) {
        const obj ={
          id: i,
          name: res.data[i].description,
          description: res.data[i].description,
          image: "https://i.pinimg.com/originals/48/0e/8b/480e8b4bcb61706fad950f33e9e415e0.jpg",
          price: res.data[i].unit_price,
          isAvailable: res.data[i].available_slot_quantity > 0,
          computers: res.data[i].available_slot.map((slot,index) => {
            return {
              id: index,
              name: `PC - ${slot.slot_order} (${slot.room_type}- ${slot.room_order} - ${slot.slot_order})`,
              isAvailable: true,
            }
          }),
        }
        availableRooms.push(obj)
      }
      console.log(availableRooms)
      setAvailableRooms(availableRooms)
    })
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Order a Computer in a Gaming Room
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {roomWithComputers.map((room) => (
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
              Available Computers:
            </Typography>
            <Grid container spacing={2}>
              {selectedRoom.computers.map((computer) => (
                <Grid item key={computer.id} xs={6}>
                  <Button
                    onClick={() => handleComputerSelection(computer)}
                    color="primary"
                    variant={
                      selectedComputer === computer && computer.isAvailable
                        ? "contained"
                        : computer.isAvailable
                        ? "outlined"
                        : "disabled"
                    }
                    fullWidth
                  >
                    {computer.name}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {selectedComputer && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6">
                  Selected Computer: {selectedComputer.name}
                </Typography>
                <TextField
                  label="Playtime (hours)"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={playtime}
                  onChange={handlePlaytimeChange}
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
                <Button
                  onClick={handleOrderComputer}
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  disabled={
                    !selectedComputer.isAvailable || playtime.trim() === ""
                  }
                >
                  Order Computer
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default ComputerOrderPage;
