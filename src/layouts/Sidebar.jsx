import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaFileAlt, FaUserFriends, FaUser, FaSignOutAlt } from "react-icons/fa";
import { showAlert } from "../utilities/swal";
import { useSelector } from "react-redux";

const Sidebar = ({ closeSidebar }) => {
  const user = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  const firstname = user.detail.first_name || "Admin";
  const lastname = user.detail.last_name || "User";
  const displayEmailOrPhone = user.email || user.phone || "no-contact@example.com";
  const profile_picture= user.detail?.profile_picture;

  const logout = async () => {
    const confirmed = await showAlert({
      type: "warning",
      title: "Are you sure?",
      text: "You will be logged out.",
      confirmation: true,
      confirmText: "Yes, logout",
      cancelText: "Cancel",
    });

    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      await showAlert({
        type: "success",
        title: "Logged out successfully!",
        timer: 1500,
      });

      navigate("/login");
    }
  };

  const baseClass = "flex items-center gap-3 px-4 py-2 w-full rounded-l-[50px]";
  const activeClass = "bg-[#e7f2f5] primary-text font-semibold shadow";
  const inactiveClass = "text-white hover:text-white";

  return (
    <aside className="w-48 min-h-screen primary-bg text-white flex flex-col items-center py-8 bg-cover">
      {/* Avatar + User */}
      <div className="flex flex-col items-center mb-8">
     <div className="w-[105px] h-[105px] rounded-full bg-gradient-to-l from-green-500 to-red-500 p-[2px] flex items-center justify-center relative">
  <div className="w-[96px] h-[96px] bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden relative">
   {user?.detail?.profile_picture ? (
  <img
    src={user.detail?.profile_picture}
    alt="Profile"
    className="w-full h-full object-cover rounded-full"
  />
) : (
  <FaUser className="primary-text text-3xl" />
)}

  </div>
</div>

        <h2 className="text-lg font-semibold mt-1">{firstname} {lastname}</h2>
        <p className="text-sm text-gray-300">{displayEmailOrPhone}</p>
      </div>
      <nav className="flex-1 w-full">
        <ul className="space-y-4 pl-4">
          <li>
            <NavLink to="/" end onClick={closeSidebar}
              className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <FaHome /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/waitList" onClick={closeSidebar}
              className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <FaFileAlt /> <span>Waitlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" onClick={closeSidebar}
              className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <FaUserFriends /> <span>Users</span>
            </NavLink>
          </li>
          <li className="md:hidden">
            <NavLink to="/profile" onClick={closeSidebar}
              className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}>
              <FaUser /> <span>Profile</span>
            </NavLink>
          </li>
          <li className="md:hidden">
            <button onClick={logout}
              className="flex items-center gap-3 px-4 py-2 w-full text-left text-white hover:text-white">
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
