import React, { Component } from 'react'
import Pusher from 'pusher-js';

//import { Link, withRouter } from 'react-router-dom';
//import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import TempoaryDrawer from '../Sidebar/SideNav'

import {notification,message, Descriptions } from 'antd'
import InvoiceOrderCartTable  from './Tables/orderTable'

var host = 'http://127.0.0.1:8000'

class InvoiceDetail extends Component{
    state = {
        loading:true,
        error: null,
        
        data:[],
        cart:[],
        itemsInCart:[],
    }

    invoiceData = async(token)=>{
        const invoiceID = this.props.match.params.invoiceID
        const endpoint = host + `/retail/invoice-data/${invoiceID}`
        axios.defaults.headers = {
          "Content-Type": 
          "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status ==  200){
                this.setState({
                    data : res.data,
                })
                console.log(res.data)
                //Gets the Order from the cart
                const OrderID = res.data['OrderTaken']
                this.getOrderDetials(OrderID)
            }else{
                
            }
        })
    }

    //Get Order and the items in cart are the product only him posted
    getOrderDetials = async(orderID)=>{
        const endpoint = host + `/retail/customer-orders-detail/${orderID}`
        axios.defaults.headers = {
          "Content-Type": 
          "application/json",
          Authorization: `Token ${this.props.token}`
        };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    orderData:res.data,
                    cart: res.data,
                    itemsInCart : res.data['CartItems'].Products
                    
                })
                console.log('Order Data', res.data)
                

            } else{

            }
        })
    
    }

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null){
            this.invoiceData(this.props.token)
            
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {

            this.invoiceData(newProps.token)
           }
         }
    }

    render(){
        const {data, itemsInCart , cart} = this.state
        const theData = data
        
        return(
            <>
                <TempoaryDrawer/>
                <div className="main">
               
                    <div className="fitter">
                        <div className="">
                        <InvoiceOrderCartTable data={cart}/>
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
    
)(InvoiceDetail) 