import { Button, DialogActions, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setTaskRefresh } from "../redux/taskSlice";

const TaskDescription = ({ task, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false); // Close the dialog when clicking outside or pressing "Esc"
  };

  const dispatch = useDispatch();
  

  const handletTaskComplete = async () => {
    try {
      await axios.post(`/task/statusUpdate/${task?._id}`);
      toast.success("Task completed");
      dispatch(setTaskRefresh());
      handleClose();
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} className="min-h-[300px]">
      <DialogTitle>Description</DialogTitle>
      <hr className="border-black -mt-4" />
      <DialogContent className="lg:min-h-[200px] min-w-[300px]">
        <p className="text-gray-400">Your detailed task description:</p>
        <p className="font-semibold text-lg">{task?.description}</p>
        <p className="font-semibold text-lg">Due Date:{task?.dueDate.slice(0,10)}</p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handletTaskComplete} className="!bg-purple-400">
          Mark completed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDescription;
