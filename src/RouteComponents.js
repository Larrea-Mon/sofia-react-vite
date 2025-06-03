import React from "react";
import { logoutUser } from "./actions/auth";
import { Redirect, Route } from "react-router";
import { useNavigate } from "react-router-dom";
import hasToken from "./services/authService";

export const AdminRoute = ({ currentUser, dispatch, component, ...rest }) => {
  if (!currentUser || currentUser.role !== 'admin' || !hasToken()) {
    return (<Redirect to="/template"/>)
  } else if (currentUser && currentUser.role === 'admin') {
    return (
      <Route {...rest} render={props => (React.createElement(component, props))}/>
    );
  }
};

export const UserRoute = ({ dispatch, component, ...rest }) => {
  const navigate = useNavigate();
  if (!hasToken()) {
    dispatch(logoutUser(navigate));
    return (<Redirect to="/login"/>)
  } else {
    return (
      <Route {...rest} render={props => (React.createElement(component, props))}/>
    );
  }
};

export const AuthRoute = ({ dispatch, component, ...rest }) => {
  const { from } = rest.location.state || { from: { pathname: '/template'} };

  if (hasToken()) {
    return (
      <Redirect to={from} />
    );
  } else {
    return (
      <Route {...rest} render={props => (React.createElement(component, props))}/>
    )
  }
}
