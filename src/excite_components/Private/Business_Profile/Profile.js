import React, { Component } from 'react'
import Pusher from 'pusher-js';
 
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import {notification,message ,Tabs} from 'antd'
import TemporaryDrawer from '../Sidebar/SideNav'

import Profile_Edit from './Edit_Profile'

const { TabPane } = Tabs;

const host = 'http://127.0.0.1:8000'

const Profile_id_url  = host + '/stream/get_profile_id/'
const Profile_url = host + '/stream/profile_view/'

const Business_Profile_id_url = host + "/stream/get_business_profile_id/"
const Business_Profile_url = host + '/stream/business_profile/'

const My_User_id_url = host + "/stream/get_my_user_id_and_email/"


class User_Profile extends React.Component{
    state = {
        user_id: '',

        profile: [],
        profile_id : null,
    
        Business_Profile : [],
        business_profile_id : null,

        loading : true,
        error :null,
    }

    My_User_id = async(token)=>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
       await axios.get(My_User_id_url)
       .then(res =>{
         this.setState({
          user_id : res.data['userID']
         })
         
       })
  
    }

    Profile_detail = (token,parse_user_id) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
          axios.get(host + `/stream/profile_view/${parse_user_id}/`)
          .then(res =>{
            this.setState({
              profile: res.data
            })
            console.log('profile details',res.data['Edited'])
            const CheckEdit = res.data['Edited']
            if (CheckEdit == false){
              message.error('Please Edit Your profle, For Us to Process Your Data', 10)
             // this.props.history.push("/edit_profile/")
              
            }
          })     
        
    }

    Profile_ID = async (token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(Profile_id_url)
      .then(res =>{
        const the_id = res.data
        this.setState({
          profile_id: res.data
        })

        const parse_profile_id = res.data['Profile_id']    
        this.Profile_detail(token, parse_profile_id)

      });
      
      

    }

    Business_Profile_data = async(token, parse_user_id)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          await axios.get(Business_Profile_url + `${parse_user_id}/`)
          .then(res =>{
            console.log('THIS IS THE BUSINESS MODEL', res.data)
            const the_id = res.data
            this.setState({
              Business_Profile: res.data
            }) 
        })
    }

    Business_Profile_id = async (token) =>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(Business_Profile_id_url)
        .then(res =>{
          if (res.status == 200){
            const the_id = res.data
          this.setState({
            business_profile_id : res.data
          })
          console.log('THis is the state',this.state)
          const parse_user_id = res.data['Business']
          this.Business_Profile_data(token, parse_user_id)
          } else{

          }
        });
      
  
      }

      Edit_Business_Profile_Redirect=(e)=>{
        this.props.history.push("/edit_business_profile/")
      }

    componentDidMount(){
        this.Profile_ID(this.props.token)
        this.Business_Profile_id(this.props.token)
        this.My_User_id(this.props.token)

         }

    componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.Profile_ID(newProps.token)
                this.Business_Profile_id(newProps.token)
                this.My_User_id(newProps.token)   
            }
          }
        }
    

    render(){
        const {user_id, profile_id,   Business_Profile,
            business_profile_id,profile,
            loading,
            error} = this.state
        const {is_seller} = this.props
        const isVerified = true
        console.log(this.state);

        return(
            
           <>

           <TemporaryDrawer />
                    <div className="main">


                  
                    <div className="fitter ">
                <div className="page-grid">
                    
                        <div className="left">

                              <div
                              style={{height:250}}
                              className="horizontal-box base-card ">
                                    <div className="horizontal-left">
                                      <div className="horizontal-box-image-container">

                                      <img
                                      
                                      src={profile.ProfilePicture} />

                                      </div>
                                      
                                    </div>

                                  <div className="horizontal-right">
                                      <div>

                                      <p className="horizontal-right-profile-text">
                                            {profile.BusinessName} 
                                          </p>

                                        <p className="horizontal-right-profile-text">
                                            {profile.User_First_Name} {profile.User_LastName}
                                          </p>
                                          <p className="horizontal-right-profile-text">
                                        {profile.Email}
                                          </p>
                                          <p className="horizontal-right-profile-text">
                                        {profile.Phone}
                                          </p>
                                          <p  className="horizontal-right-profile-text">
                                          

                                            </p>
                                      </div>
                                  </div>  


                                </div>

                        </div>


                        <div className="right">

                        </div>

                </div>
            </div>


                    <div className="fitter">
                      <div className="single-grid">
                        <div className="center">
                        <Tabs defaultActiveKey="1" >


                        <TabPane tab="Profile Details" key="1">
                         
                              <Profile_Edit/>
                            
                        </TabPane>
                        </Tabs>
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
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(User_Profile);