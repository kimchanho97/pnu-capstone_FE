import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainSection from "../components/project/MainSection";
import SideSection from "../components/project/SideSection";
import { userAtom } from "../store";

export default function ProjectPage() {
  const user = useAtomValue(userAtom);
  const location = useLocation();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      name: "capstone-frontend",
      status: 0,
      framework: "react",
      url: "",
    },
    {
      id: 2,
      name: "capstone-backend",
      status: 1,
      framework: "nodejs",
      url: "",
    },
    {
      id: 3,
      name: "capstone-deploy",
      status: 2,
      framework: "spring",
      url: "",
    },
  ];

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    const user = sessionStorage.getItem("user");
    if (!user || path !== JSON.parse(user).login) {
      navigate("/");
    }
  }, [location.pathname, navigate, user.login]);

  return (
    <div className="flex">
      <SideSection projects={projects} />
      <MainSection projects={projects} />
    </div>
  );
}
