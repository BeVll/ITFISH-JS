import React, { useEffect, useMemo } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBook, FaUsers } from "react-icons/fa";
import { Button } from "@heroui/react";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from "../providers/AuthProvider";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const pages = [
    { url: "/", title: "Dashboard", icon: <MdSpaceDashboard size={30} /> },
    { url: "/courses", title: "Courses", icon: <FaBook size={30} /> },
    { url: "/users", title: "Users", icon: <FaUsers size={30} /> },
  ];

  const location = useLocation();

  const { logout } = useAuth();

  const renderedPages = useMemo(() => {
    const { pathname } = location;

    return pages.map((page) => (
      <li
        className={`cursor-pointer hover:text-neutral-400 transition-all py-3 ${
          page.url === pathname && "active"
        }`}
      >
        <Link to={page.url} className="flex  items-center gap-3">
          {page.icon}
          {page.title}
        </Link>
      </li>
    ));
  }, [location.pathname, pages, location]);

  useEffect(() => {}, [location.pathname]);

  return (
    <div className="bg-[#18181b] overflow-hidden flex flex-col justify-between max-h-screen min-h-screen p-5 gap-10">
      <h1 className="font-bold text-xl">Courses CRM</h1>
      <nav>
        <ul className="">{renderedPages}</ul>
      </nav>

      <div>
        <Button
          variant="light"
          color="danger"
          startContent={<IoExitOutline size={20} />}
          fullWidth
          onPress={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
