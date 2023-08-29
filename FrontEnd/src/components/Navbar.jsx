import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "boxicons";
// Navbar.js
const Navbar = ({ ButtonHome, ButtonHistory }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button variant="h6" color="inherit">
          {/* <box-icon name='home' color="#eeeeee" ></box-icon> */}
          <Link to="/" color="white" onClick={ButtonHome}>
            App
          </Link>
        </Button>
        <Button variant="h6" color="inherit">
          {/* <box-icon name='history' color="#eeeeee" ></box-icon> */}
          <Link to="/history" onClick={ButtonHistory}>
            History
          </Link>
        </Button>
        <Typography
          variant="h6"
          style={{
            flexGrow: 1,
            textAlign: "center",
            marginLeft: "-12%",
            fontFamily: "Times New Roman, Times, serif"
          }}
        >
          Counting Guppy
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

