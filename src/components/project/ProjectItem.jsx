import cn from "classnames";
import { useAtomValue } from "jotai";
import React from "react";
import { IoTerminal } from "react-icons/io5";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import { userAtom } from "../../store";
import { backendList, icons } from "../../utils/constant";

export default function ProjectItem({
  project,
  setSelectedProject,
  className,
}) {
  const ProjectIconComponent = icons[project?.framework];
  const subtitle = backendList.includes(project.framework) ? "server" : "web";
  const user = useAtomValue(userAtom);
  const openGithubLink = () => {
    window.open(`https://github.com/${user.login}/${project.name}`, "_blank");
  };

  return (
    <div className={cn("flex flex-col justify-between bg-white", className)}>
      <div className=" flex gap-2 w-full justify-between">
        <button
          className=" flex gap-2"
          onClick={() => {
            setSelectedProject(project);
          }}
          disabled={className.includes("w-full")}
        >
          <ProjectIconComponent className=" w-10 h-10" />
          <div className=" flex flex-col text-sm items-start">
            <span className=" font-semibold">{project.name}</span>
            <span>{subtitle}</span>
          </div>
        </button>
        <button onClick={openGithubLink}>
          <GithubIcon className=" w-5 h-5" />
        </button>
      </div>
      <div className=" flex justify-between">
        <div className=" flex gap-1 items-center">
          <button>
            <IoTerminal className=" w-4 h-4" />
          </button>
          <div className=" flex gap-1">
            <div
              className={cn("rounded-full w-4 h-4 relative", {
                "bg-red-200": project.status === 0,
                "bg-amber-200":
                  project.status === 1 ||
                  project.status === 2 ||
                  project.status === 3,
                "bg-green-200": project.status === 4,
              })}
            >
              <div
                className={cn(
                  "absolute rounded-full w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  {
                    "bg-red-500": project.status === 0,
                    "bg-amber-500":
                      project.status === 1 ||
                      project.status === 2 ||
                      project.status === 3,
                    "bg-green-500": project.status === 4,
                  },
                )}
              />
            </div>
            <span
              className={cn(
                "text-xs",
                { "text-red-500": project.status === 0 },
                {
                  "text-amber-500":
                    project.status === 1 ||
                    project.status === 2 ||
                    project.status === 3,
                },
                {
                  "text-green-600": project.status === 4,
                },
              )}
            >
              {(project.status === 0 && "빌드 전") ||
                (project.status === 1 && "빌드 중") ||
                (project.status === 2 && "빌드 완료") ||
                (project.status === 3 && "배포 중") ||
                (project.status === 4 && "배포 완료")}
            </span>
          </div>
        </div>
        <div className=" flex gap-1">
          <button
            className={cn(
              " rounded-md px-3 py-2 text-xs",
              (project.status === 0 ||
                project.status === 2 ||
                project.status === 4) &&
                "bg-blue-200 hover:bg-blue-300",
              {
                "text-zinc-500 bg-zinc-200":
                  project.status === 1 || project.status === 3,
              },
            )}
            disabled={project.status === 1 || project.status === 3}
          >
            빌드하기
          </button>
          <button
            className={cn(
              " rounded-md px-3 py-2 text-xs ",
              { "bg-zinc-200 text-zinc-500 ": project.status !== 2 },
              project.status === 2 &&
                " text-black bg-blue-200 hover:bg-blue-300",
            )}
            disabled={project.status !== 2}
          >
            배포하기
          </button>
        </div>
      </div>
    </div>
  );
}
