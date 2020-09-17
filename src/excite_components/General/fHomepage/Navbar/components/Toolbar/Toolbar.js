import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import Logo from './ExciteLogo.png'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        
        <div className="toolbar__logo"><a href="/"><img  className="logo" src={Logo} /></a></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
                <li className="nav-it"><a href="/">MarketPlace</a></li>
                <li className="nav-it"><a href="/">Sell on excite</a></li>
                <li className="nav-it"><a href="/">Dashboard</a></li>
                <li className="nav-it"><a href="/">Login</a></li>
                <li className="nav-it"><a href="/">Register</a></li>
                <li><button class="navbar-button">Get started on Excite</button></li>

            </ul>
        </div>
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
    </nav>
  </header>
);

export default toolbar;
