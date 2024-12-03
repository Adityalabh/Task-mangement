import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";


const Login = () => {
  const customStyl = {
    labelInp: "py-2 text-purple-700 font-semibold ",
    textInp:
      "w-full rounded-[1rem] border-purple-600  border-[1.3px] p-1 lg:p-2 mb-1 outline-none px-2",
  };
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("/user/login", formData);
      toast.success('logged in');
    //   console.log(result.data);
      dispatch(getUser(result.data));
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("User not logged in");
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-purple-300">
        <div className="flex flex-col w-4/6 lg:w-3/6 px-1 lg:px-3  shadow-gray-600 shadow-xl  p-4 rounded-[1rem]  bg-white">
          <h1 className="text-center lg:text-2xl font-semibold text-purple-700 ">
            Login
          </h1>
          <form className="flex flex-col px-4" onSubmit={handleForm}>
            <label className={customStyl.labelInp}>Email</label>
            <input
              placeholder="Enter email"
              className={customStyl.textInp}
              type="email"
              id="email"
              value={formData.email}
              onChange={handleFormData}
              required
            />
            <label className={customStyl.labelInp} >Password</label>
            <input
              placeholder="Enter Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleFormData}
              className={customStyl.textInp}
            />
            <div className="py-3 w-full">
              <Button
                variant="contained !bg-purple-600 !text-white !font-bold w-full hover:shadow-lg !rounded-[1rem] transform 
                   hover:!bg-purple-700 transition duration-300"
                   type="submit"
              >
                {loading === true ? <CircularProgress/> : 'Login'}
              </Button>
            </div>
          </form>
          <div className="flex justify-center text-gray-400">
            Not registered yet!
            <Link
              to={"/register"}
              className="underline mx-1 text-purple-400 cursor-pointer font-semibold"
            >
              register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
