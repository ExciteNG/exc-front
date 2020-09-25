import React from "react";
import Slider from "react-slick";

export default function Items() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <div className="product-item-container">
        <div className="home-product-card-grid">
          <Slider {...settings}>
            <div className="home-products-card">
              <div className="home-products-card-img">
                <img
                  src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="ek"
                />
              </div>
              <p className="home-products-card-name">Samsung galaxy A51</p>
              <p className="home-products-card-price">$44</p>
              <p className="home-products-card-seller">
                sold by <a>Admin</a>
              </p>
              <div className="home-products-card-button">VIEW</div>
            </div>
            <div className="home-products-card">
              <div className="home-products-card-img">
                <img
                  src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="ek"
                />
              </div>
              <p className="home-products-card-name">Samsung galaxy A51</p>
              <p className="home-products-card-price">$44</p>
              <p className="home-products-card-seller">
                sold by <a>Admin</a>
              </p>
              <div className="home-products-card-button">VIEW</div>
            </div>
            <div className="home-products-card">
              <div className="home-products-card-img">
                <img
                  src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="ek"
                />
              </div>
              <p className="home-products-card-name">Samsung galaxy A51</p>
              <p className="home-products-card-price">$44</p>
              <p className="home-products-card-seller">
                sold by <a>Admin</a>
              </p>
              <div className="home-products-card-button">VIEW</div>
            </div>
            <div className="home-products-card">
              <div className="home-products-card-img">
                <img
                  src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="ek"
                />
              </div>
              <p className="home-products-card-name">Samsung galaxy A51</p>
              <p className="home-products-card-price">$44</p>
              <p className="home-products-card-seller">
                sold by <a>Admin</a>
              </p>
              <div className="home-products-card-button">VIEW</div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
