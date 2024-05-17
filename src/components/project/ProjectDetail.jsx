import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import ConnectionInfo from "./ConnectionInfo";
import DeploymentHistory from "./DeploymentHistory";
import ProjectDetailMenu from "./ProjectDetailMenu";
import ProjectItem from "./ProjectItem";
import ProjectSetting from "./ProjectSetting";

const projectDetail = {
  deployments: [
    {
      date: "2021-09-01 12:00:00",
      commit_msg: "Initial commit",
      image_name: "iserser23423/capstone-frontend",
      image_tag: "latest",
    },
    {
      date: "2021-09-02 12:00:00",
      commit_msg: "Add README.md",
      image_name: "iserser23423/capstone-frontend",
      image_tag: "latest",
    },
  ],
  secrets: [
    {
      key: "SECRET_KEY",
      value: "SECRET_VALUE",
    },
    {
      key: "ANOTHER_KEY",
      value: "ANOTHER_VALUE",
    },
  ],
};

export default function ProjectDetail({ project, setSelectedProject }) {
  const [selectedDetailOption, setSelectedDetailOption] = useState("배포 내역");

  useEffect(() => {
    console.log(project);
  }, []);

  return (
    <div className=" flex flex-col w-full">
      <button
        className=" flex items-center gap-2 mb-3 text-zinc-500"
        onClick={() => setSelectedProject(null)}
      >
        <IoChevronBackOutline size={20} />
        <span>{project.name}</span>
      </button>
      <ProjectItem
        project={project}
        className={"border p-5 h-[150px] w-full bg-white"}
      />
      <ProjectDetailMenu
        selectedDetailOption={selectedDetailOption}
        setSelectedDetailOption={setSelectedDetailOption}
      />
      {selectedDetailOption === "배포 내역" ? (
        <DeploymentHistory deployments={projectDetail.deployments} />
      ) : selectedDetailOption === "연결 정보" ? (
        <ConnectionInfo />
      ) : (
        <ProjectSetting secrets={projectDetail.secrets} />
      )}
    </div>
  );
}
