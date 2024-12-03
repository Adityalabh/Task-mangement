import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTaskRefresh } from "../redux/taskSlice";
import { toast } from "react-toastify";

const CreateTask = ({open ,setOpen}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading ,setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = ()=>{
    setOpen(false);
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Task Data:", formData);
    toast.success("Task submitted successfully!");
    setFormData({ title: "", description: "", dueDate: "" }); // Clear the form after submission
    try {
        const res = await axios.post('/task/addTask',formData);
        console.log(res.data);
        dispatch(setTaskRefresh());
        handleClose();

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
          <div className="rounded-lg p-6">
            <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
              Add a New Task
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-purple-600 font-semibold mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-purple-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-purple-600 font-semibold mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter task description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-purple-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-purple-600 font-semibold mb-1"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full border border-purple-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition duration-300"
              >
                Submit Task
              </button>
            </form>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
