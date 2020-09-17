import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../../Sidebar/SideNav'

import EmailBuilder from '../store/email'
import  Preview from '../store/Preview'

const host = 'https://backend-entr.herokuapp.com';

class createSection extends Component{
    state = {
        AllowUser:true,
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
      
       
       componentDidMount(){
          
        if (this.props.token !== undefined && this.props.token !== null){
             this.accountType(this.props.token)
        }  
      }

   componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
                 this.accountType(newProps.token)
          }
        }
      }


     render(){
         const {AllowUser} = this.state
         return(
             <>
            
                {
                    AllowUser ? (
                        <>
                            <TemporaryDrawer/>
                               <div className="main">
                               <div className="fitter">
                                 
                                    <div className="single-grid">
                                    <EmailBuilder 
                                    props={this.props}
                                    token={this.props.token}/>
                                    </div>
                                </div>
                               </div>o
                        </>
                    ) : (
                        <>
                        <TemporaryDrawer/>
                        <div className="main">
                               <div className="fitter">
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
)(createSection);