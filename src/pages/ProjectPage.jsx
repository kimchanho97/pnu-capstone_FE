import { CircularProgress } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProjects } from "../apis/project";
import MainSection from "../components/project/MainSection";
import SideSection from "../components/project/SideSection";
import { projectAtom, userAtom } from "../store";

export default function ProjectPage() {
  const user = useAtomValue(userAtom);
  const [projects, setProjects] = useAtom(projectAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(
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

  useEffect(() => {
    if (data) {
      // console.log("ProjectPage: ", data);
      setProjects(data);
    }
  }, [data, setProjects]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/stream?channel=${user.id}`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("EventSource: ", data);
      setProjects((prev) =>
        prev.map((item) =>
          item.id === data.projectId
            ? {
                ...item,
                status: data.status,
                currentDeployId: data.currentDeployId
                  ? data.currentDeployId
                  : item.currentDeployId,
                currentBuildId: data.currentBuildId
                  ? data.currentBuildId
                  : item.currentBuildId,
              }
            : item,
        ),
      );
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error: ", error);
    };
    return () => {
      eventSource.close();
    };
  }, [setProjects, user.id]);

  if (isLoading || !projects) {
    return (
      <div className=" flex justify-center mt-10">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideSection />
      <MainSection />
    </div>
  );
}
