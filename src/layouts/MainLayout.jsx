import React from "react";
import GNB from "../components/common/GNB";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="mx-10">
      <GNB />
      <Outlet />
    </div>
  );
}
