import { useState } from "react";

import "./App.css";
import Navbar from "./myComponent/Navbar";
import LandingPage from "./myComponent/LandingPage";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Register from "./page/Register";
import axios from "axios";
import Login from "./page/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditTask from "./myComponent/EditTask";

function App() {
  (axios.defaults.baseURL = "http://localhost:3000"),
    (axios.defaults.withCredentials = true);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path = "/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Edit/:id" element={<EditTask/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </div>
  );
}

export default App;