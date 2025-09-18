import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaCog, FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Notifications from "../components/Notification";
import Menu from "../components/menu";
import flowerIcon from "../assets/flower.png";
import { showAlert } from "../utilities/swal";
import { useSelector } from "react-redux";

const Topbar = ({ toggleSidebar, onSearch }) => {
  const user = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  const firstname = user?.detail?.first_name || user?.detail?.last_name || "User";
  const displayName = firstname;

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMobileSearch && mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setSearchValue("");
        setShowMobileSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim()); // 
    }
  
  };

  return (
    <header className="flex items-center justify-between w-full px-2 py-3 bg-white shadow relative">
      <div className="flex items-center space-x-2">
        <img src={flowerIcon} alt="Flower Icon" className="w-8 h-8 object-contain" />
        <h1 className="text-sm md:text-base font-medium text-gray-700 truncate">
          Welcome, {displayName}
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-2 ml-auto">
        <div ref={desktopSearchRef} className="relative flex">
          {/* <InputText
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="pl-3 h-8 border border-gray-300 rounded-l-full rounded-r-none focus:outline-none"
            style={{ boxShadow: "none", width: "148px" }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // press Enter
          /> */}
          {/* <Button
            icon={<FaSearch />}
            className="h-8 w-8 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 border-l-0 rounded-r-full flex items-center justify-center"
            style={{ boxShadow: "none", padding: 0 }}
            onClick={handleSearch}
          /> */}
        </div>

        <Menu
          button={<FaCog className="text-gray-600 cursor-pointer" />}
          items={[
            { label: "Profile", icon: <FaUser />, onClick: () => navigate("/profile") },
            { label: "Logout", icon: <FaSignOutAlt />, onClick: logout },
          ]}
        />
        <Notifications className="md:mr-4" />
      </div>

      {/* Mobile Topbar */}
      <div className="flex md:hidden items-center gap-3 ml-auto">
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <FaSearch size={18} />
        </button>
        <Notifications />
        <button className="text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Search Field */}
      {showMobileSearch && (
        <div
          ref={mobileSearchRef}
          className="absolute top-full left-0 w-full px-4 pb-2 bg-white md:hidden z-10"
        >
          {/* <InputText
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-full h-9 border border-gray-300 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // press Enter
          /> */}
        </div>
      )}
    </header>
  );
};

export default Topbar;
