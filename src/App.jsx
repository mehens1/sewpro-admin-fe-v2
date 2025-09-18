import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Waitlist from "./pages/portal/waitList"
import Users from "./pages/portal/users/Users";
import Dashboard from "./pages/portal/Dashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/portal/Profile";
import { useSelector } from "react-redux";

function App() {

  const token = useSelector( (state) => state.auth.token);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/"
        element={
          <ProtectedRoute><Layout /></ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="waitList" element={<Waitlist />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="*"
        element={<h1 className="text-center mt-20">404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
