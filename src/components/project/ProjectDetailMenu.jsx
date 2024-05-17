import cn from "classnames";
import React from "react";

export default function ProjectDetailMenu({
  selectedDetailOption,
  setSelectedDetailOption,
}) {
  return (
    <div className=" flex py-10">
      <button className={cn(" px-10 border-r-2 border-zinc-300")}>
        <div
          className={cn(" py-1 border-black", {
            "border-b": selectedDetailOption === "배포 내역",
          })}
          onClick={() => setSelectedDetailOption("배포 내역")}
        >
          배포 내역
        </div>
      </button>
      <button className={cn(" px-10 border-r-2 border-zinc-300")}>
        <div
          className={cn(" py-1 border-black ", {
            "border-b": selectedDetailOption === "연결 정보",
          })}
          onClick={() => setSelectedDetailOption("연결 정보")}
        >
          연결 정보
        </div>
      </button>
      <button className={cn(" px-10")}>
        <div
          className={cn(" py-1 border-black", {
            "border-b": selectedDetailOption === "환경 설정",
          })}
          onClick={() => setSelectedDetailOption("환경 설정")}
        >
          횐경 설정
        </div>
      </button>
    </div>
  );
}
