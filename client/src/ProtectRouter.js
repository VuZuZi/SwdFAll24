import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "./shared/Toast";

// Public protection
export function ProtectedRouter() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function AdminProtectedRouter() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? (
    currentUser.isAdmin ? (
      <Outlet />
    ) : (
      <>
        {Toast("Just admin can add movie", "ERROR")}
        <Navigate to="/" />
      </>
    )
  ) : (
    <Navigate to="/login" />
  );
}
