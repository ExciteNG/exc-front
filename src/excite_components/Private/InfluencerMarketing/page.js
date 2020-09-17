import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'

class InfluencerMarketingPage extends Component {

    state ={
        categories:[] ,
        loading: true,
    }

    render (){
        return (
            <>
              {/* <TemporaryDrawer /> */}
                <div className="container">
                        <section className="sec-box">
                            <div className="s-grid">
                                <div className="center">
                                    <h4>
                                        Influencer  Marketing
                                    </h4>
                                    <p>
                                        Every product needs a customer.
                                        Use the best marketing practices to acquire new customers, 
                                        raise the average order value, and keep buyers coming back for more.j
                                    </p>
                                </div>

                            </div>

                            <div className="p-grid">
                                <div className="left">
                                        <div className="h-box">
                                            <div className="h-box h-left">
                                                <div>
                                                    <h3 >
                                                        Advertise across soclal media with Excite
                                                    </h3>
                            
                                                    <p>
                                                        Use the automated Google Shopping Ads to advertise on Google in a few simple steps.
                                                        Just set a budget and your target audience to start your Google Shopping advertising campaign.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-box h-right">
                                                <div>
                                                    <button className="c-button">
                                                        Created Trend
                                                    </button>
                                                </div>
                                                
                                            </div>

                                        </div>
                                </div>

                                <div className="right">
                                    <div className="h-box">
                                        <div className="h-box h-left">
                                            <div>
                                                <h3>
                                                    Advertise across soclal media with Excite
                                                </h3>

                                                <p>
                                                    Use the automated Google Shopping Ads to advertise on Google in a few simple steps.
                                                    Just set a budget and your target audience to start your Google Shopping advertising campaign.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="h-box h-right">
                                            <div>
                                                <button className="c-button">
                                                    Created Trend
                                                </button>
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>

                            </div>
                                </section>
                </div>
            </>
        )
    }

}

export default InfluencerMarketingPage