import React from "react";
import { Link } from "react-router-dom";
import IconGroup from "../components/IconGroup";

export default function MainPage() {
  return (
    <div
      className=" w-full flex p-40 items-center flex-col tracking-tight text-3xl font-semibold gap-10 rounded-[50px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, 
          rgba(191, 219, 254, 0.1),
          rgba(250, 172, 168, 0.1), 
          rgba(255, 255, 189, 0.1))
        `,
        height: "calc(100vh - 100px)",
      }}
    >
      <div className=" flex flex-col items-center">
        <p>복잡한 클라우드 설정 없이</p>
        <p>10분 만에 서비스를 배포하고 운영하세요</p>
      </div>
      <p className=" text-base">어떤 언어든 프레임웍이든 코드만 준비하세요.</p>
      <Link
        to={"/create"}
        className=" bg-black text-white p-2 px-4 rounded text-sm"
      >
        템플릿으로 시작하기
      </Link>
      <IconGroup />
    </div>
  );
}
