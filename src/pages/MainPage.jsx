import React from "react";
import { Link } from "react-router-dom";
import IconGroup from "../components/main/IconGroup";

export default function MainPage() {
  return (
    <div
      className=" w-full flex p-40 items-center flex-col tracking-tight text-3xl font-semibold gap-10"
      style={{
        backgroundImage: `
            linear-gradient(127deg, rgba(255,0,0,.06), rgba(255,0,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,255,0,.06), rgba(0,255,0,0) 70.71%),
            linear-gradient(217deg, rgba(0,0,255,.06), rgba(0,0,255,0) 70.71%)
        `,
        height: "calc(100vh - 100px)",
      }}
    >
      <div className=" flex flex-col items-center">
        <h1>클라우드 배포의 새로운 경험</h1>
      </div>
      <div className=" text-base font-normal flex flex-col items-center">
        <h2>배포부터 운영까지,</h2>
        <h2>모든 단계를 간소화하여 개발자의 작업 효율을 최적화합니다</h2>
      </div>
      <Link
        to={"/create"}
        className=" bg-black text-white p-2 px-6 rounded-lg text-sm"
      >
        템플릿으로 시작하기
      </Link>
      <IconGroup />
    </div>
  );
}
