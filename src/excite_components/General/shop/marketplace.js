import React, { Component } from "react";
import FilterForm from "./filter";

export default class Marketplace extends Component {
  render() {
    return (
      <>
        <div className="marketplace-flex">
          <div className="marketplace-flex-a">
            <FilterForm />
          </div>
          <div className="marketplace-flex-b">
            <div>
              <div className="marketplace-item-grid">
                <div className="marketplace-item-card">
                  <div className="marketplace-item-img">
                    <img src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="img" />
                  </div>
                  <div className="marketplace-item-name">Lorem Ipsom</div>
                  <div className="marketplace-item-price">Lorem price</div>
                  <div className="marketplace-item-seller">Lorem prie</div>
                  <div className="marketplace-item-button">VIEW</div>
                </div>
                <div className="marketplace-item-card">
                  <div className="marketplace-item-img">
                    <img src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                  </div>
                  <div className="marketplace-item-name">Lorem Ipsom</div>
                  <div className="marketplace-item-price">Lorem price</div>
                  <div className="marketplace-item-seller">Lorem prie</div>
                  <div className="marketplace-item-button">VIEW</div>
                </div>
                <div className="marketplace-item-card">
                  <div className="marketplace-item-img">
                    <img src="https://images.unsplash.com/photo-1442458017215-285b83f65851?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                  </div>
                  <div className="marketplace-item-name">Lorem Ipsom</div>
                  <div className="marketplace-item-price">Lorem price</div>
                  <div className="marketplace-item-seller">Lorem prie</div>
                  <div className="marketplace-item-button">VIEW</div>
                </div>
                <div className="marketplace-item-card">
                  <div className="marketplace-item-img">
                    <img src="https://images.unsplash.com/photo-1442458017215-285b83f65851?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                  </div>
                  <div className="marketplace-item-name">Lorem Ipsom</div>
                  <div className="marketplace-item-price">Lorem price</div>
                  <div className="marketplace-item-seller">Lorem prie</div>
                  <div className="marketplace-item-button">VIEW</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
