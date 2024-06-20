import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { useQueryClient } from "react-query";
import { checkProjectDeployStatus, deployProject } from "../../apis/project";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import useModal from "../../hooks/useModal";
import { userAtom } from "../../store";

export default function DeploymentHistory({ deploys, builds, project }) {
  const user = useAtomValue(userAtom);
  const linkGithubRepo = () => {
    window.open(`
    https://github.com/${user.login}/${project.name}
    `);
  };
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRollbackable = [2, 4, 5, 6].includes(project.status);
  const queryClient = useQueryClient();

  const handleDeployProject = async (buildId) => {
    try {
      setIsSubmitting(true);
      const response = await deployProject(buildId);
      console.log(response);
      const timerId = setTimeout(async () => {
        try {
          await checkProjectDeployStatus(buildId);
        } catch (error) {
          console.log(error);
        }
        clearTimeout(timerId);
      }, 1000 * 60 * 2);
    } catch (error) {
      const { status } = error.response.data?.error;
      if (status === 4001) {
        openModal({
          modalType: "MessageModal",
          props: {
            message: "현재 배포된 내용과 동일한 시점입니다.",
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
      queryClient.invalidateQueries(["/project", project.id]);
    }
  }, [project.status, queryClient, project.id]);

  return (
    <div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>배포 내역</span>
        </div>
        <div className=" flex flex-col gap-2">
          {deploys.map(({ id, buildId, deployDate, commitMsg, imageTag }) => (
            <div
              key={id}
              className=" w-full bg-white p-5 flex gap-3 items-center justify-between"
            >
              <div className=" flex items-center gap-4">
                <div className=" text-green-700 pr-3">
                  {id === project.currentDeployId ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={20} />
                  )}
                </div>
                <div>
                  <div className=" flex items-center gap-4">
                    <button
                      className=" text-xs flex items-center gap-1 hover:text-blue-500"
                      onClick={linkGithubRepo}
                    >
                      <GithubIcon className=" w-4 h-4" />
                      <span>
                        {user.login} / {project.name} &#183; main
                      </span>
                    </button>
                    <div>:</div>
                    <div className=" font-semibold">
                      <span>{commitMsg}</span>
                      <span className=" text-xs font-normal text-zinc-500">
                        {" "}
                        - {imageTag}
                      </span>
                    </div>
                  </div>
                  <div className=" text-[10px]">
                    {deployDate.replace("GMT", "")}
                  </div>
                </div>
              </div>
              <button
                className={cn(" bg-zinc-200 rounded-md px-3 py-2 text-xs", {
                  "hover:bg-blue-200": isRollbackable,
                })}
                disabled={!isRollbackable || isSubmitting}
                onClick={() => handleDeployProject(buildId)}
              >
                롤백하기
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-24 mb-12">
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>빌드 내역</span>
        </div>
        <div className=" flex flex-col gap-2">
          {builds.map(({ id, buildDate, commitMsg, imageTag }) => (
            <div
              key={id}
              className=" w-full bg-white p-5 flex gap-3 items-center justify-between"
            >
              <div className=" flex items-center gap-4">
                <div className=" text-green-700 pr-3">
                  {id === project.currentBuildId ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={20} />
                  )}
                </div>
                <div>
                  <div className=" flex items-center gap-4">
                    <button
                      className=" text-xs flex items-center gap-1 hover:text-blue-500"
                      onClick={linkGithubRepo}
                    >
                      <GithubIcon className=" w-4 h-4" />
                      <span>
                        {user.login} / {project.name} &#183; main
                      </span>
                    </button>
                    <div>:</div>
                    <div className=" font-semibold">
                      <span>{commitMsg}</span>
                      <span className=" text-xs font-normal text-zinc-500">
                        {" "}
                        - {imageTag}
                      </span>
                    </div>
                  </div>
                  <div className=" text-[10px]">
                    {buildDate.replace("GMT", "")}
                  </div>
                </div>
              </div>
              <button
                className={cn(" bg-zinc-200 rounded-md px-3 py-2 text-xs", {
                  "hover:bg-blue-200": isRollbackable,
                })}
                disabled={!isRollbackable || isSubmitting}
                onClick={() => handleDeployProject(id)}
              >
                배포하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
