import React, { useState, useEffect } from "react";
import MainMenu from "./MainMenu";
import axios from "axios";

export default function MainSection() {
  const [string, setString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080");
        setString(response.data.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" h-full">
      <MainMenu />
      <div
        className=" bg-zinc-100 w-full"
        style={{ height: `calc(100vh - 50px)`, width: `calc(100vw - 300px)` }}
      >
        <div className=" p-10">
          <div className=" text-2xl font-bold">프로젝트</div>
          <div className=" pt-5 text-zinc-500">프로젝트를 선택하세요</div>
          <div className=" border-t mt-5 grid grid-cols-3 pt-5">
            <div className=" w-[300px] h-[150px] bg-white rounded-lg">
              hello
            </div>
            <div>hello</div>
            <div>hello</div>
            <div className=" font-semibold text-lg">
              <span>로컬호스트 요청: </span>
              <span>{string}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
