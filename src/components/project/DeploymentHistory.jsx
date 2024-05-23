import cn from "classnames";
import { useAtomValue } from "jotai";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import { userAtom } from "../../store";

export default function DeploymentHistory({ deploys, builds, project }) {
  const user = useAtomValue(userAtom);
  const linkGithubRepo = () => {
    window.open(`
    https://github.com/${user.login}/${project.name}
    `);
  };
  const isRollbackable = [2, 4, 5, 6].includes(project.status);

  return (
    <div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>배포 내역</span>
        </div>
        <div className=" flex flex-col gap-2">
          {deploys.map(({ id, deployDate, commitMsg, imageTag }) => (
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
                  <div className=" text-[10px]">{deployDate}</div>
                </div>
              </div>
              <button
                className={cn(" bg-zinc-200 rounded-md px-3 py-2 text-xs", {
                  "hover:bg-blue-200": isRollbackable,
                })}
                disabled={!isRollbackable}
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
                  <div className=" text-xs">{buildDate}</div>
                </div>
              </div>
              <button
                className={cn(" bg-zinc-200 rounded-md px-3 py-2 text-xs", {
                  "hover:bg-blue-200": isRollbackable,
                })}
                disabled={!isRollbackable}
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
