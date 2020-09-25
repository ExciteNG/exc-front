import React , {Component,  createElement, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";

import TemporaryDrawer from '../Sidebar/SideNav'

import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'http://127.0.0.1:8000';



class vendorCampaign extends Component {

    state = {
        campaignList : [],
        notEmpty : false ,
        loading:true ,
        error : null ,

        AllowUser:true,

    }

        getCampaign = async(token)=>{
       const endpoint = host + '/management/c-list/'
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    campaignList: res.data,
                    loading:false 
                })
                let campaignList = this.state.campaignList
                if (campaignList.length > 0){
                    this.setState({
                        notEmpty:true    
                    })
                }
               console.log('THE Campaigns' ,res.data)
            }
        })
    }

    redirect_page=()=>{
    
      const endpoint = '/create-campaign'
      this.props.history.push('/create-campaign')
     // window.location.replace(endpoint)
     }
     
     redirect_page2=()=>{
    
      const endpoint = '/create-trend'
      this.props.history.push(endpoint)
     // window.location.replace(endpoint)
     }


    //Verifies Membership
    GrantUser = false
    accountType = async (token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + '/stream/user_membership'
      await axios.get(endpoint)
      .then(res=>{
          const planMode = res.data[0].membership
          console.log('the plan',planMode)
          if (planMode=='Basic' || planMode == 'Premium'){
            this.setState({
              AllowUser:true
            })
            console.log(this.state.AllowUser)
            this.GrantUser = true
        }else{
            this.setState({
                AllowUser:false
              })
        }
      })
    }
     

    componentDidMount(){
      //  this.User_Data(this.props.token)
        if (this.props.token !== undefined && this.props.token !== null) {
            this.getCampaign(this.props.token)
          }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getCampaign(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {campaignList ,notEmpty, AllowUser} = this.state
        
        return(
            <>

            <TemporaryDrawer/>

            <div className="main">
        

            <div className='fitter'>

            <ul class="campaignbox-section">

                        <li className="campaignbox-container">
                                    <div className="campaignbox-image-container">
                                        <img
                                       src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg"
                                        className="campaignbox-image"
                                        />
                                </div>
                        
                                    <div class="campaignbox-content">
                                        
                                        <h3 className="campaignbox-heading">
                                             Advertise across soclal media with Excite
                                             </h3>
                                        <p className="campaignbox-text">
                                        Excite in a few simple steps.
                                                    Just set a budget and your target
                                                        audience to start your  Shopping advertising campaign.
                                        </p>

                                            <Link to="/create-campaign">
                                            <button 
                                                    onClick={this.redirect_page2}
                                                    className="custom-button">
                                                        Create Campaign
                                                    </button>
                                            </Link>


                                    </div>
                   </li>


                   <li className="campaignbox-container">
                                    <div className="campaignbox-image-container">
                                        <img
                                       src="https://vconnectdesign.bitbucket.io/img/about/product-pool-banner.svg"
                                        className="campaignbox-image"
                                        />
                                </div>
                        
                                    <div class="campaignbox-content">
                                        
                                        <h3 className="campaignbox-heading">
                                             Advertise across soclal media with Excite
                                             </h3>
                                        <p className="campaignbox-text">
                                        Excite in a few simple steps.
                                                    Just set a budget and your target
                                                        audience to start your  Shopping advertising campaign.
                                        </p>

                                                <Link to="/create-trend">
                                                <button 
                                                    onClick={this.redirect_page2}
                                                    className="custom-button">
                                                        Create Trend 
                                                    </button>
                                                </Link>
                                            
                                    </div>
                   </li>
                        </ul>
                
            </div>

          

           
            <div className="fitter">
                        <span>
                        <h3 className="" style={{fontSize:23}}>
                        My Campaigns
                        </h3>
                      </span>


                    <div className="single-grid">
                            
                        {
                            notEmpty ? (
                                <>
                                <div className="Campaign-post-list">
                                {
                                campaignList.map((item)=>(
                                               <>
                                             
                                             <div className="post-box">
                                                <div className="post-image">
                                                    <img className="post-image-render"
                                                        href={`/categories/${item.category}/${item.id}`}
                                                        src={item.CampaignImage1}
                                                        />
                                                </div>    
                                                <div className="post-content-prime">
                                                    <div className="post-content-header">
                                                    <a  
                                                    style={{color:"#434343"}}
                                                    href={`/campaign-detail/${item.id}`} >
                                                    <p>
                                                    {item.CampaignName}
                                                    </p>
                                                    </a>
                                                    
                                                    </div>
                                                
                                                   
                                                    <div className="post-content-body">
                                                        
                                                        <br/>
                                                        <p>
                                                        <a 
                                                       href={`/campaign-detail/${item.id}`}
                                                        style={{color:"#434343"}} >
                                                       {item.CampaignDescription}
                                                        </a>
                                                        </p>
                                                    </div>
                                                    <div className="post-content-price">
                                                    <a  
                                                    style={{color:"#434343"}}
                                                    >
                                                    {item.ProposalDate}
                                                    </a>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            
                                               </>
                                                ))
                                            } 
                                            </div>
                                </>
                  
                            ) : (
                                <>
                                  <div className="content-empty">
                                    <div className="content-empty-image-container">
                                        <p className="content-empty-text">
                                            You have no campaigns running yet
                                        </p>
                                        <img
                                        className="content-empty-image"
                                            src="https://enterprise40.s3.eu-west-2.amazonaws.com/ExciteInfographs/Empty.png"
                                        />  
                                        </div>
                                </div>
                                </>
                            )
                        }
                         
                    </div>
                </div>
            </div>

            </>
        )
    }


}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode
    };
};

//const mapDispatchToProps = dispatch => {
  //return {
    //member: () => dispatch(getMembership())
//}
//}
  
export default connect(
    mapStateToProps,
    //mapDispatchToProps
)(vendorCampaign)