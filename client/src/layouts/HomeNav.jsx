import React from "react";
import logoIcon from "../assets/img/logo-icon.png";
import { Link, Outlet } from "react-router-dom";

const HomeNav = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/auth" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-gray-200 shadow-md px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="Logo Icon" className="w-8 h-8" />
          <h2 className="text-lg font-semibold">Atvibe</h2>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeNav;
