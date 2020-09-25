import React from "react";
import { Form, Input, Select, message, notification } from "antd";
import { Link, NavLink, Redirect } from "react-router-dom";
//import { MessageOutlined,  LikeOutlined, StarOutlined } from '@ant-designs';
import { connect } from "react-redux";
import Logo from '../assets/img/ExciteLogo.png'

import * as actions from "../store/actions/auth";
import ExciteNav from '../excite_components/General/sections/nav'
import Footer from "../excite_components/General/sections/footer";




export default function selectAccountype(){
    return(
        <>
        <ExciteNav />
        <div className="fitter">
            <div className="page-grid">

                    <div className="left">
                    <div className="accountBox">
                        

                            <div className="accountBox-content">
                                <div className="accountBox-content-image-container">
                                    <img 
                                    className="accountBox-content-image buyer-image"
                                    src='https://enterprise40.s3.eu-west-2.amazonaws.com/ExciteInfographs/Seller.png'/>
                                </div>

                                <div className="accountBox-text">
                                    <h3 className="accountBoxHeading">
                                    Customer
                                        </h3> 
                                    <p className="accaccountBoxParagraph">
                                    Register as a Customer and access more from Excite
                                    </p>
                                    <Link to="/buyer-signup">
                                    <button className="custom-button">
                                        Get Started
                                    </button>
                                    </Link>

                                </div>
                            </div>

                            
                        </div>
                    </div>

                    <div className="right">
                    
                    <div className="accountBox">
                        

                        <div className="accountBox-content">
                            <div className="accountBox-content-image-container">
                                <img 
                                className="accountBox-content-image seller-image"
                                src='https://enterprise40.s3.eu-west-2.amazonaws.com/ExciteInfographs/Seller.png' />
                            </div>

                            <div className="accountBox-text">
                                <h3 className="accountBoxHeading">
                                Vendor
                                    </h3> 
                                <p className="accaccountBoxParagraph">
                                Register as Vendor and access more from Excite
                                </p>
                               <Link to="/vendor-signup">
                               <button className="custom-button">
                                        Get Started
                                    </button>
                               </Link>
                            </div>
                        </div>

                        
                    </div>


                    </div>

            </div>
        </div>
        </>
    )
}