import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskDescription from "./TaskDescription";
import EditTask from "./EditTask";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setTaskRefresh } from "../redux/taskSlice";

const Task = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/task/deleteTask/${id}`);
      console.log(res);
      toast.success("Task Deleted");
      dispatch(setTaskRefresh());
    } catch (error) {
      toast.error(error);
    }
  };

  // Determine the current status based on `dueDate` and `status`
  const determineStatusIcon = () => {
    const currentDate = new Date();
    const dueDate = new Date(task?.dueDate);

    if (task?.status === "completed") {
      return <i className="fa-solid fa-check text-green-500"></i>;
    } else if (dueDate < currentDate) {
      return <i className="fa-solid fa-triangle-exclamation text-red-500"></i>;
    } else {
      return <i className="fa-solid fa-clock text-yellow-500"></i>;
    }
  };

  if (showDialog) {
    return (
      <div>
        {showDialog && (
          <div className="z-50 fixed min-h-screen w-full ">
              <div className="-ml-[140px] lg:-ml-24 z-50 fixed flex justify-center top-32 shadow-2xl">
                <div className="flex flex-col gap-2 h-[230px] w-[300px] p-4 bg-white  rounded-2xl border border-black">
                  <h1 className="text-2xl font-bold">
                    Delete
                  </h1>
                  <p className="font-semibold">
                    Are you sure you want to delete this task
                  </p>
                  <button
                    className="px-7 py-2 rounded-full bg-red-600 text-white font-bold hover:scale-105"
                    onClick={() => setShowDialog(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="px-7 py-2 rounded-full bg-red-600 text-white font-bold hover:scale-105"
                    onClick={() => {
                     handleDelete(task?._id)
                      setShowDialog(false);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white font-mono text-xl w-full m-2 p-3 rounded-[1rem] flex justify-between shadow-white shadow-md border-purple-400 border-2 hover:scale-105">
      <div className="w-[70%] cursor-pointer " onClick={() => setOpen(true)}>
        <p>{task?.title[0].toUpperCase() + task?.title.slice(1)}</p>
      </div>
      {open === true && <TaskDescription open={open} setOpen={setOpen} task={task} />}
      {/* Action */}
      <div className="flex items-center gap-3">
        {determineStatusIcon()}
        <i
          className="fa-solid fa-trash text-red-400 cursor-pointer hover:text-red-600"
          onClick={() => setShowDialog(true)}
        ></i>
        <Link to={`/Edit/${task?._id}`}>
          <i className="fa-solid fa-pen text-blue-400 cursor-pointer hover:text-blue-700"></i>
        </Link>
      </div>
    </div>
  );
};

export default Task;
