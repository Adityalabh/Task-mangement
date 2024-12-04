import { useState } from "react";

import "./App.css";
import Navbar from "./myComponent/Navbar";
import LandingPage from "./myComponent/LandingPage";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditTask from "./myComponent/EditTask";

function App() {
  (axios.defaults.baseURL = "https://task-mangement-m00d.onrender.com"),
    (axios.defaults.withCredentials = true);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/Edit/:id" element={<EditTask/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </div>
  );
}

export default App;
