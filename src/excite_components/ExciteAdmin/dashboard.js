import React, { Component } from 'react'
import Pusher from 'pusher-js';

import axios from "axios";
import { connect } from "react-redux";
import {Bar, Line} from 'react-chartjs-2';

import {notification,message,Tabs} from 'antd'
import TemporaryDrawer from './Sidebar/SideNav'

import UsersSimpleTable from './Table/UsersTable'
import MoneySimpleTable from './Table/TransactionTable'
import CampaignSimpleTable from './Table/CampaignTable'
import { DataUsageSharp } from '@material-ui/icons';

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const { TabPane } = Tabs;

const host = 'https://backend-entr.herokuapp.com'

const transactions_endpoint = host + '/excite-admin-connect/transactions_list/'
const logistics_endpoint = host +'/excite-admin-connect/logistics_list/'
const webhook_data_endpoint = host + '/excite-admin-connect/webhook_data_list'
const users_count_endponit =  host + '/excite-admin-connect/count_users/'
const transactions_coun_endpoint = host + '/excite-admin-connect/count_transactions'

const transactions_webhook_endpoint = host + '/excite-admin-connect/webhook_data_list'
const profile_list_endpoint = host + '/excite-admin-connect/list_profiles/'

class AdminDashboard extends Component {

    // The User Proifle State
    state = {
      
        Profiles:[],

        Transactions:[],
        UsersList : [],

        CampaignsData:[],

        productsCount : [] ,
        productsCost : [],

        CampaignDataCount:0,
        usersTotal:[],
        WebhookTotal:[],
        TransactionTotal:[],
        ordersCount:[],

        chartData : [],
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

    LogisticsCounter = (token) =>{
        axios.defaults.headers = {
             "Content-Type": "application/json",
             Authorization: `Token ${token}`
           };
        axios.get('https://backend-entr.herokuapp.com/management/admin_logistics_list/')
        .then(res =>{
            const data = res.data
             this.setState({
                ordersCount : data.length
             }); console.log('res data' ,res.data);
             
        }).catch(e =>{
             console.log(e)
        })

   };

   
    CampaignList = (token) =>{
    console.log(token)
    axios.defaults.headers = {
         "Content-Type": "application/json",
         Authorization: `Token ${token}`
       };
     axios.get('https://backend-entr.herokuapp.com/excite-admin-connect/admin-c-list/')
    .then(res =>{
        const data = res.data
         this.setState({
            CampaignsData : data ,
            CampaignDataCount :data.length,

         }); 
         console.log('Campaign Data data' ,res.data);
            
        })

    };

  
    TransactionCounter = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(transactions_coun_endpoint)
        .then(res=>{
            if (res.status == 200 || res.data == 201){
                this.setState({
                    WebhookTotal:res.data.webhook_count,
                    TransactionTotal:res.data.transactions_qs,
                })
                console.log(res.data)
            }else{
                openNotification(res.data['Message'])
            }
        })
    }
 
