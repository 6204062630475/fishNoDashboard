import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{borderRadius: "20px"}}>
        คู่มือการใช้งาน
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xl'
      >
        <DialogTitle id="alert-dialog-title">
          {"คู่มือการใช้งานเว็บแอพพลิเคชั่น"}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
           <img src="./guide/guide.jpg" alt="guild" width={'100%'}/>
           {/* <img src="guide1.jpg" alt="guild" width={'100%'}/> */}
           {/* <img src="./guide/guide2.jpg" alt="guild" width={'100%'}/> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            เข้าใจแล้ว
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
