import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Card ,notification } from 'antd';

import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TemporaryDrawer from '../Sidebar/SideNav'
import UsersSimpleTable from './userTable'


import axios from "axios";
import { connect } from "react-redux";


const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }


const host = 'http://127.0.0.1:8000'
const users_count_endponit =  host + '/excite-admin-connect/count_users/'
const profile_list_endpoint = host + '/excite-admin-connect/list_profiles/'

class userListView extends Component{
    state= {
        Profiles : [],
    usersTotal: 0
    }

    Profiles = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(profile_list_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    Profiles:res.data
                })
                console.log('Profiles', res.data)
            }else{
                openNotification('Error Getting Profiles')
            }
        })
    }


    
    UsersCounter = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_count_endponit)
        .then(res=>{
            if (res.status == 200 || res.data == 201){
                this.setState({
                    usersTotal:res.data.UsersCount,
                    
                })
                console.log('User on the platform', res.data.Users_Qs)
            }else{
                openNotification(res.data['Message'])
            }
        })
    }


    componentDidMount(){
        //this.test_ws()
        if (this.props.token !== undefined && this.props.token !== null) {
          this.UsersCounter(this.props.token)
          this.Profiles(this.props.token)
          
          
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
              this.UsersCounter(newProps.token)            
              this.Profiles(newProps.token)

         }
        }
      }
    
      render(){
          const {Profiles, usersTotal} = this.state
          return(
              <>

              <TemporaryDrawer />

                <div className="main">

                        <div classsName="fitter">
                          
                        </div>

                        <div className="fitter">

                        <div className="grid grid-cols-4 gap-1 ">
                          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                              <div className="k-box">
                                <div className="left">
                                    <p className="box-title">
                                    Users
                                    </p>

                                    <p className="box-text">
                                    {usersTotal}
                                    </p>
                                </div>
                              </div>
                          </div>
                          </div>

                        <UsersSimpleTable data={Profiles}/>
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
     
    };
  };

export default connect(
mapStateToProps,
null
)(userListView);