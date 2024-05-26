import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { fetchProjectDetail } from "../../apis/project";
import ConnectionInfo from "./ConnectionInfo";
import DeploymentHistory from "./DeploymentHistory";
import ProjectDetailMenu from "./ProjectDetailMenu";
import ProjectItem from "./ProjectItem";
import ProjectSetting from "./ProjectSetting";
import { CircularProgress } from "@mui/material";

// const projectDetail = {
//   builds: [
//     {
//       id: 1,
//       buildDate: "2021-09-01 12:00:00",
//       commitMsg: "Initial commit",
//       imageTag: "abc1234",
//     },
//     {
//       id: 2,
//       buildDate: "2021-09-02 12:00:00",
//       commitMsg: "Add README.md",
//       imageTag: "c87d3f2",
//     },
//   ],
//   deploys: [
//     {
//       id: 1,
//       deployDate: "2021-09-01 12:00:00",
//       commitMsg: "Initial deploy",
//       imageTag: "d34k2f3",
//     },
//     {
//       id: 2,
//       deployDate: "2021-09-02 12:00:00",
//       commitMsg: "Add README.md",
//       imageTag: "l08d3f2",
//     },
//   ],
//   domainUrl: "https://capstone-frontend.com",
//   webhookUrl: "https://webhook.capstone-frontend.com",
//   buildId: 1,
//   deployId: 1,
//   secrets: [
//     {
//       key: "SECRET_KEY",
//       value: "SECRET_VALUE",
//     },
//     {
//       key: "ANOTHER_KEY",
//       value: "ANOTHER_VALUE",
//     },
//   ],
// };

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
