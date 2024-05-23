import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";
import useModal from "../../hooks/useModal";
import { projectAtom } from "../../store";
import MainMenu from "./MainMenu";
import ProjectDetail from "./ProjectDetail";
import ProjectItem from "./ProjectItem";

export default function MainSection() {
  const { openModal } = useModal();
  const [selectedProject, setSelectedProject] = useState(false);
  const projects = useAtomValue(projectAtom);

  const openSelectRepoModal = () => {
    openModal({ modalType: "SelectRepoModal" });
  };

  useEffect(() => {
    if (selectedProject) {
      const updatedProject = projects.find(
        (project) => project.id === selectedProject.id,
      );
      if (updatedProject) {
        setSelectedProject(updatedProject);
      }
    }
  }, [projects, selectedProject]);

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
            className={cn({
              " grid grid-cols-1 gap-7 mt-10 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto":
                !selectedProject,
              "mt-3 overflow-y-auto": selectedProject,
            })}
            style={{ maxHeight: `calc(100vh - 220px)` }}
          >
            {selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            ) : (
              <>
                {projects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    setSelectedProject={setSelectedProject}
                    className={
                      "border rounded-xl shadow p-5 h-[200px] w-[320px]"
                    }
                  />
                ))}
                <button
                  className=" w-[320px] h-[200px] hover:border border-dotted rounded-xl border-blue-300 group"
                  onClick={openSelectRepoModal}
                >
                  <div className=" w-full h-full flex justify-center items-center">
                    <div className=" bg-sky-300 w-10 h-10 rounded-full relative group-hover:bg-sky-500">
                      <FaPlus className=" w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
