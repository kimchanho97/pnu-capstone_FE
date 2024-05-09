import React from "react";
import MainSection from "../components/project/MainSection";
import SideSection from "../components/project/SideSection";

export default function ProjectPage() {
  return (
    <div className="flex">
      <SideSection />
      <MainSection />
    </div>
  );
}
