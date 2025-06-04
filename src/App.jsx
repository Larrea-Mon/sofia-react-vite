import React from "react";
import { connect } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminRoute, UserRoute, AuthRoute } from "./RouteComponents.js";

import ErrorPage from "./pages/error/ErrorPage.jsx";
import LayoutComponent from "./components/Layout/Layout.jsx"; //<- error de memoria
import Login from "./pages/auth/login/Login.jsx";
import Register from "./pages/auth/register/Register.jsx";
import DocumentationLayout from "./documentation/DocumentationLayout.jsx"; //<- mala compilacion

import "./styles/app.scss";

function App() {
  return <div>Hello World</div>;
}
export default App;
