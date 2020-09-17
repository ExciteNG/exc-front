import React, { Component } from "react";
import TemporaryDrawer from "../Sidebar/SideNav";
import CampTable from "./Table/table";
import CampaignBox from './data-box'
import BasicTable from './Table/new-table'

export default class CampaignTwo extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <div className="main">
          <div className="fitter">
            <div className="campaignbox-section">
              <div className="campaignbox-container">
                <div className="campaignbox-image-container">
                  <img
                    src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg"
                    class="campaignbox-image"
                  />
                </div>
                <div className="campaignbox-content">
                  <h3 class="campaignbox-heading">
                    Advertise across soclal media with Excite
                  </h3>
                  <p class="campaignbox-text">
                    Excite in a few simple steps. Just set a budget and your
                    target audience to start your Shopping advertising campaign.
                  </p>
                  <a href="/create-campaign">
                    <button class="custom-button">Create Campaign</button>
                  </a>
                </div>
              </div>

              <div className="campaignbox-container">
                <div className="campaignbox-image-container">
                  <img
                    src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg"
                    class="campaignbox-image"
                  />
                </div>
                <div className="campaignbox-content">
                  <h3 class="campaignbox-heading">
                    Advertise across soclal media with Excite
                  </h3>
                  <p class="campaignbox-text">
                    Excite in a few simple steps. Just set a budget and your
                    target audience to start your Shopping advertising campaign.
                  </p>
                  <a href="/create-trend">
                    <button class="custom-button">Create Trend</button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="fitter">
            <BasicTable />
          </div>

        </div>
      </div>
    );
  }
}
