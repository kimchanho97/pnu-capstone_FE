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

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if (path !== user.login) {
      navigate("/login");
    }
  }, [location.pathname, navigate, user.login]);

  return (
    <div className="flex">
      <SideSection />
      <MainSection />
    </div>
  );
}
