import React from "react";
import { Link } from "react-router-dom";

export default function GNB() {
  return (
    <div className=" border-b p-5 flex justify-between h-[70px] px-16">
      <Link className=" tracking-wider" to={"/"}>
        pitapat
      </Link>
      <div className=" text-sm flex gap-5 items-center font-medium">
        <Link to={"/login"}>로그인</Link>
        <Link to={"/create"} className=" bg-black text-white p-1 px-2 rounded">
          시작하기
        </Link>
      </div>
    </div>
  );
}
