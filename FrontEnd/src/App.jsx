import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from 'axios'; // ใช้ import แบบใหม่ 

function App() {
  const videoRef = useRef(null);
  const [countNumber, setCountNumber] = useState(0);
  const startCamera = async () => { 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  const captureFrame = async () => {
    // แก้ไขเป็น async function
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64String = canvas
      .toDataURL("image/jpeg")
      .replace("data:image/jpeg;base64,", "");
    console.log("Request to API: ",base64String)

    try {
      const response = await axios.post('http://127.0.0.1:3001/upload', {
        base64String
      });
      console.log('API Response:', response.data.countnumber);
      setCountNumber(response.data.countnumber);
    } catch (error) {
      console.error('Error sending base64 to API:', error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await startCamera();
  
      const captureInterval = setInterval(() => {
        console.log("captureFrame")
        captureFrame();
      }, 3000);
  
      return () => {
        clearInterval(captureInterval);
      };
    }
    fetchData();
  }, []);
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video><br />
      <h2>Count Number: {countNumber}</h2>
    </div>
  );
}

export default App;