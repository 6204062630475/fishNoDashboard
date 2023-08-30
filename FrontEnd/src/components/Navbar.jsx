import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "boxicons";

const Navbar = ({ ButtonHome, ButtonHistory }) => {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";

  return (
    <AppBar position="static" color="primary" style={{ background: '#1B2333' }}>
      <Toolbar>
        <Button variant="h6" color="inherit">
          <Link
            to="/"
            style={{
              color: "white",
              fontFamily: "Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
              fontSize: "16px",
              textDecoration: "none",
              fontWeight: isHomeActive ? "bold" : "normal"
            }}
            onClick={ButtonHome}
          >
            App
          </Link>
        </Button>
        <Button variant="h6" color="inherit">
          <Link
            to="/history"
            style={{
              color: "white",
              fontFamily: "Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
              fontSize: "16px",
              textDecoration: "none",
              fontWeight: isHistoryActive ? "bold" : "normal"
            }}
            onClick={ButtonHistory}
          >
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
