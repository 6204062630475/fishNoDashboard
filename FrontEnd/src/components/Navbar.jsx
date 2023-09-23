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
// import Dialog from "./Dialog";

const Navbar = ({ ButtonHome, ButtonHistory }) => {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";

  return (
    <AppBar position="static" color="primary" style={{ background: "white" }}>
      <Toolbar>
        <img
          src={guppyImage}
          alt="Counting Guppy"
          style={{
            verticalAlign: "middle",
            width: "auto",
            height: "64px",
            position: "absolute"
          }}
        />
        <div className="CenterAppbar">
          <div className="CenterNav-Container">
            <Button 
              variant="h6"
              style={{
                backgroundColor: isHomeActive ? "white":"#e5e5e5",
                // border: isHomeActive ? "2px solid #00aa9f" : "",
                borderRadius: "10px",
                // boxShadow: "0 8px 10px 0 rgba(0,0,0,0.2)"
              }}
              startIcon={<box-icon name='home' type='solid' color={isHomeActive ? '#00aa9f' : 'gray'}></box-icon>}
            >
              <Link
                className="navbar-link"
                to="/"
                style={{ color: isHomeActive ? "Black":"gray" }}
                onClick={ButtonHome}
              >
                หน้าแรก
              </Link>
            </Button>
            <Button
              variant="h6"
              style={{
                backgroundColor: isHistoryActive ? "white":"#e5e5e5",
                // border: isHistoryActive ? "2px solid #00aa9f" : "",
                borderRadius: "10px"
              }}
              startIcon={<box-icon name='history' color={isHistoryActive ? '#00aa9f' : 'gray'}></box-icon>}
            >
              <Link
                className="navbar-link"
                to="/history"
                style={{ color: isHistoryActive ?  "Black":"gray" }}
                onClick={ButtonHistory}
              >
                ประวัติการนับ
              </Link>
            </Button>
          </div>
        </div>
        {/* คู่มือการใช้งาน */}
        {/* <Dialog /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
