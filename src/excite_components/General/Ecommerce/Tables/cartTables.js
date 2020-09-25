import React , {Component,  createElement, useState } from "react";
import axios from "axios";

import { notification} from 'antd';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
 

const host = 'http://127.0.0.1:8000'
const Request_Order_url = host + '/management/new_order/'

const deleteItem = async (token,id) =>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ₦{token}`
    };
      await axios.get(`http://127.0.0.1:8000/management/delete_contact/₦{id}/`)
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
    const cutomerOrder = props.order
    let indexNumber = 1
    return(
        <>
            <div className="CartTable-container">
                <div className="cartTable-box">
                <table>
                              
                <tr>
                                <th>
                                <p className="cart-header-text">
                                S/N
                                    </p>
                                </th>
                                <th>
                                    <p className="cart-header-text">
                                    Product Image
                                    </p>
                                </th>
                                
                                <th>
                                    <p className="cart-header-text">
                                    Product Name
                                    </p>
                                </th>
                                

                                <th>
                                    <p className="cart-header-text">
                                    Quantity
                                    </p>
                                </th>
                                
                                <th>
                                    <p className="cart-header-text">
                                    Sum
                                    </p>
                                </th>

                                <th>
                                    <p className="cart-header-text">
                                    Remove
                                    </p>
                                </th>
                                


                                </tr>
                               
                              <>
                                {
                                    
                                    productsInCart.map((item)=>(
                                        <>
                                        <tr>
                                        
                                        <td>
                                         <p className="cart-item-text">
                                        {indexNumber++}
                                        </p>
                                        </td>

                                        <td>
                                        <div className="cart-item-image-container">
                                            <img 
                                             className="cart-item-image"
                                            src={item.Products['Image1']} />
                                        </div>
                                        </td>

                                        <td>
                                        <p className="cart-item-text"> 
                                            {item.Products.Title}
                                        </p>
                                        </td>
                                        
                                        <td >
                                            <p className="cart-item-text">
                                                #10
                                            </p>
                                        </td>

                                        <td>
                                            <p className="cart-item-text">
                                                ₦{item.total_item_price}
                                            </p>
                                        </td>

                                        <td>
                                            <p className="cart-item-text">
                                            <FontAwesomeIcon  icon={faTrash} />
                                            </p>
                                        </td>
                                    </tr>
                                        </>
                                    ))
                                    
                                }
                            </>

                            </table>

                        </div>
                    </div>



                    <div className="OrderTable-container">
                <div className="OrderTable-box">
                <table>
                              
                <tr>
                
                                <th>
                                    <p className="Order-header-text">
                                   Detail
                                    </p>
                                </th>
                                
                                <th>
                                    <p className="Order-header-text">
                                    Price/Amount
                                    </p>
                                </th>
                                
                                </tr>
                            
                                <>
                                        <tr>
                                        
                                        <td >
                                            <p className="Order-item-text">
                                               Order Date
                                            </p>
                                        </td>

                                        <td>
                                            <p className="Order-item-text">
                                            {cutomerOrder.OrderedDate}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td >
                                            <p className="Order-item-text">
                                              Cart Total
                                            </p>
                                        </td>

                                        <td>
                                            <p className="Order-item-text">
                                            {productsInCart.length}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        
                                        <td >
                                            <p className="Order-item-text">
                                            Total Cost
                                            </p>
                                        </td>

                                        <td>
                                            <p className="Order-item-text Order-item-cost">
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