import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { fetchProjectDetail } from "../../apis/project";
import ConnectionInfo from "./ConnectionInfo";
import DeploymentHistory from "./DeploymentHistory";
import ProjectDetailMenu from "./ProjectDetailMenu";
import ProjectItem from "./ProjectItem";
import ProjectSetting from "./ProjectSetting";

export default function ProjectDetail({ project, setSelectedProject }) {
  const [selectedDetailOption, setSelectedDetailOption] = useState("배포 내역");
  const { isLoading, data: projectDetail } = useQuery(
    ["/project", project.id],
    () => fetchProjectDetail(project.id),
  );

  if (isLoading)
    return (
      <div className=" flex mt-5 w-full justify-center">
        <CircularProgress size={20} />
      </div>
    );

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
          deploys={projectDetail.deploys}
        />
      ) : selectedDetailOption === "연결 정보" ? (
        <ConnectionInfo
          webhookUrl={projectDetail.webhookUrl}
          domainUrl={projectDetail.domainUrl}
        />
      ) : (
        <ProjectSetting
          secrets={projectDetail.secrets}
          project={project}
          subdomain={projectDetail.subdomain}
        />
      )}
    </div>
  );
}
