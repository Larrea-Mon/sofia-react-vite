import React from "react";
import { connect } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminRoute, UserRoute, AuthRoute } from "./RouteComponents.jsx";

import ErrorPage from "./pages/error/ErrorPage.jsx";
import LayoutComponent from "./components/Layout/Layout.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Register from "./pages/auth/register/Register.jsx";
import DocumentationLayout from "./documentation/DocumentationLayout.js";

import "./styles/app.scss";

const App = (props) => {
  return (
    <div>
      <ToastContainer/>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/template/dashboard" replace />} />
          <Route path="/template" element={<Navigate to="/template/dashboard" replace />} />
          <Route path="/template/*" element={<UserRoute dispatch={props.dispatch} component={LayoutComponent} />} />
          <Route path="/admin/*" element={<AdminRoute currentUser={props.currentUser} dispatch={props.dispatch} component={LayoutComponent} />} />
          <Route path="/documentation" element={<Navigate to="/documentation/getting-started/overview" replace />} />
          <Route path="/documentation/*" element={<DocumentationLayout />} />
          <Route path="/login" element={<AuthRoute component={Login} />} />
          <Route path="/register" element={<AuthRoute component={Register} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/template/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loadingInit: state.auth.loadingInit
});

export default connect(mapStateToProps)(App);
