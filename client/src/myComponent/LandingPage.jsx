import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useGetTask } from "../CustomHook/useGetTask";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CreateTask from "./CreateTask";
import { getTaskTitle } from "../redux/taskSlice";

const LandingPage = () => {
  const { allTask,srchTaskBytitle } = useSelector((store) => store.task);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [open ,setOpen] = useState(false);
  const [taskTitle ,setTaskTitle] = useState();
  const [filteredTask ,setfilteredTask] = useState();
  console.log(allTask, allTask.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  }, []);

  useGetTask();

  useEffect(()=>{
    dispatch(getTaskTitle(taskTitle))
  },[taskTitle]);

  useEffect(()=>{
    if(allTask.length > 0 ){
      const filterTask = allTask.filter((task)=>{
        if(!srchTaskBytitle){
          return true;
        }
        return task?.title.toLowerCase().includes(srchTaskBytitle.toLowerCase());
      })
      setfilteredTask(filterTask);
    }
    else{
      setfilteredTask([]);
    }
  },[allTask,srchTaskBytitle]);

  return (
    <div className="bg-purple-400 -mb-7">
      <div className="top-0 sticky">
        <Navbar />
      </div>
      {/* body */}
      <div className="min-h-screen bg-purple-400">
        <div className="text-white font-bold text-2xl my-4 mt-12 px-7 font-mono">
          Manage
          <h1 className="text-blue-700">All Your Neccessary Tasks....</h1>
        </div>

        <div className="flex items-center justify-center my-7">
          <input
            className="w-3/6 p-2 rounded-[1rem] m-4 outline-none border-purple-600 border-2"
            placeholder="Search Task by title..."
            onChange={(e)=>setTaskTitle(e.target.value)}
          />
          <Button variant="contained" className="!py-3 " onClick={()=>setOpen(true)}>
            <i className="fa-solid fa-plus">New Task</i>
          </Button>
        </div>
        {open == true && (<CreateTask open={open} setOpen={setOpen} />)}

        <div>{filteredTask?.length === 0 && <div className="text-xl text-white flex justify-center items-center">no tasks</div>}</div>
        <div className="flex flex-col items-center w-full">
          {filteredTask?.length > 0 &&
            filteredTask.map((task, index) => (
              <div className="w-5/6 flex justify-center" key={index}>
                <Task task={task} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
