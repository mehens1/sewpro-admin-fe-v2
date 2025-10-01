import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../layouts/Topbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 central search term

  return (
    <div className="flex h-screen bg-[#e7f2f5] overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-48 bg-blue-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-48 z-50`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-white shadow">
          <Topbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onSearch={(term) => setSearchTerm(term)} // 🔹 pass down search handler
          />
        </div>

        {/* Pages */}
        <main className="p-4 overflow-y-auto overflow-x-hidden flex-1 min-w-0">
          <Outlet context={{ searchTerm }} /> 
          {/* 🔹 Provide searchTerm to children via Outlet context */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
