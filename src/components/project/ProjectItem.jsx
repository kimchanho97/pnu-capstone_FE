import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { IoTerminal } from "react-icons/io5";
import { buildProject } from "../../apis/project";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import { userAtom } from "../../store";
import { backendList, icons } from "../../utils/constant";

const statusMessageMap = {
  0: "빌드 전",
  1: "빌드 중",
  2: "빌드 완료",
  3: "배포 중",
  4: "배포 완료",
  5: "빌드 실패",
  6: "배포 실패",
};

export default function ProjectItem({
  project,
  setSelectedProject,
  className,
}) {
  const ProjectIconComponent = icons[project?.framework];
  const subtitle = backendList.includes(project.framework) ? "server" : "web";
  const user = useAtomValue(userAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal } = useModal();
  const isBuildable = [0, 2, 4, 5, 6].includes(project.status);
  const isDeployable = project.status === 2 || project.status === 6;

  const openGithubLink = () => {
    window.open(`https://github.com/${user.login}/${project.name}`, "_blank");
  };

  const handleBuildProject = async () => {
    try {
      setIsSubmitting(true);
      const response = await buildProject(project.id);
      console.log(response);
    } catch (error) {
      const { status } = error.response.data?.error;
      if (status === 4001) {
        openModal({
          modalType: "MessageModal",
          props: {
            message: "이미 동일한 시점의 빌드 내역이 존재합니다.",
          },
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleDeployProject = async () => {
    try {
      setIsSubmitting(true);
      await buildProject(project.id);
    } catch (error) {
      const { status } = error.response.data?.error;
      if (status === 4001) {
        openModal({
          modalType: "MessageModal",
          props: {
            message: "이미 동일한 시점의 배포 내역이 존재합니다.",
          },
        });
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      project.status === 2 ||
      project.status === 4 ||
      project.status === 5 ||
      project.status === 6
    ) {
      setIsSubmitting(false);
    }
  }, [project.status]);

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
                "bg-red-200":
                  project.status === 0 ||
                  project.status === 5 ||
                  project.status === 6,
                "bg-amber-200": project.status === 1 || project.status === 3,
                "bg-blue-200": project.status === 2,
                "bg-green-200": project.status === 4,
              })}
            >
              <div
                className={cn(
                  "absolute rounded-full w-2 h-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  {
                    "bg-red-500":
                      project.status === 0 ||
                      project.status === 5 ||
                      project.status === 6,
                    "bg-amber-500":
                      project.status === 1 || project.status === 3,
                    "bg-blue-500": project.status === 2,
                    "bg-green-500": project.status === 4,
                  },
                )}
              />
            </div>
            <span
              className={cn("text-xs", {
                "text-red-500":
                  project.status === 0 ||
                  project.status === 5 ||
                  project.status === 6,
                "text-amber-500": project.status === 1 || project.status === 3,
                "text-blue-500": project.status === 2,
                "text-green-600": project.status === 4,
              })}
            >
              {statusMessageMap[project.status]}
            </span>
          </div>
        </div>
        <div className=" flex gap-1">
          <button
            className={cn(" rounded-md px-3 py-2 text-xs", {
              "bg-blue-200 hover:bg-blue-300": isBuildable,
              "text-zinc-500 bg-zinc-200": !isBuildable,
            })}
            disabled={isSubmitting || !isBuildable}
            onClick={handleBuildProject}
          >
            빌드하기
          </button>
          <button
            className={cn(" rounded-md px-3 py-2 text-xs ", {
              " text-black bg-blue-200 hover:bg-blue-300": isDeployable,
              "bg-zinc-200 text-zinc-500 ": !isDeployable,
            })}
            disabled={isSubmitting || !isDeployable}
            onClick={handleDeployProject}
          >
            배포하기
          </button>
        </div>
      </div>
    </div>
  );
}
