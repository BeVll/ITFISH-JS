import React, { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="w-screen max-h-screen overflow-hidden grid grid-cols-[250px_1fr] ">
      <Sidebar />
      <div className="max-h-screen overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
