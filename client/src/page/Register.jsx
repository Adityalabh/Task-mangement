import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const customStyl = {
    labelInp: "py-2 text-purple-700 font-semibold ",
    textInp:
      "w-full rounded-[1rem] border-purple-600  border-[1.3px] p-1 lg:p-2 mb-1 outline-none px-2",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //   console.log(formData);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("/user/register", formData);
      //   console.log(result.res);
      //   toast.success('user registered');
      toast.success("signup Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || 'user not registered');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-purple-300">
        <div className="flex flex-col w-4/6 lg:w-3/6 px-1 lg:px-3  shadow-gray-600 shadow-xl  p-4 rounded-[1rem]  bg-white">
          <h1 className="text-center lg:text-2xl font-semibold text-purple-700 ">
            Register
          </h1>
          <form className="flex flex-col px-4" onSubmit={handleForm}>
            <label className={customStyl.labelInp}>Fullname</label>
            <input
              placeholder="Enter username"
              className={customStyl.textInp}
              id="name"
              value={formData.name}
              onChange={handleFormData}
              required
            />
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
            <label className={customStyl.labelInp}>Password</label>
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
                {loading === true ? <CircularProgress /> : "Register"}
              </Button>
            </div>
          </form>
          <div className="flex justify-center text-gray-400">
            Already registered
            <Link
              to={"/login"}
              className="underline mx-1 text-purple-400 cursor-pointer font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
