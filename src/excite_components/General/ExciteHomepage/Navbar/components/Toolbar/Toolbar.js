import React, { Component } from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
import Logo from "./ExciteLogo.png";
import axios from "axios";
import { connect } from "react-redux";

class Toolbar extends Component {
  render() {
    const { token, isAuth } = this.props;

    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <a href="/">
              <img className="logo" src={Logo} alt="logo" />
            </a>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li className="nav-it">
                <a href="/marketplace">MarketPlace</a>
              </li>
              <li className="nav-it">
                <a href="/">Sell on excite</a>
              </li>
              {isAuth ? (
                <>
                  <li className="nav-it">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="nav-it">
                    <a href="/">logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-it">
                    <a href="/">Login</a>
                  </li>
                  <li>
                    <button class="nav-it navbar-button">Register</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(Toolbar);
