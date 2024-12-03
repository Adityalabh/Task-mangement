import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setTaskRefresh } from "../redux/taskSlice";
import { toast } from "react-toastify";

const EditTask = () => {
  const [task, setTask] = useState(null); // Task fetched from API
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const param = useParams();
  const taskId = param.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch the task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/task/taskById/${taskId}`);
        setTask(res.data); // Update the task state
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  // Update formData when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "", // Format date to YYYY-MM-DD
      });
    }
  }, [task]); // Dependency on `task`

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Updated Task Data:", formData);
    // Submit logic here (e.g., axios.put to update the task)
    try {
        const res = await axios.put(`/task/editTask/${taskId}`,formData);
        toast.success('Task Edited');
        dispatch(setTaskRefresh());
        console.log(res.data);
        navigate("/");
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="rounded-lg p-6">
          <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
            Edit Task
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
                value={formData?.dueDate}
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
      </div>
    </div>
  );
};

export default EditTask;
