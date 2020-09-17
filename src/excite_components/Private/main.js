import React, { Component } from "react";
import TemporaryDrawer from "./Sidebar/SideNav";


export default class MainDash extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <div className="main">
            <div className="new-card-grid">
                <ul className="new-cards-container">
                    <li className="new-cards-list">
                    <div className="new-cards-box new-green">
                      <h3 className="new-card-title-override">
                        Account Tpye
                      </h3>
                      <p className="new-card-text">
                       membership
                      </p>
                      </div>
                    </li>
                    <li className="new-cards-list">
                    <div className="new-cards-box new-green">
                      <h3 className="new-card-title-override">
                        Account Tpye
                      </h3>
                      <p className="new-card-text">
                       membership
                      </p>
                      </div>
                    </li>
                    <li className="new-cards-list">
                    <div className="new-cards-box new-green">
                      <h3 className="new-card-title-override">
                        Account Tpye
                      </h3>
                      <p className="new-card-text">
                       membership
                      </p>
                      </div>
                    </li>
                </ul>
            </div>

            <div className="dashboard-content-fitter">
                <div className="demo-boxes">
                    <div className="demo-card-box">
                        <img class="demo-card-image" src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg" />
                            <div className="demo-card-content">
                                <h2>Upload a Product</h2>
                                <p className="demo-card-text">Upload a new products on excite</p>
                                <button className="demo-card-box-button">Open</button>
                            </div>
                    </div>

                    <div className="demo-card-box">
                        <img class="demo-card-image" src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg" />
                            <div className="demo-card-content">
                                <h2>Upload a Product</h2>
                                <p className="demo-card-text">Upload a new products on excite</p>
                                <button className="demo-card-box-button">Open</button>
                            </div>
                    </div>
                </div>
              
                
            </div>

        </div>
      </div>
    );
  }
}
