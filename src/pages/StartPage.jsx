import React from "react";
import { templateIcons } from "../utils/constant";

export default function StartPage() {
  return (
    <div className=" pt-20 px-5 ">
      <div className=" flex flex-col gap-3">
        <h1 className=" font-semibold text-[40px]">템플릿으로 시작하기</h1>
        <h2>예제 템플릿으로 지금 바로 시작해보세요.</h2>
        <div className=" grid grid-cols-3 gap-5 mt-14">
          {templateIcons.map(({ Icon, title, subtitle }) => (
            <div className=" flex flex-col justify-between border rounded-xl shadow-md p-5 h-[200px]">
              <div className=" flex gap-2">
                <Icon className=" w-10 h-10" />
                <div className=" flex flex-col text-sm">
                  <span className=" font-semibold">{title}</span>
                  <span>{subtitle}</span>
                </div>
              </div>
              <div className=" flex justify-end">
                <button className=" bg-zinc-200 rounded-md p-2 w-20 text-sm ">
                  배포하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" h-[100px]" />
    </div>
  );
}
