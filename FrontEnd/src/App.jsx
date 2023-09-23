import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios"; // ใช้ import แบบใหม่
import Navbar from "./components/Navbar";
import { Paper } from "@mui/material";
import DialogContact from "./components/DialogContact";
import DialogDetected from "./components/DialogDetected"

function App() {
  const videoRef = useRef(null);
  const [countNumber, setCountNumber] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      console.log("started camera");
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  const captureFrame = async () => {
    // แก้ไขเป็น async function
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64String = canvas
      .toDataURL("image/jpeg")
      .replace("data:image/jpeg;base64,", "");
    // console.log("Request to API: ", base64String);

    try {
      const response = await axios.post("http://103.114.203.159:3001/upload", {
        base64String,
      });
      console.log("API Response:", response.data.countnumber);
      setCountNumber(response.data.countnumber);
    } catch (error) {
      console.error("Error sending base64 to API:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await startCamera();
    }
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleHistoryClick = () => {
    setIsFetching(false); // หยุดการเรียก captureFrame เมื่อคลิกที่ "history"
    // myStop()
  };

  const handleHomeClick = () => {
    setIsFetching(true); // เริ่มการเรียก captureFrame เมื่อกลับมาที่ "home"
  };
  return (
    <>
      <div className="navbar-container">
        <Navbar
          ButtonHome={handleHomeClick}
          ButtonHistory={handleHistoryClick}
        />
      </div>
      <div className="PaperWrapper">
        <Paper
        elevation={5}
          sx={{ overflow: "hidden", borderRadius: "20px" }}
          className="CenterPaperApp"
        >
          {/* <p><h2>ภาพจากกล้อง</h2></p> */}
          <div className="video-container">
            <video ref={videoRef} autoPlay playsInline></video>
            <br />
            <div className="count-container">
              <h1 className="count-text">จำนวน: {countNumber} ตัว</h1>
            </div>
          </div>
        </Paper>
      </div>
      <div style={{position:"absolute",top: "86%",right: "1%"}}>
        <DialogDetected/>
      </div>
      <div style={{position:"absolute",top: "92%",right: "1%"}}>
        <DialogContact/>
      </div>

      
    </>
  );
}

export default App;
