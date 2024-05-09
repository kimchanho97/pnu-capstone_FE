import React from "react";
import { Outlet } from "react-router-dom";
import GlobalModal from "../components/common/GlobalModal";

export default function RootLayout() {
  return (
    <div>
      <GlobalModal />
      <Outlet />
    </div>
  );
}
