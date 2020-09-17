import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import PortalWebTable from './store/tables'
import EmailBuilder from './store/email'
import  PageDemo from './store/Preview'

const host = 'https://backend-entr.herokuapp.com';

class webCreatePortal extends Component{
    state = {
        AllowUser:false,
        websiteList : [] ,
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
         }
       })
    }
     
    
    vendorWebsiteList =async(token)=>{
 
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      
      const endpoint = host + '/management/vendor-temp-list'
      await axios.get(endpoint)
      .then(res=>{
          if (res.status == 200){
            this.setState({
              websiteList:res.data
            })
            console.log('this is the data',res.data)
          }else{

          }
      })
    }
       
       componentDidMount(){
          
        if (this.props.token !== undefined && this.props.token !== null){
             this.accountType(this.props.token)
             this.vendorWebsiteList(this.props.token)
        }  
      }

   componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
                 this.accountType(newProps.token )
                 this.vendorWebsiteList(newProps.token )
                 
                 
          }
        }
      }


     render(){
         const {AllowUser ,websiteList} = this.state
         const Passer = true
         return(
             <>
            
                {
                    Passer ? (
                        <>
                            <TemporaryDrawer/>
                            <div className="main">

                              <div className="fitter">

                              <div className="page-grid">
                       <div className="left">
                      
                          <div className="">
                                <h3 className="intro-header ">
                               Build a Web Page 
                            </h3>

                              <p className="pText">
                              Join hundreds of thousands of small businesses
                              in creating a website hosted by exciteds. 
                              </p>

                              <Link to={`/websitebuilder`}>
                              <button
                            onClick={this.redirect_page}
                              class="custom-button" >
                                  Get Started
                            </button>
                              </Link>
                              
                             
                          </div>

                       </div>


                          <div className="right">
                              
                          </div>
                   </div>
                                
                                </div>    

                               
                              <div className="fitter">
                                <PortalWebTable data={websiteList} />
                              </div>

                                
                            </div>
                            
                        </>
                    ) : (
                        <>

                              <TemporaryDrawer/>
                        <div className="main">
                               <div className="fiitter">
                                    <div className="single-grid">
                                        <p>
                                       
                                        </p >
                                    </div>
                                </div>
                               </div>
                        </>
                    )
                }
            
             </>
         )
     }

}


const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
     is_seller: state.auth.is_seller ,
     membership_type: state.membership.mode,
    };
  };


  
   
export default connect(
mapStateToProps,
null
)(webCreatePortal);