import React, { useEffect } from "react";
import { logoutUser } from "./actions/auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import hasToken from "./services/authService";

export const AdminRoute = ({ currentUser, dispatch }) => {
  console.log('[AdminRoute]', { currentUser, hasToken: hasToken() });
  if (!currentUser || currentUser.role !== 'admin' || !hasToken()) {
    console.warn('[AdminRoute] Redirecting to /template');
    return <Navigate to="/template" replace />;
  }
  console.log('[AdminRoute] Rendering Outlet');
  return <Outlet />;
};

export const UserRoute = ({ currentUser, dispatch }) => {
  const navigate = useNavigate();
  const token = hasToken();
  console.log('[UserRoute]', { currentUser, hasToken: token });

  useEffect(() => {
    if (!token) {
      console.warn('[UserRoute] No token, dispatching logout and redirecting to /login');
      if (dispatch) dispatch(logoutUser(navigate));
      navigate('/login', { replace: true });
    }
  }, [token, dispatch, navigate]);

  if (!token) {
    return null; // Don't render anything while redirecting
  }
  console.log('[UserRoute] Rendering Outlet');
  return <Outlet />;
};

export const AuthRoute = ({ currentUser, component: Component }) => {
  console.log('[AuthRoute]', { currentUser, hasToken: hasToken() });
  if (hasToken()) {
    console.warn('[AuthRoute] Has token, redirecting to /template');
    return <Navigate to="/template" replace />;
  }
  console.log('[AuthRoute] Rendering Auth Component');
  return Component ? <Component /> : <Outlet />;
};
