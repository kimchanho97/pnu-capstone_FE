import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchProjectDetail } from "../../apis/project";
import ConnectionInfo from "./ConnectionInfo";
import DeploymentHistory from "./DeploymentHistory";
import ProjectDetailMenu from "./ProjectDetailMenu";
import ProjectItem from "./ProjectItem";
import ProjectSetting from "./ProjectSetting";

export default function ProjectDetail({ project }) {
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
      <ProjectItem
        project={project}
        className={"border p-5 h-[200px] w-full bg-white"}
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
          detailedDescription={projectDetail.detailedDescription}
        />
      )}
    </div>
  );
}
