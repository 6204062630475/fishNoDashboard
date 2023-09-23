import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [base64String, setBase64String] = useState(""); // เพิ่ม state สำหรับเก็บ base64String
  const [imageSrc, setImageSrc] = useState(""); // เพิ่ม state สำหรับเก็บ URL ของภาพ

  const handleClickOpen = () => {
    setOpen(true);
    axios.get("http://103.114.203.159:3001/get-img").then((response) => {
      // ตัวอย่างข้อมูล
      const base64String = response.data;
      setBase64String(base64String);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (base64String) {
      // แปลง base64String เป็น URL ของรูปภาพ
      const imageUrl = `data:image/jpeg;base64,${base64String}`;
      setImageSrc(imageUrl);
    }
  }, [base64String]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#00aa9f",
          "&:hover": {
            backgroundColor: "#00aa9f",
          },
        }}
        endIcon={<box-icon name='image' color='white' ></box-icon>}
      >
        ภาพล่าสุด
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          {"ภาพที่ได้จากการนับครั้งล่าสุด"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {imageSrc && <img src={imageSrc} alt="captured" width={'100%'} />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ปิด
          </Button>
          <Button color="success" onClick={handleClickOpen} autoFocus>
            รีเฟรช
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
