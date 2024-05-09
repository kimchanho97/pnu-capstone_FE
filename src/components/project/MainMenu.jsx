import React from "react";
import { IoMdExit } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function MainMenu() {
  return (
    <div className=" w-full h-[50px] flex justify-end items-center pr-5">
      <div className=" flex gap-5">
        <Link className=" flex items-center" to={"/"} target="_blank">
          <FiHome />
          <span>Home</span>
        </Link>
        <Link className=" flex items-center" to={"/login"}>
          <IoMdExit />
          <span>LogOut</span>
        </Link>
      </div>
    </div>
  );
}
