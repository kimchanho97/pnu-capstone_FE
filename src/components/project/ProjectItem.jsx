import cn from "classnames";
import { useAtomValue } from "jotai";
import React from "react";
import { FaCaretSquareRight, FaSquare } from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import { userAtom } from "../../store";
import { backendList, icons } from "../../utils/constant";

export default function ProjectItem({ project }) {
  const ProjectIconComponent = icons[project?.framework];
  const subtitle = backendList.includes(project.framework) ? "server" : "web";
  const user = useAtomValue(userAtom);
  const openGithubLink = () => {
    window.open(`https://github.com/${user.login}/${project.name}`, "_blank");
  };

  return (
    <div className=" flex flex-col justify-between border rounded-xl shadow p-5 h-[200px] w-[320px]">
      <div className=" flex gap-2 w-full justify-between">
        <button className=" flex gap-2">
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
        <div className=" flex items-center gap-4">
          <button disabled={project.status !== 2}>
            <FaCaretSquareRight
              className={cn("w-4 h-4", project.status !== 2 && "text-zinc-300")}
            />
          </button>
          <button disabled={project.status === 2}>
            <FaSquare
              className={cn("w-3 h-3", project.status === 2 && "text-zinc-300")}
            />
          </button>
          <button>
            <IoTerminal className=" w-4 h-4" />
          </button>
          <div className=" flex gap-1">
            <div
              className={cn(
                " rounded-full w-4 h-4 relative",
                project.status === 0 && "bg-amber-200",
                project.status === 1 && "bg-green-200",
                project.status === 2 && "bg-red-200",
              )}
            >
              <div
                className={cn(
                  " absolute rounded-full w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  project.status === 0 && "bg-amber-500",
                  project.status === 1 && "bg-green-500",
                  project.status === 2 && "bg-red-500",
                )}
              />
            </div>
            <span
              className={cn(
                " text-xs",
                project.status === 0 && "text-amber-500",
                project.status === 1 && "text-green-600",
                project.status === 2 && "text-red-500",
              )}
            >
              {project.status === 0
                ? "빌드중"
                : project.status === 1
                ? "실행중"
                : "중지됨"}
            </span>
          </div>
        </div>
        <button className=" bg-zinc-200 rounded-md px-3 py-2 text-xs">
          접속하기
        </button>
      </div>
    </div>
  );
}
