import React, { Component, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import styles from './NavMenu.module.scss';
import Logo from "../../assets/logo.png";
export default function NavMenu() {
  const [collapsed, setCollapsed] = useState(true);
  function toggleNavbar() {
    setCollapsed(!collapsed);
  }

  return (
    <header>
      <Navbar
        className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom mb-3 ${styles.topNav}`}
        container
        light
      >
        <NavbarBrand tag={Link} to="/">
          <img src={Logo} alt="DR HeineKamp" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
         <strong>E Doc </strong>
        </Collapse>
      </Navbar>
    </header>
  );
}
