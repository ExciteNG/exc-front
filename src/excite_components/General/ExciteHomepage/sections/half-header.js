import React from 'react'
import { faHome, faSearchLocation, faShoppingBasket, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'

import BuyerPic from '../../../../assets/img/Buyer.jpg'
import SellerPic from '../../../../assets/img/Seller.jpg'
// 

export default function HalfHeader() {
    return (
       <div className="half-flex-box">
            <div className="half-flex">
            <div className="half-box half-box-1"  style={{backgroundImage: `url(${BuyerPic})`}}>
                <h1> For Buyers</h1>
                <p className="h-box-text">
                    Take advantage of the Excite platform to for your products and services right to your buyers
                </p>
                <div className="half-content half-content-1" >
                    <div className="half-content-boxes">
                    <span className="icon-spacer">
                        <FontAwesomeIcon icon={faShoppingBasket} style={{fontSize: '2rem', fontWeight:'0'}} />
                    </span>
                        <div className="h-content">
                          <a href="/search-page">
                              <p className="half-content-text">Find a service</p>
                          </a>
                        </div>
                    </div>
                    <div className="half-content-boxes" >
                        <span className="icon-spacer"> <FontAwesomeIcon icon={faServer} style={{fontSize: '2rem'}} /> </span>
                        <div className="h-content">
                            <a href="/categories/electronics">
                              <p className="half-content-text"> Buy a product</p>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className="half-box half-box-2" style={{backgroundImage: `url(${SellerPic})`}}>
                <h1> For Sellers</h1>
                <p className="h-box-text">
                    Take advantage of the Excite platform to for your products and services right to your buyers
                </p>
                <div className="half-content half-content-2">
                    <div className="half-content-boxes">
                    <span className="icon-spacer"> <FontAwesomeIcon icon={faShoppingBasket} style={{fontSize: '2rem'}} /> </span>
                        <div className="h-content">
                          <a href="/user_uploads/">
                            <p className="half-content-text"> List your Business</p>
                          </a>
                        </div>
                    </div>
                    <div className="half-content-boxes" >
                        <span className="icon-spacer"> <FontAwesomeIcon icon={faServer} style={{fontSize: '2rem'}} /> </span>
                        <div className="h-content">
                          <a href="/campaign-list/">
                            <p className="half-content-text">Promote your business </p>
                          </a>
                        </div>
                    </div>
                    <div className="half-content-boxes">
                    <span className="icon-spacer"> <FontAwesomeIcon icon={faSearchLocation} style={{fontSize: '2rem'}} /> </span>
                    <div className="h-content">
                        <a href="/SME-funding">
                            <p className="half-content-text"> Manage your business</p>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}
