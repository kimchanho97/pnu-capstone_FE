import CircularProgress from "@mui/material/CircularProgress";
import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";
import useModal from "../../hooks/useModal";
import { creatingProjectsAtom, projectAtom } from "../../store";
import MainMenu from "./MainMenu";
import ProjectDetail from "./ProjectDetail";
import ProjectItem from "./ProjectItem";

export default function MainSection({
  selectedProject,
  setSelectedProject,
  selectedFramework,
}) {
  const { openModal } = useModal();
  const projects = useAtomValue(projectAtom);
  const creatingProjects = useAtomValue(creatingProjectsAtom);
  const containerRef = useRef(null);

  const openSelectRepoModal = () => {
    openModal({ modalType: "SelectRepoModal" });
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProject]);

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
            <button
              onClick={() => setSelectedProject(null)}
              className=" hover:underline"
            >
              Project
            </button>
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
              " grid grid-cols-1 gap-7 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 xxxl:grid-cols-7 overflow-y-auto":
                !selectedProject,
              "mt-3 overflow-y-auto": selectedProject,
            })}
            ref={containerRef}
            style={{ maxHeight: `calc(100vh - 220px)` }}
          >
            {selectedProject ? (
              <ProjectDetail project={selectedProject} />
            ) : (
              <>
                {projects
                  .filter(
                    (project) =>
                      !selectedFramework ||
                      project.framework === selectedFramework,
                  )
                  .map((project) => (
                    <div key={project.id}>
                      {creatingProjects.includes(project.id) && (
                        <div className=" relative">
                          <div className=" h-[200px] w-[320px] rounded-xl shadow absolute z-10 opacity-75 bg-black text-zinc-50">
                            <div className=" flex flex-col text-sm p-3 items-center">
                              <span>프로젝트 인증서 생성 중입니다.</span>
                              <span>
                                인증서 생성에는 약 2분 정도 소요될 수 있습니다.
                              </span>
                              <div className=" pt-8">
                                <CircularProgress color="inherit" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {
                        <ProjectItem
                          project={project}
                          setSelectedProject={setSelectedProject}
                          className={
                            "border rounded-xl shadow p-5 h-[200px] w-[320px]"
                          }
                        />
                      }
                    </div>
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
