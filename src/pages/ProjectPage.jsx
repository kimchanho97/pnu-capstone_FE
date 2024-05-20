import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProjects } from "../apis/project";
import MainSection from "../components/project/MainSection";
import SideSection from "../components/project/SideSection";
import { userAtom } from "../store";
import { CircularProgress } from "@mui/material";

export default function ProjectPage() {
  const user = useAtomValue(userAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, data: projects } = useQuery(
    ["/projects", user.login],
    fetchProjects,
  );

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    const user = sessionStorage.getItem("user");
    if (!user || path !== JSON.parse(user).login) {
      navigate("/");
    }
  }, [location.pathname, navigate, user.login]);

  if (isLoading) {
    return (
      <div className=" flex justify-center mt-10">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideSection projects={projects} />
      <MainSection projects={projects} />
    </div>
  );
}
