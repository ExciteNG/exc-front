import React, { Component } from 'react'
import Pusher from 'pusher-js';

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import TempoaryDrawer from '../Sidebar/SideNav'

import {notification,message} from 'antd'
import InvoiceTable from './Tables/InvoiceTableList'

const host = 'https://backend-entr.herokuapp.com'


class InvoiceList extends Component{
    state = {
        loading:true,

        inVoiceLength:[],
        invoice : [] ,
        Balance:0,
    }
    
    accountBalance = async(token)=>{
        const endpoint = host + `/retail/earnings/`
        axios.defaults.headers = {
          "Content-Type": 
          "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            this.setState({
              Balance:parseInt(res.data.Earnings)
            })
            console.log('Balance',res.data.Earnings)
          }else{
            
          }
        })
  
      }
  

    InvoiceList = async(token)=>{
        const endpoint = host + `/management/vendor-invoice-list/`
        axios.defaults.headers = {
          "Content-Type": 
          "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            this.setState({
              inVoiceLength:parseInt(res.data.length),
              invoice : res.data
            })
            console.log('Invoice',res.data)
          }else{
            
          }
        })
      }

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null){
            this.accountBalance(this.props.token)
            this.InvoiceList(this.props.token)
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                
            this.accountBalance(newProps.token)
              this.InvoiceList(newProps.token)
           }
         }
    }

    render(){
        const {inVoiceLength, invoice , Balance} = this.state
        return(
            <>
                <TempoaryDrawer/>
                <div className="main">

                <div className="fitter">
                          <div className="page-grid">
                            <div className="left">

                              <div className="">
                                <h3 className="intro-header">
                               Invoice Creation
                                </h3>

                                <p className="pText">
                                Create an Invoice Using Excite Invoice Maker
                                </p>
                              </div>
                                
                                <div className="">
                         <Link to="/createInvoice">
                         <button 
                          className="custom-button">
                                Create Invoice
                           </button>  
                         </Link>
                                </div>

                          </div>

                      </div>

                    </div>


                    <div className="fitter">
                    
                        <div class="grid grid-cols-4">
                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 md:col-span-2 xl:col-span-4 ">
                            <InvoiceTable data={invoice}/>
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
      membership_type: state.membership.mode,
    };
};


  
export default connect(
    mapStateToProps,
    
)(InvoiceList) 