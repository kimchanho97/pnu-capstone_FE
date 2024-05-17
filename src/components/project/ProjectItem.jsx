import cn from "classnames";
import { useAtomValue } from "jotai";
import React from "react";
import { IoTerminal } from "react-icons/io5";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import { userAtom } from "../../store";
import { backendList, icons } from "../../utils/constant";

// 상태에 따른 스타일 및 텍스트 매핑
const statusStyles = {
  0: { color: "red", text: "빌드 전" },
  1: { color: "amber", text: "빌드 중" },
  2: { color: "amber", text: "빌드 완료" },
  3: { color: "amber", text: "배포 중" },
  4: { color: "green", text: "배포 완료" },
};

const getStatusStyle = (status) => {
  const color = statusStyles[status].color;
  return {
    circleBg: `bg-${color}-200`,
    dotBg: `bg-${color}-500`,
    textClass: status === 4 ? `text-${color}-600` : `text-${color}-500`,
  };
};
const getStatusText = (status) => {
  return statusStyles[status].text;
};

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
              className={cn(
                "rounded-full w-4 h-4 relative",
                getStatusStyle(project.status).circleBg,
              )}
            >
              <div
                className={cn(
                  "absolute rounded-full w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  getStatusStyle(project.status).dotBg,
                )}
              />
            </div>
            <span
              className={cn(
                "text-xs",
                getStatusStyle(project.status).textClass,
              )}
            >
              {getStatusText(project.status)}
            </span>
          </div>
        </div>
        <div className=" flex gap-1">
          <button
            className={cn(
              " bg-zinc-200 rounded-md px-3 py-2 text-xs",
              (project.status === 0 ||
                project.status === 2 ||
                project.status === 4) &&
                "bg-blue-200 hover:bg-blue-300",
            )}
            disabled={project.status === 1 || project.status === 3}
          >
            빌드하기
          </button>
          <button
            className={cn(
              " bg-zinc-200 rounded-md px-3 py-2 text-xs",
              project.status === 2 && "bg-blue-200 hover:bg-blue-300",
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
