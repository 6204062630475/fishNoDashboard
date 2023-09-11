import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  colors,
  Avatar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "boxicons";
import "./History.css";
import guppyImage from "../assets/logofish.jpg";
import Dialog from "./Dialog";

const Navbar = ({ ButtonHome, ButtonHistory }) => {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";

  return (
    <AppBar position="static" color="primary" style={{ background: "white" }}>
      {/* <AppBar position="static" color="primary" style={{ background: '#1B2333' }}> */}
      <Toolbar>
        <img
          src={guppyImage}
          alt="Counting Guppy"
          style={{
            verticalAlign: "middle",
            width: "auto",
            height: "70px",
          }}
        />
        <div
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            variant="h6"
            color="inherit"
            style={{
              border: isHomeActive ? "2px solid #00aa9f" : "Black",
              borderRadius: "20px",
            }}
          >
            <Link
              className="navbar-link"
              to="/"
              style={{
                color: isHomeActive ? "#00aa9f" : "Black",
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
              หน้าแรก
            </Link>
          </Button>
          <Button
            variant="h6"
            color="inherit"
            style={{
              border: isHistoryActive ? "2px solid #00aa9f" : "Black",
              borderRadius: "20px",
            }}
          >
            <Link
              className="navbar-link"
              to="/history"
              style={{
                color: isHistoryActive ? "#00aa9f" : "Black",
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
              ประวัติการนับ
            </Link>
          </Button>
        </div>

        {/* <Button
          style={{ color: "black", textAlign: "center", marginLeft:"5%"}}
          sx={{ borderRadius: "20px" }}
          href="readme.pdf" target="_blank"
        > 
          <box-icon name='download' type='solid' color='#00aa9f' />
          <p style={{ fontSize: "15.5px", fontWeight: "bold", color: "#5A5A5A" }}>
            คู่มือการใช้งาน
          </p>
        </Button> */}
        <Dialog/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
