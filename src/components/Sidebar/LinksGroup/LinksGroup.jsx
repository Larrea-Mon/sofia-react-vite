import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse, Badge } from "reactstrap";
// import { Route } from "react-router"; // REMOVE: not needed in react-router v6
import classnames from "classnames";

import s from "./LinksGroup.module.scss";

const LinksGroup = (props) => {
  const location = useLocation();

  const {
    link = "",
    childrenLinks = null,
    header = "",
    classname = "",
    isHeader = false,
    deep = 0,
    activeItem = "",
    label = "",
    // exact = true, // REMOVE: not needed in react-router v6
    ...restProps
  } = props;

  const [headerLinkClicked, setHeaderLinkClicked] = useState(true);

  const togglePanelCollapse = (link, e) => {
    props.onActiveSidebarItemChange(link);
    setHeaderLinkClicked(
      !headerLinkClicked ||
        (props.activeItem && !props.activeItem.includes(props.index))
    );
    e.preventDefault();
  };

  const isOpen =
    props.activeItem &&
    props.activeItem.includes(props.index) &&
    headerLinkClicked;

  if (!props.childrenLinks) {
    if (props.isHeader) {
      return (
        <li className={[s.headerLink, props.className].join(" ")}>
          <NavLink
            to={props.link}
            className={({ isActive }) => isActive ? s.headerLinkActive : undefined}
            target={props.target}
          >
            <span className={s.icon}>{props.iconName}</span>
            {props.header}
            {props.label && (
              <sup className={`text-${props.labelColor || "warning"}`}>
                {props.label}
              </sup>
            )}
            {props.badge && (
              <Badge className={s.badge} color="secondary-red" pill>
                {props.badge}
              </Badge>
            )}
          </NavLink>
        </li>
      );
    }
    return (
      <li>
        <NavLink
          to={props.link}
          className={({ isActive }) => isActive ? s.headerLinkActive : undefined}
          onClick={(e) => {
            if (props.link.includes("menu")) {
              e.preventDefault();
            }
          }}
        >
          {<i className="fa fa-circle text-primary mr-2" />} {props.header}
        </NavLink>
      </li>
    );
  }

  return (
    <li className={classnames({ [s.headerLink]: props.isHeader }, props.className)}>
      <a
        className={classnames("d-flex", { [s.collapsed]: isOpen })}
        onClick={(e) => togglePanelCollapse(props.link, e)}
        href="#top"
      >
        {props.isHeader ? (
          <span className={s.icon}>{props.iconName}</span>
        ) : null}
        {props.header}{" "}
        {props.label && (
          <sup className={`text-${props.labelColor || "warning"} ml-1`}>
            {props.label}
          </sup>
        )}
        <b className={["fa fa-angle-right", s.caret].join(" ")} />
      </a>
      <Collapse className={s.panel} isOpen={isOpen}>
        <ul>
          {props.childrenLinks &&
            props.childrenLinks.map((child, ind) => (
              <LinksGroup
                onActiveSidebarItemChange={props.onActiveSidebarItemChange}
                activeItem={props.activeItem}
                header={child.header}
                link={child.link}
                index={child.index}
                childrenLinks={child.childrenLinks}
                deep={props.deep + 1}
                key={ind}
              />
            ))}
        </ul>
      </Collapse>
    </li>
  );
};

LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  childrenLinks: PropTypes.array,
  iconName: PropTypes.object,
  className: PropTypes.string,
  badge: PropTypes.string,
  label: PropTypes.string,
  activeItem: PropTypes.string,
  isHeader: PropTypes.bool,
  index: PropTypes.string,
  deep: PropTypes.number,
  onActiveSidebarItemChange: PropTypes.func,
  labelColor: PropTypes.string,
  // exact: PropTypes.bool, // REMOVE: not needed in react-router v6
};

export default LinksGroup;
