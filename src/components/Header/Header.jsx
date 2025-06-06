import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";
import { logoutUser } from "../../actions/auth.jsx";
import { closeSidebar, openSidebar } from "../../actions/navigation.jsx";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon.jsx";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon.jsx";
import BellIcon from "../Icons/HeaderIcons/BellIcon.jsx";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon.jsx";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon.jsx";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon.jsx";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon.jsx";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }

  const doLogout = () => {
    props.dispatch(logoutUser(navigate));
  }

  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar())
    } else {
      props.dispatch(openSidebar());
    }
  }

  return (
    <Navbar className={`header-navbar d-print-none`}>
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3`}
          href="#"
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
      <Form className="d-none d-sm-block form-inline">
        <FormGroup>
          <InputGroup>
            <Input id="search-input" placeholder="Search Dashboard" className='focus no-border'/>
            <span className="input-group-text d-flex align-self-center px-3" style={{ background: 'none', border: 'none' }}>
              <SearchBarIcon/>
            </span>
          </InputGroup>
        </FormGroup>
      </Form>
      <Nav className="ml-auto">
        <NavItem className="d-sm-none mr-4">
          <NavLink
            className=""
            href="#"
          >
            <SearchIcon />
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={menuOpen} toggle={() => toggleMenu()} className="tutorial-dropdown mr-2 mr-sm-3">
          <DropdownToggle nav>
            <div className={s.navbarBlock}>
              <BellIcon maskId={114}></BellIcon>
              <div className={s.count}></div>
            </div>
          </DropdownToggle>
          <DropdownMenu end className="navbar-dropdown notifications-dropdown" style={{ width: "340px" }}>
            <DropdownItem><img src={basketIcon} alt="Basket Icon"/><span>12 new orders have arrived today</span></DropdownItem>
            <DropdownItem>
              <div>
                <div className="d-flex flex-row mb-1">
                  <img src={mariaImage} alt="Maria" className={s.mariaImage} />
                  <div className="d-flex flex-column">
                    <p className="body-3">Maria</p>
                    <p className="label muted">15 min ago</p>
                  </div>
                </div>
                <img src={notificationImage} alt="Notification Icon" className={s.notificationImage}/>
                <p className="body-2 muted">It is just a simple image that can define th..</p>
              </div>
            </DropdownItem>
            <DropdownItem><img src={calendarIcon} alt="Calendar Icon"/><span>1 event has been canceled and ...</span></DropdownItem>
            <DropdownItem><img src={envelopeIcon} alt="Envelope Icon"/><span>you have 2 new messages</span></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={notificationsOpen} toggle={() => toggleNotifications()} nav id="basic-nav-dropdown" className="ml-3">
          <DropdownToggle nav caret className="navbar-dropdown-toggle">
            <div className={`${s.avatar} rounded-circle float-left mr-2`}>
              <img src={userImg} alt="User"/>
            </div>
            <span className="small d-none d-sm-block ml-1 mr-2 body-1">Christina Carey</span>
          </DropdownToggle>
          <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
            <DropdownItem className={s.dropdownProfileItem}>
              <Link to="/template/user/profile">
                <ProfileIcon/><span>Profile</span>
              </Link>
            </DropdownItem>
            <DropdownItem className={s.dropdownProfileItem}><TasksIcon/><span>Tasks</span></DropdownItem>
            <DropdownItem className={s.dropdownProfileItem}><MessagesIcon/><span>Messages</span></DropdownItem>
            <DropdownItem className={s.dropdownProfileItem} onClick={doLogout} style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} alt="Logout" style={{marginRight: '6px'}}/>
              <span className="ml-1">Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default connect(mapStateToProps)(Header);

