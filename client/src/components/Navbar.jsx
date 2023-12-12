import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  // You can add the onClick handlers for the buttons

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    window.location.href = "/customer/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CyberGaming
        </Typography>
        {login ? (
          <div>
            <IconButton color="inherit" aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>
            <Button color="inherit">Cart</Button>
            <IconButton color="inherit" aria-label="profile">
              <AccountCircleIcon />
            </IconButton>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">Deposit</Button>

            <Button
              color="inherit"
              style={{ color: "white" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <IconButton color="inherit" aria-label="profile">
              <AccountCircleIcon />
            </IconButton>
            <Link to="/customer/login">
              {" "}
              <Button color="inherit" style={{ color: "white" }}>
                Login
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
