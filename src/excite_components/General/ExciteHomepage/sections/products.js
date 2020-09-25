import React, { Component } from "react";
import Slider from "react-slick";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <div>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="p-card">
              <div className="p-image">
                {/* <img className="p-item-image" src alt="img" /> */}
              </div>
              <div className="p-info">
                <div className="p-name">
                  <p className="p-name-title">1</p>
                </div>
                <div className="p-info-2">
                  <p className="f-product-seller">Admin</p>

                  <p className="f-product-price">₦1000</p>

                  <button className="f-product-button">
                    <p className="f-product-button-name">View</p>
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        </Slider>
      </div>
    );
  }
}
