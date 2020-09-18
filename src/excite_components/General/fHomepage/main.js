import React from "react";
import { Link } from "react-router-dom";

import HomeCard from "./sections/cards";
import NewFooter from "./sections/footer";
import SearchBox from "./sections/search-box";
import Products from "./sections/featureShop";
import NavBarTwo from "./navbar";
import HalfHeader from "./sections/half-header";
import SlideTwo from "./sections/new-slide";

export default function featureHomeContent(props) {
  return (
    <>
      <NavBarTwo />
      <HalfHeader />

      <div className="">
        <div className="new-container">
          <SearchBox />
        </div>
        <div className="fitter">
          <div className="products-fluid-container">
            <Products />
          </div>
        </div>
        <div className="new-container">
          <SlideTwo />
        </div>
        <HomeCard />

        <div className="signUp-section">
          <div className="signUp-field">
            <div className="signUp-container">
              <h3 className="signUp-container-header">
                Start Selling Online for Free
              </h3>

              <Link to="/vendor-signup">
                <button className="get-started-button">
                  Get started for free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NewFooter />
    </>
  );
}
