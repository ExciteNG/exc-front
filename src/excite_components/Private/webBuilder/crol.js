import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import EmailBuilder from './store/email'
import  PageDemo from './store/Preview'

const host = 'https://backend-entr.herokuapp.com'



class showcaseVendorTemp extends Component{
    state = {
        pageData : [],
        loading:true,
        error:null , 
    }


        getWebsiteData = async(token)=>{
         const page_id = this.props.match.params.pageID         
         const endpoint = host + `/management/preview-temp/${page_id}`
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        
          await axios.get(endpoint)
          .then(res=>{
              if (res.status == 200){
                this.setState({
                    pageData:res.data['previewHTML']
                })
                //alert('3dedioji')
                console.log('i work')
                console.log('the page Data',res.data['previewHTML'])
              }else{

              }
          })
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
             this.getWebsiteData(this.props.token)
        }  
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
                 this.accountType(newProps.token)
                 this.getWebsiteData(newProps.token)
          }
        }
      }

      render(){
          const {AllowUser , pageData} = this.state
          console.log('ss');
          return(
                <>
                <div className="wrapper">
                    <TemporaryDrawer/>
                    <div className="main">
                    <div className="fitter">
                        <div className="">
                          <PageDemo Page={pageData}/>
                        </div>
                    </div>
                    </div>
                </div>
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
)(showcaseVendorTemp);