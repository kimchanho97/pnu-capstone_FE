import { CircularProgress } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFavorites, fetchProjects } from "../apis/project";
import MainSection from "../components/project/MainSection";
import SideSection from "../components/project/SideSection";
import { projectAtom, projectTimeoutsAtom, userAtom } from "../store";

export default function ProjectPage() {
  const user = useAtomValue(userAtom);
  const [projects, setProjects] = useAtom(projectAtom);
  const [selectedProject, setSelectedProject] = useState(false);
  const [projectTimeouts, setProjectTimeouts] = useAtom(projectTimeoutsAtom);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(
    ["/projects", user.login],
    fetchProjects,
  );
  const { isLoading: isLoadingFavorites, data: favorites } = useQuery(
    ["/favorites", user.id],
    () => fetchFavorites(user.id),
    {
      enabled: !!user.id,
    },
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
      setProjects(data);
    }
  }, [data, setProjects]);

  useEffect(() => {
    if (selectedProject) {
      const updatedProject = projects.find(
        (project) => project.id === selectedProject.id,
      );
      if (updatedProject) {
        setSelectedProject(updatedProject);
      }
    }
  }, [projects, selectedProject]);

  // SSE를 통해 프로젝트 상태를 실시간으로 업데이트합니다.
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

  useEffect(() => {
    return () => {
      projectTimeouts.forEach((timeout) => {
        const timeoutId = Object.values(timeout)[0];
        clearTimeout(timeoutId);
      });
      setProjectTimeouts([]); // projectTimeouts 배열 초기화
    };
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const timeout = projectTimeouts.find(
        (item) => item[selectedProject.id.toString()] !== undefined,
      );
      if (timeout) {
        clearTimeout(timeout[selectedProject.id.toString()]);
        setProjectTimeouts((prev) =>
          prev.filter(
            (item) => item[selectedProject.id.toString()] === undefined,
          ),
        );
      }
    }
  }, [selectedProject]);

  if (isLoading || isLoadingFavorites || !projects) {
    return (
      <div className=" flex justify-center mt-10">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideSection
        setSelectedProject={setSelectedProject}
        favorites={favorites}
      />
      <MainSection
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
}
