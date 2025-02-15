import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faCalendarAlt,
  faStar,
  faUser,
  faCommentDots,
  faCog,
  faSignOutAlt,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

const AfterLoginNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: faGauge },
    { name: "Calendar", path: "/calendar", icon: faCalendarAlt },
    { name: "Goals", path: "/goals", icon: faStar },
    { name: "Tasks", path: "/tasks", icon: faTasks },
    { name: "Member", path: "/chat-member", icon: faUser },
    { name: "Support", path: "/support", icon: faCommentDots },
    { name: "Settings", path: "/settings", icon: faCog },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <h1 className="text-lg font-bold">Atvibe</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition ${
                    location.pathname === item.path
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-800"
                  }`}>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-10">
          <Link
            to="/logout"
            className="flex items-center space-x-3 text-red-400 hover:text-red-500">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AfterLoginNav;
