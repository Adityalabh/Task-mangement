import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import Logout from "./Logout";


const Navbar = () => {
  const {user} = useSelector((store)=>store.user);
  const [open ,setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center px-4 shadow-lg text-white font-mono py-3 bg-purple-400">
        <h1 className="font-semibold text-xl  ">
          Task <span className="font-bold "> Management</span>
        </h1>
        <div className="flex items-center gap-2">
          <Avatar
            alt="Remy Sharp"
            src="https://th.bing.com/th/id/OIP.3U017h9GAnFM3aRkV-WLiwHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            sx={{ width: 45, height: 45 }}
            onClick={()=>setOpen(true)}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold">{user?.userName}</h2>

        </div>
        {open && (<Logout open={open} setOpen={setOpen}/>)}
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
