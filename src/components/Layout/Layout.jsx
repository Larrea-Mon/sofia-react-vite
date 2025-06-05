import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs.jsx";

import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/profile/Profile";
import UserListPage from "../Users/list/UsersListPage";
import UserViewPage from "../Users/view/UsersViewPage";
import ChangePasswordFormPage from "../Users/changePassword/ChangePasswordFormPage";
import UserFormPage from "../Users/form/UserFormPage";
import Typography from "../../pages/core/typography/Typography";
import Colors from "../../pages/core/colors/Colors";
import Grid from "../../pages/core/grid/Grid";
import Notifications from "../../pages/uielements/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import Alerts from "../../pages/uielements/alerts/Alerts";
import Badges from "../../pages/uielements/badges/Badges";
import Buttons from "../../pages/uielements/buttons/Buttons";
import Cards from "../../pages/uielements/cards/Cards";
import Carousel from "../../pages/uielements/carousel/Carousel";
import Charts from "../../pages/extra/charts/Charts";
import Jumbotron from "../../pages/uielements/jumbotron/Jumbotron";
import Icons from "../../pages/uielements/icons/IconsPage";
import Lists from "../../pages/uielements/lists/Lists";
import Navbars from "../../pages/uielements/navbar/Navbars";
import Navs from "../../pages/uielements/navs/Navs";
import Modal from "../../pages/uielements/modal/Modal";
import Progress from "../../pages/uielements/progress/Progress";
import Popover from "../../pages/uielements/popovers/Popovers";
import Elements from "../../pages/forms/elements/Elements";
import Validation from "../../pages/forms/validation/Validation";
import Wizard from "../../pages/forms/wizard/Wizard";
import BarCharts from "../../pages/charts/bar/BarCharts";
import LineCharts from "../../pages/charts/line/LineCharts";
import PieCharts from "../../pages/charts/pie/PieCharts";
import OtherCharts from "../../pages/charts/other/OtherCharts";
import Maps from "../../pages/maps/google/GoogleMapPage";
import VectorMap from "../../pages/maps/vector/Vector";
import Calendar from "../../pages/calendar/Calendar";
import Login from "../../pages/auth/login/Login";
import Register from "../../pages/auth/register/Register";
import NodeOnlyPage from "../../pages/admin/NodeOnlyPage";
import s from "./Layout.module.scss";

const Layout = (props) => {

  const location = useLocation();
  // Debug output to verify Layout is rendering and which route is active
  console.log('[Layout] Rendered at', new Date().toISOString(), 'pathname:', location.pathname, 'window.location:', window.location.href);
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={location.pathname} />
          <Routes>
            {/* DEBUG: This Layout is rendering. If you see this in the console, Layout is active for this route. */}
            {/* Admin/User Management routes (relative, for /admin/* context) */}
            <Route path="nodeonlypage" element={<NodeOnlyPage />} />
            <Route path="users" element={<Navigate to="/admin/nodeonlypage" replace />} />
            <Route path="users/new" element={<UserFormPage />} />
            <Route path="users/:id/edit" element={<UserFormPage />} />
            <Route path="users/:id" element={<UserViewPage />} />
            <Route path="" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/" element={<Dashboard />} />
            <Route path="user" element={<Navigate to="user/profile" replace />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="../admin" element={<Navigate to="../admin/users" replace />} />
            <Route path="../admin/users" element={<NodeOnlyPage />} />
            <Route path="../admin/users/new" element={<NodeOnlyPage />} />
            <Route path="../admin/users/:id/edit" element={<NodeOnlyPage />} />
            <Route path="../admin/users/:id" element={<NodeOnlyPage />} />
            <Route path="password" element={<ChangePasswordFormPage />} />
            <Route path="edit_profile" element={<UserFormPage />} />
            <Route path="core" element={<Navigate to="core/typography" replace />} />
            <Route path="core/typography" element={<Typography />} />
            <Route path="core/colors" element={<Colors />} />
            <Route path="core/grid" element={<Grid />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="tables" element={<Tables />} />
            <Route path="ui-elements" element={<Navigate to="ui-elements/alerts" replace />} />
            <Route path="ui-elements/alerts" element={<Alerts />} />
            <Route path="ui-elements/badges" element={<Badges />} />
            <Route path="ui-elements/buttons" element={<Buttons />} />
            <Route path="ui-elements/cards" element={<Cards />} />
            <Route path="ui-elements/carousel" element={<Carousel />} />
            <Route path="ui-elements/jumbotron" element={<Jumbotron />} />
            <Route path="ui-elements/icons" element={<Icons />} />
            <Route path="ui-elements/lists" element={<Lists />} />
            <Route path="ui-elements/modal" element={<Modal />} />
            <Route path="ui-elements/navbars" element={<Navbars />} />
            <Route path="ui-elements/navs" element={<Navs />} />
            <Route path="ui-elements/notifications" element={<Notifications />} />
            <Route path="ui-elements/progress" element={<Progress />} />
            <Route path="ui-elements/popovers" element={<Popover />} />
            <Route path="forms" element={<Navigate to="forms/elements" replace />} />
            <Route path="forms/elements" element={<Elements />} />
            <Route path="forms/validation" element={<Validation />} />
            <Route path="forms/wizard" element={<Wizard />} />
            <Route path="charts" element={<Navigate to="charts/other" replace />} />
            <Route path="charts/line" element={<LineCharts />} />
            <Route path="charts/pie" element={<PieCharts />} />
            <Route path="charts/bar" element={<BarCharts />} />
            <Route path="charts/other" element={<OtherCharts />} />
            <Route path="maps" element={<Navigate to="maps/google" replace />} />
            <Route path="maps/google" element={<Maps />} />
            <Route path="maps/vector" element={<VectorMap />} />
            <Route path="extra" element={<Navigate to="extra/charts" replace />} />
            <Route path="extra/charts" element={<Charts />} />
            <Route path="extra/login" element={<Login />} />
            <Route path="extra/register" element={<Register />} />
            <Route path="../register" element={<Register />} />
            <Route path="*" element={<Navigate to="/error" replace />} /> 
            {/*
            FROM HERE
            TO HERE
            */}
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Layout);
