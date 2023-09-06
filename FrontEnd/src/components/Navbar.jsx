import React from "react";
import { AppBar, Toolbar, Typography, Button, colors } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "boxicons";
import "./History.css";
import guppyImage from "../assets/logofish.jpg";
const Navbar = ({ ButtonHome, ButtonHistory }) => {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";

  return (
    <AppBar position="static" color="primary" style={{ background: "#000000" }}>
      {/* <AppBar position="static" color="primary" style={{ background: '#1B2333' }}> */}
      <Toolbar>
      <img
            src={guppyImage}
            alt="Counting Guppy"
            style={{
              verticalAlign: "middle",
              marginRight: "50px",
              width: "60px",
              height: "60px",
            }}
          />
          <div style={{textAlign:"center",marginLeft:"auto",marginRight:"auto"}}>
        <Button
          variant="h6"
          color="inherit"
          style={{
            border: isHomeActive ? "2px solid rgb(102, 178, 255)" : "Black",
          }}
        >
          <Link
            className="navbar-link"
            to="/"
            style={{
              color: isHomeActive ? "rgb(102, 178, 255)" : "white",
              // borderBottom: isHomeActive? "2px solid rgb(102, 178, 255)":"Black",
              fontFamily:
                "Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
              fontSize: "16px",
              textDecoration: "none",
              // fontWeight: isHomeActive ? "bold" : "normal"
              fontWeight: "bold",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
            }}
            onClick={ButtonHome}
          >
            App
          </Link>
        </Button>
        <Button
          variant="h6"
          color="inherit"
          style={{
            border: isHistoryActive ? "2px solid rgb(102, 178, 255)" : "Black",
          }}
        >
          <Link
            className="navbar-link"
            to="/history"
            style={{
              color: isHistoryActive ? "rgb(102, 178, 255)" : "white",
              // borderBottom: isHistoryActive? "2px solid rgb(102, 178, 255)":"Black",
              fontFamily:
                "Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
              fontSize: "16px",
              textDecoration: "none",
              // fontWeight: isHistoryActive ? "bold" : "normal"
              fontWeight: "bold",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
            }}
            onClick={ButtonHistory}
          >
            History
          </Link>
        </Button>
        </div>
        {/* <Typography
          variant="h6"
          style={{
            flexGrow: 1,
            textAlign: "center",
            marginLeft: "-2.5%",
            fontFamily: "Times New Roman, Times, serif",
            // color: "var(--muidocs-palette-grey-50, #F3F6F9)"
            color: "RGB(22, 126, 198)",
          }}
        >
          Counting Guppy
          
        </Typography> */}
        <Button style={{ color: "white",textAlign:"center" }}>
          <box-icon
            name="trip-advisor"
            type="logo"
            flip="horizontal"
            color="#ffffff"
          ></box-icon>
          คู่มือการใช้งาน
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
