import React from "react";

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

export default function ProjectDetail() {
  return <div>ProjectDetail</div>;
}
