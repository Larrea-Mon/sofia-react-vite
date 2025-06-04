import React from "react";
import { logoutUser } from "./actions/auth";
import { Navigate, Outlet } from "react-router-dom";
import hasToken from "./services/authService";

export const AdminRoute = ({ currentUser, dispatch }) => {
  if (!currentUser || currentUser.role !== 'admin' || !hasToken()) {
    return <Navigate to="/template" replace />;
  }
  return <Outlet />;
};

export const UserRoute = ({ currentUser, dispatch }) => {
  if (!hasToken()) {
    if (dispatch) dispatch(logoutUser());
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export const AuthRoute = ({ currentUser }) => {
  if (hasToken()) {
    return <Navigate to="/template" replace />;
  }
  return <Outlet />;
};
