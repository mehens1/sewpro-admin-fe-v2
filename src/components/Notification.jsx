import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { fetchNotifications } from "../services/notificationService";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function loadNotifications() {
      const data = await fetchNotifications();
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, unread: false }))
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
  <div className="relative" ref={dropdownRef}>
  <button onClick={toggleOpen} className="relative focus:outline-none">
    <FaBell className="text-gray-700 text-lg mr-2 md:mr-8 mt-2" />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 mr-2 md:mr-8 bg-red-500 text-white text-[8px] rounded-full px-1 z-10 mt-2">
        {unreadCount}
      </span>
    )}
  </button>
      {open && (
        <div className="absolute right-1  mt-2 w-56 rounded-md overflow-hidden z-50 border border-gray-200 shadow-lg bg-white">
          <div className="px-4 py-2 font-semibold bg-gray-100 text-gray-700">
            Notifications
          </div>
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <li
                  key={note.id}
                  className={`px-4 py-2 text-sm hover:bg-gray-50 ${
                    note.unread ? "font-semibold" : "text-gray-600"
                  }`}
                >
                  {note.text}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
