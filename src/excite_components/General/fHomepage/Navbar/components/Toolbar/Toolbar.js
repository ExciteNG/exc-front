import React from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
import Logo from "./ExciteLogo.png";

const toolbar = (props) => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__logo">
        <a href="/">
          <img className="logo" src={Logo} />
        </a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li className="nav-it">
            <a href="/categories/electronics">MarketPlace</a>
          </li>
          <li className="nav-it">
            <a href="/user_uploads/">Sell on excite</a>
          </li>
          <li className="nav-it">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-it">
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">
              <button class="navbar-button">Register</button>
            </a>
          </li>
        </ul>
      </div>
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
    </nav>
  </header>
);

export default toolbar;
