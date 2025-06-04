import React from "react";
import { connect } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminRoute, UserRoute, AuthRoute } from "./RouteComponents.js";

import ErrorPage from "./pages/error/ErrorPage.js";
import LayoutComponent from "./components/Layout/Layout.js"; //<- error de memoria
import Login from "./pages/auth/login/Login.js";
import Register from "./pages/auth/register/Register.js";
import DocumentationLayout from "./documentation/DocumentationLayout.js"; //<- mala compilacion

import "./styles/app.scss";

function App() {
  return <div>Hello World</div>;
}
export default App;

// Cambia esta AppFake por App para testear performance 
// Al hacer el cambio renombra App.js a AppReal.js y AppFake.js a App.js