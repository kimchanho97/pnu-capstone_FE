import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";
import useModal from "../../hooks/useModal";
import MainMenu from "./MainMenu";
import ProjectItem from "./ProjectItem";

export default function MainSection({ projects }) {
  const { openModal } = useModal();
  const [selectedProject, setSelectedProject] = useState(null);
  const handleCreateProject = () => {
    openModal({ modalType: "SelectRepoModal" });
  };

  return (
    <div className=" h-full">
      <MainMenu />
      <div
        className=" bg-[#f9f9f9] w-full"
        style={{
          height: `calc(100vh - 50px)`,
          width: `calc(100vw - 300px)`,
        }}
      >
        <div className=" p-[40px]">
          <div className=" text-2xl border-b-2 h-[40px] pb-[4px] flex justify-between">
            <span>Project</span>
            <div className=" flex items-center gap-2">
              <span className=" text-sm">배포환경</span>
              <div className=" flex text-sm items-center gap-1 bg-zinc-200 p-1 px-2 rounded-md">
                <span>main</span>
                <GoGitBranch />
              </div>
            </div>
          </div>
          <div
            className=" grid grid-cols-1 gap-7 mt-10 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto"
            style={{ maxHeight: `calc(100vh - 240px)` }}
          >
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
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
