// src/components/routes/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" replace />; // must be logged in
  if (!user || (user.role || "").toLowerCase() !== "admin")
    return <Navigate to="/notadmin" replace />; // not admin -> redirect

  return children; // admin allowed
};

export default AdminRoute;
