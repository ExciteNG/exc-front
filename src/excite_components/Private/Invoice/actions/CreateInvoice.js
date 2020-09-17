import React, { Component } from 'react'
import Pusher from 'pusher-js';

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import TempoaryDrawer from '../../Sidebar/SideNav'

import {notification,message} from 'antd'

const host = 'https://backend-entr.herokuapp.com'
class createNewInvoice extends Component{
    state = {
        invoiceRecord :[],
        invoiceOrderID:null,
        invoiceLinkID : null ,
        
        invoiceOrder : [] ,

        loading:true ,
        error:null, 
    }

    initInvoice = async(token)=>{
        const endpoint = host + '/management/vendor-init-invoice/'

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    invoiceOrderID:res.data['InvoiceOrderID'] ,
                    invoiceLinkID:res.data['InvoiceLinkID']
                })
                const invoiceOrderID = this.state.invoiceOrderID
                console.log(invoiceOrderID)
                this.fetchInvoiceOrderDetails(invoiceOrderID)
            }
            else{
                message.error('Error initailizing Invoice Session')
            }
        })
    }

    fetchInvoiceOrderDetails = async(orderID)=>{
        const endpoint = host + `/management/vendor-invoice-details/${orderID}`

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    invoiceOrder:res.data
                })
            }
            else{
                message.error('')
            }
        })
    }

    fetchInvoiceRecords = async(orderID)=>{
        const endpoint = host + `/management/vendor-invoice-records-list/${orderID}/`

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    invoiceRecord : res.data
                })
                console.log('the is the invoice records Data', this.state.invoiceRecord)
            }
            else{
                message.error('Error initailizing Invoice Session')
            }
        })
    }

    addRecord = async(e)=>{
        e.preventDefault()
        
        const itemName = e.target.elements.itemName.value;
        const itemCost = e.target.elements.itemCost.value;
        const itemQuantity = e.target.elements.itemQuantity.value
        
        const fd = new FormData()
        fd.append('itemName',itemName)
        fd.append('itemCost',itemCost)
        fd.append('itemQuantity', itemQuantity)

        const orderID = this.state.invoiceOrderID
        const LinkID = this.state.invoiceLinkID
        const endpoint = host + `/management/vendor-add-invoice-item/${orderID}/${LinkID}/`
        await axios.post(endpoint , fd)
        .then(res =>{
            if (res.status == 200){
               this.fetchInvoiceRecords(LinkID)
              message.success('Item Added')
            }else{
                message.error('Error Adding Item')
            }
        })

        }


    componentDidMount(){
          
        if (this.props.token !== undefined && this.props.token !== null){
             this.initInvoice(this.props.token)
             
        }
        
   }

   componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.initInvoice(newProps.token)
            
          }
        }
      }
  
    render(){
             const {invoiceOrderID , invoiceRecord , invoiceOrder} = this.state
        return(
            <>
                <div className="wrapper">

                    <TempoaryDrawer/>
                    <div className="main">

                       <form
                       onSubmit={(e)=>{this.addRecord(e)}}
                       className="">
                       <div className="fitter">


                            <div className="page-grid">
                                <div className="right">
                            
                            <div className="">
                            <input 
                             className="invoice-form-input"
                             placeholder="Client Name" name="billTo"/>
                            </div>

                            <div className="">
                            <input 
                             className="invoice-form-input"
                             placeholder="Client Email" name="billTo"/>
                            </div>


                            <div className="">
                            <input 
                             className="invoice-form-input"
                             placeholder="Client Phone" name="billTo"/>
                            </div>

                                
                                </div>

                                <div className="left">

                                    <div className="">
                                    <input
                            className="invoice-form-input"
                            type="email"  placeholder="Date Created" name="DateCreatd"/>
                                    </div>

                                    <div className="">
                                    <input
                            className="invoice-form-input"
                            type="email"  placeholder="Due Date" name="DueDate"/>
                                    </div>

                                <div className="">
                                    <p>
                                        Balance: {10}
                                    </p>
                                </div>
                                    
                                </div>
                            </div>

                            <table className="invoice-table-box">
                            <tr className="invoice-table-heading-list">
                                <th className="invoice-table-heading-list-title">Item</th>
                                <th className="invoice-table-heading-list-title">Cost </th>
                                <th className="invoice-table-heading-list-title">Quanity</th>
                                <th className="invoice-table-heading-list-title">Submit</th>
                            </tr>
                            
                                <>
                                { invoiceRecord.map((item)=>(
                                            <>
                                            <tr key={item.id}>
                                            <td>
                                              
                                            {item.Name}
                                        </td>
                                            <td>
                                            {item.Cost}
                                            </td>

                                            <td>
                                            {item.Price}
                                            </td>
        
                                            <td>
                                            {item.Quantity}
                                            </td>
                                            </tr>
                                    </>
                                        ))
                                   
                                }
                                </>
                               

                            <tr>

                              
                                <td>

                                <input
                            className="invoice-form-input"
                            type="name"  placeholder="Name" name="itemName"/>
                                </td>

                                <td>

                                <input
                            className="invoice-form-input"
                            type="name"  placeholder="Cost" name="itemCost"/>

                                </td>

                                <td>

                                <input
                            className="invoice-form-input"
                            type="name" placeholder="Quantity" name="itemQuantity"/>

                                </td>

                                <td>
                                <button 
                                type="submit"
                                className="invoice-form-button">add</button>

                                </td>
                            </tr>


                            </table>
                            </div>
                       </form>

                            
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
)(createNewInvoice);