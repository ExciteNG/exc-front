import React , {Component,  createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { Form, Input,Switch , InputNumber, Button, Select,Modal, notification , Slider, message} from 'antd';

import ExciteNav from '../sections/nav'
import Paystacker from './Paystack'
import OrderTable from './Table'
import BillingInformation from './billingForm'
import BuyerCartTable from './Tables/cartTables'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
 

const Search = Input.Search;
const { Option } = Select;
const {TextArea} = Input

const formItemLayout = {
  wrapperCol: { span: 12, offset:0 }
};



const host = 'https://backend-entr.herokuapp.com'
const Request_Order_url = host + '/management/new_order/'

  
const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}


class CartList extends Component{
    state = {

      email : '' ,

        cartData : [],
        cartID : 0,

        buyerOrder:[] ,
        orderId:0,

        cartLength : 0,
        loading : true, 
        error : null ,

        isPaid : false ,
        modal2Visible: false,
        Selected : false, 

        useBillingAddress:false,
    }


     //Control Modal
     setModal2Visible(modal2Visible) {
      this.setState({ modal2Visible });
    }
    

    proceedPayment = async()=>{
      this.setModal2Visible(true)
      this.setState({
        Selected : true
        });
    }

    userEmail = async(token)=>{
      const userData_endpoint = host + '/stream/get_my_user_id_and_email/'
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
      };
      await axios.get(userData_endpoint)
      .then(res =>{
          const the_id = res.data
          this.setState({
        // user_id: res.data.userID,
        email : res.data.Email,
          })
          console.log('User Email', res.data.Email)
      })
  }

    AuthRequired (){
        message.error('You need to login to submit a review')
      }     
      
    getCart = async(token)=>{
        const endpoint = host + `/retail/cart-list/`
        
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
        await axios.get(endpoint)
        .then(res=>{
            if (res.status ==  200){
                this.setState({
                    cartData : res.data ,
                    cartID : res.data['id'],
                    cartLength : res.data.length
                })
                console.log('this is the cart data',res.data)
            }else{  
              //  message.error('') 
            }
        })
    }


    getOrder = async(token)=>{
      const endpoint = host + `/retail/customer-orders/`
      
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        
      await axios.get(endpoint)
      .then(res=>{
          if (res.status ==  200){
              this.setState({
                   buyerOrder : res.data[0],
                  orderId : res.data[0].id,
                  
              })
              console.log('the order', res.data)
          }else{  
            //  message.error('') 
          }
      })
  }

    
    removeItem = async (id) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      console.log()
     
        await axios.get(`https://backend-entr.herokuapp.com/retail/remove-item/${id}/`)
        .then(res =>{
          if (res.status == 200){
            openNotification(res.data['Message'])
          }else{

          }
        })
    
    }
    

    setBillingAdress =()=>{
      const billState = this.state.useBillingAddress
      if (billState == true){

        this.setState({
          useBillingAddress : true
        })

      }else{
        this.setState({
          useBillingAddress : false
        })
      }
    }

    // Order Query
    create_order = async( values) =>{
        
      
      //  const cartOrderID = this.state.cartID
        const cartOrderID = this.state.orderId
        //const Post_id = this.props.post_id
        const Vendor_Email = this.props.share_vendor_email
        const Post_Owner = this.props.vendor_id
        const Buyer_id = this.state.BuyerID
        const item_class = this.props.item_class
        const item_name = this.props.item_name
    
        console.log('this is the post id for quotes', Vendor_Email )
        
     
        //const Quantity =  
        //    values["Quantity"] === undefined ? null : values["Quantity"] ;
        const Quantity = 0
        const Name =  
            values["Name"] === undefined ? null : values["Name"] ;
        const Email = 
            values['Email'] === undefined ? null : values['Email'] ;
       const Note = 
            values['Note'] === undefined ? null : values['Note'] ;
        const Phone = 
          values['Phone'] === undefined ? null : values['Phone'] ;
        const Address1 = 
          values['Address1'] === undefined ? null : values['Address1'] ;
         const Address2 = 
          values['Address2'] === undefined ? null : values['Address2'] ;
        const Postal = 
          values['Postal'] === undefined ? null : values['Postal'] ;
        const State = 
          values['State'] === undefined ? null : values['State'] ;
        const Country = 
          values['Country'] === undefined ? null : values['Country'] ;
          
          axios.defaults.headers = {
            "Content-Type": "application/json",
              Authorization: `Token ${this.props.token}`
              };
          await axios.get(Request_Order_url, {
            params:{  
              cartOrderID,
              item_class, Buyer_id,
                      Post_Owner, Name ,item_name,
                     Email, Note,  Phone,
                      Vendor_Email, Quantity ,Address1,Address2, 
                    Country,State, Postal }
          })
          .then(res =>{
              if (res.status == 200){
                const response = res.data['Message']
              console.log(response)
              openNotification(response)
                  this.setState({
                    isPaid : true,
                  })
              } 
              else if(res.status == 401){
                message.error('Login to create order')
              }
              else{
                message.error('Order Failed')
              }
          })
      }

    

    promptOrder = async()=>{
      this.setState({
        isPaid : true,
      })
    }

    componentDidMount = () =>{
        
        if (this.props.token !== undefined && this.props.token !== null) {
            this.getCart(this.props.token)  
            this.getOrder(this.props.token)  
            this.userEmail(this.props.token)
         }    
   };

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
             this.getCart(newProps.token)
             this.getOrder(newProps.token)
             this.userEmail(newProps.token)
          }
        }
      }

      
      render(){
          const {cartData , isPaid , Selected , email , buyerOrder} = this.state
          const {orderId} = this.state.orderId
          const billingEndpoint = `/chechout/${orderId}/`
          console.log(billingEndpoint)
          

          let indexNumber = 1
          return(
              <>
                <ExciteNav />

              <div className="container2">
                <div className="page-grid">
                  
                </div>
              </div>


              <div className="container2">
                    <div className="page-grid">
                      

                   <div className="left">

                      <div className="order-container">
                      <div className="order-form-box">
                          <div className="order-form-heading">
                                      <h3>
                                       Create Order
                                      </h3>
                          </div>
                              <Form
                              className="order-form-width"
                              onFinish={this.create_order}>
                                <Form.Item>
                               
                                </Form.Item>



                                <Form.Item
                                rules={[{ required: true, message:'Full Name is required' }]}
                                name ="Name">

                                  <Input
                                    placeholder="Full Name" 
                                    enterButton
                                  />

                                </Form.Item>
                                <Form.Item 
                                rules={[{ required: true, message:'Email Address is required' }]}
                                name ='Email'> 

                                  <Input
                                    placeholder="Email"
                                    enterButton
                                  />

                                </Form.Item>

                                <Form.Item
                                rules={[{ required: true, message:'Phone Number is required' }]}
                                name ='Phone'> 

                                  <Input
                                    placeholder="Phone"
                                    enterButton
                                  />

                                </Form.Item>
                                    
                                <Form.Item 
                                
                                rules={[{ required: true, message:'Address is required' }]}
                                name ='Address1'> 

                                  <Input
                                    placeholder="Address"
                                    enterButton
                                  />

                                  </Form.Item>

                                  <Form.Item 
                                  
                                  name ='Address2'> 

                                  <Input
                                    placeholder="Second Address (Optional)"
                                    enterButton
                                  />

                                  </Form.Item>


                                  
                                  <Form.Item
                                  
                                  name ='Postal'> 

                                  <Input
                                    placeholder="Postal Code"
                                    enterButton
                                  />

                                  </Form.Item>

                                  <Form.Item 
                                  rules={[{ required: true, message:'State is required' }]}
                                  name ='State'> 

                                  <Input
                                    placeholder="State"
                                    enterButton
                                  />

                                  </Form.Item>

                                  <Form.Item 
                                  rules={[{ required: true, message:'Country is required' }]}
                                  name = "Country">
                                  <Select placeholder ="Select Country">
                                  <Option value="Lagos">Nigeria
                                  </Option> 
                                  <Option value="Ghana">
                                    Ghana
                                  </Option>
                                  <Option value="Cameroon">
                                  Cameroon
                                  </Option>
                                  </Select>
                                </Form.Item>

                                <Form.Item 
                                rules={[{ required: true, message:'Note is required' }]}
                                name="Note">
                                
                                <TextArea 
                                placeholder ="Send us a short note of any extra info you'd like us 
                                            to have"
                                rows={4} />
                                </Form.Item>


                                

                                <Form.Item >
                                <button
                                className="custom-button2"
                                type="primary" htmlType="submit">
                                  Order 
                                </button>
                                </Form.Item>

                                  </Form>

                              </div>
                      </div>
                   </div>


                   <div className="right">

                      <div className="">
                      <BuyerCartTable order={buyerOrder} data={cartData} />
                      </div>

                  </div>  



                </div>
              </div>
              

                    <div
                    
                    className="fitter pt-5">
                      <div className="left">
                          {
                            isPaid ?(
                              <>
                              <div 
                  style={{paddingTop:10}}
                  >
                        <button 
                        onClick={this.proceedPayment}
                          className="custom-button">
                          Pay 
                        </button>
                      </div>
                 
                              </>
                            ):(  
                              <>
                              <p>
 
                              </p>
                              </>
                            )
                          }
                      </div>
                    </div>


                  
              <div className="container">
              {
                Selected ?(
                  <Modal
              centered
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
              >
                  <div className="grid grid-cols-4">
                    <div className="col-span-4">
                    <Paystacker
                  redirect_billing ={billingEndpoint}
                  changePay={this.promptOrder} 
                  pricing = {100}
                  Email = {this.state.email}
                   />
                    </div>
                  </div>
                  </Modal>
                ) : (
                 <div className="grid grid-cols-4">
                 <p>
                  
                  </p>
                 </div>
                )
              }
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
  )(CartList);
   