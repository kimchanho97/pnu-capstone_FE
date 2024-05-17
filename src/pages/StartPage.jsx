import cn from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { templateIcons } from "../utils/constant";

export default function StartPage() {
  const [option, setOption] = useState("all");
  const linkGithubRepo = (name) => {
    window.open(`
    https://github.com/PNU-Capstone-4/${name}`);
  };

  return (
    <>
      <div
        className=" py-28 px-24 "
        style={{
          backgroundImage: `
          linear-gradient(127deg, rgba(255,0,0,.06), rgba(255,0,0,0) 70.71%),
          linear-gradient(336deg, rgba(0,255,0,.06), rgba(0,255,0,0) 70.71%),
          linear-gradient(217deg, rgba(0,0,255,.06), rgba(0,0,255,0) 70.71%)
      `,
        }}
      >
        <div className=" flex flex-col gap-3">
          <h1 className=" font-semibold text-[40px]">템플릿으로 시작하기</h1>
          <h2>예제 템플릿으로 지금 바로 시작해보세요.</h2>
        </div>
      </div>
      <div className=" px-24 mb-[150px] mt-[20px]">
        <div className=" flex w-full gap-[100px]">
          <div className=" text-[32px] w-[200px] flex flex-col text-zinc-500 items-end">
            <button
              onClick={() => setOption("all")}
              className={cn(
                { "text-black": option === "all" },
                "hover:underline hover:text-black",
              )}
            >
              All
            </button>
            <button
              onClick={() => setOption("web")}
              className={cn(
                { "text-black": option === "web" },
                "hover:underline hover:text-black",
              )}
            >
              Web
            </button>
            <button
              onClick={() => setOption("server")}
              className={cn(
                { "text-black": option === "server" },
                "hover:underline hover:text-black",
              )}
            >
              Server
            </button>
          </div>
          <div className=" grid grid-cols-3 gap-5 w-full">
            {templateIcons.map(
              ({ Icon, title, subtitle, value }, index) =>
                (option === "all" || option === subtitle) && (
                  <div
                    className=" flex flex-col justify-between border rounded-xl shadow-md p-5 h-[180px]"
                    key={index}
                  >
                    <div className=" flex justify-between">
                      <div className=" flex gap-2">
                        <Icon className=" w-10 h-10" />
                        <div className=" flex flex-col text-sm">
                          <span className=" font-semibold">{title}</span>
                          <span>{subtitle}</span>
                        </div>
                      </div>
                      <button
                        className=" self-start"
                        onClick={() => linkGithubRepo(value)}
                      >
                        <GithubIcon className=" w-5 h-5" />
                      </button>
                    </div>
                    <div className=" flex justify-end">
                      <Link
                        className=" bg-zinc-200 rounded-md px-[10px] py-[5px] w-20 text-sm text-center"
                        to={"/login"}
                      >
                        배포하기
                      </Link>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
