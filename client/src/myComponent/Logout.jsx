import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ open, setOpen }) => {
    const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = ()=>{
    try {
        axios.post('/user/logout').then((res)=>{
            toast.success(res.data);
            navigate('/login');
        });
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle >
        <div className="text-red-600 font-bold">
        Logout page:
        </div>
        <hr className="border-black"/>
      </DialogTitle>
      <DialogContent className="text-lg font-semibold">
        Are you sure ou want to logout!
      </DialogContent>
      <DialogActions>
        <div className="w-full flex justify-center">
          <Button variant="contained" color="error" className="!w-3/6" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
