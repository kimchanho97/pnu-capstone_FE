import React from "react";
import { FaPlus, FaSquare } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";
import { IoTerminal } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import { icons } from "../../utils/constant";
import MainMenu from "./MainMenu";

export default function MainSection() {
  const { openModal } = useModal();
  const handleCreateProject = () => {
    openModal({ type: "selectRepoModal" });
  };

  return (
    <div className=" h-full">
      <MainMenu />
      <div
        className=" bg-[#f9f9f9] w-full"
        style={{ height: `calc(100vh - 50px)`, width: `calc(100vw - 300px)` }}
      >
        <div className=" p-10">
          <div className=" text-2xl border-b-2 pb-1">Project</div>
          <div className="grid grid-cols-1 gap-7 mt-10 sm:grid-cols-2 md:grid-cols-3">
            {/* 프로젝트 컴포넌트 */}
            <div className=" flex flex-col justify-between border rounded-xl shadow p-5 h-[200px] w-[320px]">
              <div className=" flex gap-2 w-full">
                <icons.react className=" w-10 h-10" />
                <div className=" flex flex-col text-sm flex-grow">
                  <span className=" font-semibold">프로젝트 이름</span>
                  <span>subtitle</span>
                </div>
                <Link>
                  <GithubIcon className=" w-5 h-5" />
                </Link>
              </div>
              <div className=" flex justify-between">
                <div className=" flex items-center gap-4">
                  <button>
                    <FaCaretRight className=" w-4 h-4" />
                  </button>
                  <button>
                    <FaSquare className=" text-zinc-300 w-3 h-3" />
                  </button>
                  <button>
                    <IoTerminal className=" w-4 h-4" />
                  </button>
                  <div className=" flex gap-1">
                    <div className=" bg-red-200 rounded-full w-4 h-4 relative">
                      <div className=" absolute rounded-full w-2 h-2 bg-red-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className=" text-red-500 text-xs">중지됨</span>
                  </div>
                </div>
                <button className=" bg-zinc-200 rounded-md px-3 py-2 text-xs">
                  접속하기
                </button>
              </div>
            </div>
            {/* 프로젝트 컴포넌트 */}
            <div className=" flex flex-col justify-between border rounded-xl shadow p-5 h-[200px] w-[320px]">
              <div className=" flex gap-2 w-full">
                <icons.vue className=" w-10 h-10" />
                <div className=" flex flex-col text-sm flex-grow">
                  <span className=" font-semibold">프로젝트 이름</span>
                  <span>subtitle</span>
                </div>
                <Link>
                  <GithubIcon className=" w-5 h-5" />
                </Link>
              </div>
              <div className=" flex justify-between">
                <div className=" flex items-center gap-4">
                  <button>
                    <FaCaretRight className=" text-zinc-300 w-4 h-4" />
                  </button>
                  <button>
                    <FaSquare className=" w-3 h-3" />
                  </button>
                  <button>
                    <IoTerminal className=" w-4 h-4" />
                  </button>
                  <div className=" flex gap-1">
                    <div className=" bg-emerald-200 rounded-full w-4 h-4 relative">
                      <div className=" absolute rounded-full w-2 h-2 bg-emerald-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className=" text-emerald-600 text-xs">실행 중</span>
                  </div>
                </div>
                <button className=" bg-zinc-200 rounded-md px-3 py-2 text-xs">
                  접속하기
                </button>
              </div>
            </div>
            {/* 프로젝트 컴포넌트 */}
            <button
              className=" w-[320px] h-[200px] hover:border border-dotted rounded-xl border-blue-300 group"
              onClick={handleCreateProject}
            >
              <div className=" w-full h-full flex justify-center items-center">
                <div className=" bg-sky-300 w-10 h-10 rounded-full relative group-hover:bg-sky-500">
                  <FaPlus className=" w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
