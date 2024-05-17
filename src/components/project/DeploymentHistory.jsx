import { useAtomValue } from "jotai";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";
import { userAtom } from "../../store";

export default function DeploymentHistory({ deployments, builds, project }) {
  const user = useAtomValue(userAtom);
  const linkGithubRepo = () => {
    window.open(`
    https://github.com/${user.login}/${project.name}
    `);
  };

  return (
    <div>
      <div>
        <div className=" text-sm py-2 flex items-center gap-1">
          <MdOutlineArrowDropDownCircle className=" text-green-600" />
          <span>배포 내역</span>
        </div>
        <div className=" flex flex-col gap-2">
          {deployments.map(({ id, deploy_date, commit_msg }, index) => (
            <div
              key={id}
              className=" w-full bg-white p-5 flex gap-3 items-center justify-between"
            >
              <div className=" flex items-center gap-4">
                <div className=" text-green-700">
                  {index === deployments.length - 1 ? (
                    <FaCheckCircle size={25} />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={25} />
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
                    <div className=" font-semibold">{commit_msg}</div>
                  </div>
                  <div className=" text-xs">{deploy_date}</div>
                </div>
              </div>
              <button className=" bg-zinc-200 rounded-md px-3 py-2 text-xs hover:bg-blue-200">
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
          {builds.map(
            ({ id, build_date, commit_msg, image_name, image_tag }, index) => (
              <div
                key={id}
                className=" w-full bg-white p-5 flex gap-3 items-center justify-between"
              >
                <div className=" flex items-center gap-4">
                  <div className=" text-green-700">
                    {index === builds.length - 1 ? (
                      <FaCheckCircle size={25} />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={25} />
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
                      <div className=" font-semibold">{commit_msg}</div>
                    </div>
                    <div className=" text-xs">{build_date}</div>
                  </div>
                </div>
                <button className=" bg-zinc-200 rounded-md px-3 py-2 text-xs hover:bg-blue-200">
                  빌드하기
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
