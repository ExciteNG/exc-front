import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Spring } from "react-spring";
// import {useSpring, animated} from 'react-spring'
import NavBarTwo from "./navbar";
import HalfHeader from "./sections/half-header";
import SearchBox from "./sections/search-box";
import Products from "./sections/featureShop";
import Footer from "./sections/footer";
import MultipleItems from "./sections/products";
import Items from "./sections/items";
export default function exciteEnterpriseHome() {
  return (
    <>
      <NavBarTwo />
      <HalfHeader />
      <SearchBox />
      <Items />
      <div className="fitter">
        <div className="page-grid">
          <div className="left">
            <h3 className="intro-header ">Start Selling Online for Free</h3>

            <p className="pText">
              Be visible! Obtain new customers and generate more traffic.
              Improve social media shares. Get reviews and grow business
              reputation online. Your company profile can include contacts and
            </p>

            <button className="custom-button">Get Started</button>
          </div>

          <div className="right">
            <div className="page-grid-image-container">
              <img
                className="page-grid-image"
                src="https://don16obqbay2c.cloudfront.net/wp-content/themes/ecwid/images/hpc/phc-slider-3_slide-1--layer2.png"
                alt="cont"
              />
            </div>
          </div>
        </div>

        <div className="page-grid">
          <div className="left">
            <div className="page-grid-image-container">
              <img
                className="page-grid-image"
                src="https://don16obqbay2c.cloudfront.net/wp-content/uploads/Home_page_Google_MC_FB-1591955663.png"
                alt="cont"
              />
            </div>
          </div>

          <div className="right">
            <h3 className="intro-header ">Grow faster</h3>

            <p className="pText">
              Be visible! Obtain new customers and generate more traffic.
              Improve social media shares. Get reviews and grow business
              reputation online. Your company profile can include contacts and
            </p>
            <button className="custom-button">Get Started</button>
          </div>
        </div>

        <div className="page-grid">
          <div className="left">
            <h3 className="intro-header ">Manage simply</h3>

            <p className="pText">
              Be visible! Obtain new customers and generate more traffic.
              Improve social media shares. Get reviews and grow business
              reputation online. Your company profile can include contacts and
            </p>
            <button className="custom-button">Get Started</button>
          </div>

          <div className="right">
          <div className="page-grid-image-container">
              <img
                className="page-grid-image"
                src="https://don16obqbay2c.cloudfront.net/wp-content/themes/ecwid/images/hpc/phc-slider-3_slide-1--layer2.png"
                alt="cont"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="number-counter">
        <div className="number-counter-container">
          <div className="number-counter-content"></div>
        </div>
      </div> */}

      
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

      <Footer />
    </>
  );
}
