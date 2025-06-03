import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";

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
import Navbars from "../../pages/uielements/navbar/Navbars"
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

import s from "./Layout.module.scss";

const Layout = (props) => {
  const location = useLocation();
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={location.pathname} />
          <Routes>
            <Route path="/template" element={<Navigate to="/template/dashboard" replace />} />
            <Route path="/template/dashboard" element={<Dashboard />} />
            <Route path="/template/user" element={<Navigate to="/template/user/profile" replace />} />
            <Route path="/template/user/profile" element={<Profile />} />
            <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/users/new" element={<UserFormPage />} />
            <Route path="/admin/users/:id/edit" element={<UserFormPage />} />
            <Route path="/admin/users/:id" element={<UserViewPage />} />
            <Route path="/template/password" element={<ChangePasswordFormPage />} />
            <Route path="/template/edit_profile" element={<UserFormPage />} />
            <Route path="/template/core" element={<Navigate to="/template/core/typography" replace />} />
            <Route path="/template/core/typography" element={<Typography />} />
            <Route path="/template/core/colors" element={<Colors />} />
            <Route path="/template/core/grid" element={<Grid />} />
            <Route path="/template/calendar" element={<Calendar />} />
            <Route path="/template/tables" element={<Tables />} />
            <Route path="/template/ui-elements" element={<Navigate to="/template/ui-elements/alerts" replace />} />
            <Route path="/template/ui-elements/alerts" element={<Alerts />} />
            <Route path="/template/ui-elements/badges" element={<Badges />} />
            <Route path="/template/ui-elements/buttons" element={<Buttons />} />
            <Route path="/template/ui-elements/cards" element={<Cards />} />
            <Route path="/template/ui-elements/carousel" element={<Carousel />} />
            <Route path="/template/ui-elements/jumbotron" element={<Jumbotron />} />
            <Route path="/template/ui-elements/icons" element={<Icons />} />
            <Route path="/template/ui-elements/lists" element={<Lists />} />
            <Route path="/template/ui-elements/modal" element={<Modal />} />
            <Route path="/template/ui-elements/navbars" element={<Navbars />} />
            <Route path="/template/ui-elements/navs" element={<Navs />} />
            <Route path="/template/ui-elements/notifications" element={<Notifications />} />
            <Route path="/template/ui-elements/progress" element={<Progress />} />
            <Route path="/template/ui-elements/popovers" element={<Popover />} />
            <Route path="/template/forms" element={<Navigate to="/template/forms/elements" replace />} />
            <Route path="/template/forms/elements" element={<Elements />} />
            <Route path="/template/forms/validation" element={<Validation />} />
            <Route path="/template/forms/wizard" element={<Wizard />} />
            <Route path="/template/charts" element={<Navigate to="/template/charts/other" replace />} />
            <Route path="/template/charts/line" element={<LineCharts />} />
            <Route path="/template/charts/pie" element={<PieCharts />} />
            <Route path="/template/charts/bar" element={<BarCharts />} />
            <Route path="/template/charts/other" element={<OtherCharts />} />
            <Route path="/template/maps" element={<Navigate to="/template/maps/google" replace />} />
            <Route path="/template/maps/google" element={<Maps />} />
            <Route path="/template/maps/vector" element={<VectorMap />} />
            <Route path="/template/extra" element={<Navigate to="/template/extra/charts" replace />} />
            <Route path="/template/extra/charts" element={<Charts />} />
            <Route path="/template/extra/login" element={<Login />} />
            <Route path="/template/extra/register" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
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
