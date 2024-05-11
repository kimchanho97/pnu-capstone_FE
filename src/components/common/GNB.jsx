import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function GNB() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const handleStartButton = () => {
    if (path === "/create") {
      navigate("/login");
      return;
    }
    navigate("/create");
  };

  return (
    <div className=" border-b p-5 flex justify-between h-[70px] px-16">
      <Link className=" tracking-wider" to={"/"}>
        pitapat
      </Link>
      <div className=" text-sm flex gap-5 items-center font-medium">
        <Link to={"/login"}>로그인</Link>
        <button
          className=" bg-black text-white p-1 px-2 rounded"
          onClick={handleStartButton}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
