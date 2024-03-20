import React from "react";
import MainSection from "../components/MainSection";
import SideSection from "../components/SideSection";

export default function AppPage() {
  return (
    <div className="flex">
      <SideSection />
      <MainSection />
    </div>
  );
}
