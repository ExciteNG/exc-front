import React , {Component,  createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { notification} from 'antd';



const host = 'https://backend-entr.herokuapp.com'
const Request_Order_url = host + '/management/new_order/'

const deleteItem = async (token,id) =>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
      await axios.get(`https://backend-entr.herokuapp.com/management/delete_contact/${id}/`)
      .then(res =>{
        this.openNotification(res.data['Message'])
      })
  
  }
  
  
const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}



export default function BuyerCartTable (props){

    const token = props.token
    const productsInCart  = props.data
    let indexNumber = 1
    return(
        <>
            <div className="CartTable-container">
                <div className="cartTable-box">
                <table>
                              
                <tr>
                
                                <th>
                                    <p className="cart-header-text">
                                   Detail
                                    </p>
                                </th>
                                
                                <th>
                                    <p className="cart-header-text">
                                    Price/Amount
                                    </p>
                                </th>
                                
                                </tr>
                            
                                <>
                                        <tr>
                                        
                                        <td >
                                            <p className="cart-item-text">
                                               Order Date
                                            </p>
                                        </td>

                                        <td>
                                            <p className="cart-item-text">
                                            {orderData.OrderedDate}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td >
                                            <p className="cart-item-text">
                                              Cart Total
                                            </p>
                                        </td>

                                        <td>
                                            <p className="cart-item-text">
                                            {data.length}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td >
                                            <p className="cart-item-text">
                                            Total Cost
                                            </p>
                                        </td>

                                        <td>
                                            <p className="cart-item-text">
                                            ₦ {cutomerOrder.total}
                                            </p>
                                        </td>
                                    </tr>


                                        </>

                            </table>

                        </div>
                    </div>

        </>
    )
} 