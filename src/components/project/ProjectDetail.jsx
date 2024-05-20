import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import ConnectionInfo from "./ConnectionInfo";
import DeploymentHistory from "./DeploymentHistory";
import ProjectDetailMenu from "./ProjectDetailMenu";
import ProjectItem from "./ProjectItem";
import ProjectSetting from "./ProjectSetting";

const projectDetail = {
  builds: [
    {
      id: 1,
      buildDate: "2021-09-01 12:00:00",
      commitMsg: "Initial commit",
      imageName: "iserser23423/capstone-frontend",
      imageTag: "latest",
    },
    {
      id: 2,
      buildDate: "2021-09-02 12:00:00",
      commitMsg: "Add README.md",
      imageName: "iserser23423/capstone-frontend",
      imageTag: "latest",
    },
  ],
  deployments: [
    {
      id: 1,
      deployDate: "2021-09-01 12:00:00",
      commitMsg: "Initial deploy",
    },
    {
      id: 2,
      deployDate: "2021-09-02 12:00:00",
      commitMsg: "Add README.md",
    },
  ],
  domainUrl: "https://capstone-frontend.com",
  webhookUrl: "https://webhook.capstone-frontend.com",
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

  return (
    <div className=" flex flex-col w-full">
      <button
        className=" flex items-center gap-2 mb-8 text-zinc-500"
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
        <DeploymentHistory
          project={project}
          builds={projectDetail.builds}
          deployments={projectDetail.deployments}
        />
      ) : selectedDetailOption === "연결 정보" ? (
        <ConnectionInfo
          webhookUrl={projectDetail.webhookUrl}
          domainUrl={projectDetail.domainUrl}
        />
      ) : (
        <ProjectSetting secrets={projectDetail.secrets} project={project} />
      )}
    </div>
  );
}