    Transactions = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(transactions_webhook_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    Transactions:res.data
                })
                console.log('Transactions', res.data)
            }else{
                this.setState({
                    Transactions:0
                })
                openNotification('Error Getting Transactions')
            }
        })
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

    ProductAnalysis = async(token)=>{
      const endpoint = host + '/excite-admin-connect/product-analytics/'
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
    await axios.get(endpoint)
    .then(res=>{
        if (res.status == 200){
            this.setState({
                productsCount:res.data['productsCount'],
                productsCost :res.data['productsRevenue']
            })

            const Months = ['July','August', 'Sept','Oct','Nov','December']
            let Views = []
            for (let i = 0; i<6; i++){
              let taker = Math.floor(Math.random() * 150)
              Views.push(taker)

            }
            const {productsCount,productsCost} = this.state
            this.setState({
              chartData:{
                labels: Months ,
                datasets:[
                  {
                    label:'Activity',
                    data: Views ,
                    backgroundColor:[
                      
                      'rgb(0,255,42)',
                      'rgb(0,255,42)',
                      'rgb(0,255,42)',

                      'rgb(0,255,42)',
                      'rgb(0,255,42)',
                      'rgb(0,255,42)',
                      'rgb(0,255,42)',

                    ]
                  }
                ]
              }
            })

            console.log('Product Data Analysis', res.data)
        }else{
            
        }
    })
    }

    test_ws(){
      var pusher = new Pusher('8b827980b6cb1e62195c', {
        cluster: 'eu'
      });
      
      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
        console.log(JSON.stringify(data))
      });
      console.log('tryiing...')
     
    }

   


    componentDidMount(){
      //this.test_ws()
      if (this.props.token !== undefined && this.props.token !== null) {
        this.UsersCounter(this.props.token)
        this.TransactionCounter(this.props.token)
        this.LogisticsCounter(this.props.token)
        this.Profiles(this.props.token)
        this.Transactions(this.props.token)
        this.ProductAnalysis(this.props.token)
        this.CampaignList(this.props.token)
        
      }
    }
    
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
            this.UsersCounter(newProps.token)
            this.TransactionCounter(newProps.token)
            this.LogisticsCounter(newProps.token)
            this.Transactions(newProps.token)
            this.Profiles(newProps.token)
            this.ProductAnalysis(newProps.token)
            this.CampaignList(newProps.token)


       }
      }
    }
  
    
    render() {
       
     
    const {usersTotal,WebhookTotal, ordersCount , 
      CampaignsData, Transactions ,Profiles ,CampaignDataCount ,productsCost , productsCount} = this.state
    const AllowAdmin  = true
        
    const {isAuth} = this.props

    if (isAuth === false){
      message.error('Login to access Administration Section')
      window.location.replace("/adminLogin")
    }else{
      let AllowAdmin  = true
    }

    return (   
            
          <>
                {
              isAuth ? (
                   
                <div>
                {
                  AllowAdmin ? (
                    <>
    
                    <TemporaryDrawer />
      
                
                      <div className="main">
    
                    
                      <div className="fitter">


                      <div className="grid grid-cols-4 gap-1">
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

                          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                              <div className="k-box">
                                <div className="left">
                                    <p className="box-title">
                                    Revenue
                                    </p>

                                    <p className="box-text">
                                    {WebhookTotal}
                                    </p>
                                </div>
                              </div>
                          </div>

                          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                              <div className="k-box">
                                <div className="left">
                                    <p className="box-title">
                                    Orders
                                    </p>

                                    <p className="box-text">
                                    {ordersCount}
                                    </p>
                                </div>
                              </div>
                          </div>

                          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                              <div className="k-box">
                                <div className="left">
                                    <p className="box-title">
                                    Campaigns
                                    </p>

                                    <p className="box-text">
                                    {CampaignDataCount}
                                    </p>
                                </div>
                              </div>
                          </div>

                      </div>
    
    
                      </div>
    

                      <div className='fitter'>

                        <div className="grid grid-cols-8">
                          <div className="col-span-5 sm:col-span-8 md:col-span-8 lg:col-span-5 xl:col-span-5">
                          <Bar
                                className =""
                                data={this.state.chartData}
                                options={{
                                responsive: true,
                                maintainAspectRatio : true,
                                title:{
                                display:this.props.displayTitle,
                                text:'Largest Cities In '+this.props.location,
                                fontSize:25
                                },
                                legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                                
                                }
                                }}
                          />
                          </div>
                        </div>

                      </div>

                  
                    
    
    
                      <div className="fitter">
                      <div className="page-grid">
                          <div className="left">
                            <div className="base-card">
                            
                            </div>
                      </div>
    
                      <div className="right">
    
                      </div>
                    </div>
                      </div>
                      </div>
    
                      
                  </>
    
                  ):(
                    <div className="container">
                        <div className="grid-cols-12">
                            <div className="col-span-5">
    
                            </div>
    
                            <div className="col-span-5">
                              You are not authorized for this channel
                            </div>
    
    
                        </div>
                    </div>
                  )
                }
                
                </div>

              ) : (
                <>
              <p>

              </p>
                </>
              )
            }
          </>
              
          
        )
    };

};

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
    
    };
};

  
export default connect(
    mapStateToProps,
    
)(AdminDashboard) 