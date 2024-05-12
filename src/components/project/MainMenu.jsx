import React from "react";
import { FiHome } from "react-icons/fi";
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function MainMenu() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className=" w-full h-[50px] flex justify-end items-center pr-5">
      <div className=" flex gap-5">
        <Link className=" flex items-center" to={"/"} target="_blank">
          <FiHome />
          <span>Home</span>
        </Link>
        <button className=" flex items-center" onClick={handleLogout}>
          <IoMdExit />
          <span>LogOut</span>
        </button>
      </div>
    </div>
  );
}
