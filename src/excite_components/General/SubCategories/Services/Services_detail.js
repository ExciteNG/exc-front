import React , { useState, Component }from 'react';
import axios from 'axios'

import {Rate, Avatar ,Comment, Tooltip , message ,Tabs ,InputNumber, Descriptions } from 'antd'

import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons' 

import Nav from '../../../containers/nav'
import ExciteNav from '../../sections/nav'
import NewFooter from '../../newHome/footer'

import CommentForm from '../../../containers/Comment_Form'
import Order_Form from '../../../containers/Order_Form'
import Make_Order_Form from '../../../containers/Make_Order'
import Services_Item from './Services_list';

const { TabPane } = Tabs;

const host = 'http://127.0.0.1:8000'
const item_type = 'services'



class Services_Item_Detail extends Component{
    state = {
        item_details:[],
        loading : true,
        error: null ,
        vendor_profile :[],
        comments:[],
        loaded_comments: false,
    }

    

    Vendor_Profile = async(Vendor_id) =>{
        await axios.get(`http://127.0.0.1:8000/core_api/vendors_profile_public/${Vendor_id}/`)
        .then(res =>{
          this.setState({
            vendor_profile: res.data
        })
         console.log('ven',this.state.vendor_profile)  
       })
      }

      
    Item_Data = async() => {
        const model_id = this.props.match.params.ItemDetailID
        const item_endpoint = 'services_detail'
        const endpoint = host + `/retail/item-detail/${model_id}/`
        await axios.get(endpoint)
        .then(res =>{
            this.setState({
                item_details : res.data ,
                loading : false
                })
                if (this.state.loading === false){
                    const parse_vendor = this.state.item_details.Owner_id
                    console.log('this is the  vendor id', parse_vendor)
                    // USED THIS FUNCTION RETRIEVE VENDOR'S ID
                    this.Vendor_Profile(parse_vendor)
                }
            })
    }
      
    //Fetches comments
    Comments = async() =>{
        const model_id = this.props.match.params.ItemDetailID
        
        const item_endpoint = 'services_comment_list'
        const endpoint = host + `/retail/item-comments/${model_id}/`
         axios.get(endpoint)
        .then(res =>{
            this.setState({
                Comments : res.data ,
                loaded_comments: true
                })
                console.log('this are the comments', res.data)
                
        })

    }; 

    item_id = this.props.match.params.ItemDetailID
    item_comment_endpoint = `/retail/new_comment_services/${this.item_id}/`
    comment_endpoint = host + this.item_comment_endpoint

    componentDidMount(){
        this.Item_Data()
        this.Comments()
        
        
    }

    render(){
        const { item_details ,vendor_profile, loaded_comments ,
          Comments, loading,  rating,  } = this.state;
       const model_id = this.props.match.params.ItemDetailID
       console.log('this is the model ID', model_id)
       const  orderMonitorID =  this.state.item_details.Owner_id
       const itemIsProduct =false
        return(
            
            <>
            <ExciteNav/>


            <div className="container2">
            <div className="product-detail">
                <div className="p-info">
                    <img 
                    alt ='Image Appears here'
                    src={item_details.Image1}
                     />
                </div>
                <div className="p-info"> 
                <div class="p-content">
          
            
                    <h2 >   {item_details.Title}</h2>
                    <hr/>

                    <p > ₦{item_details.Price}</p>

                    <p >Sold by    {item_details.Owner}</p>
                    
                   
                    <div className="description-card-text">
                          <Rate disabled defaultValue={3} />
                      </div>
               
                    
                   
                    <p  >
                    {item_details.Address} {item_details.State} {item_details.Country}
                    </p>

                    <hr/>

                    
                    {
                      itemIsProduct ? (
                        <>
                        <p>
                    <InputNumber 
                    onChange={this.handleQuantity}

                    min={1} max={1000} defaultValue={1} />
                    </p>
                    
                    <button
                    onClick = {this.addToCart}
                    class="btn">Add to cart</button>
                        </>
                      ):(
                          <>
                          <Make_Order_Form 
                              item_name = {item_details.Title}
                              item_class = {item_type}
                               share_vendor_email ={vendor_profile.email}
                              vendor_id = {vendor_profile.id} post_id = {model_id} /> 
                          </>
                      )
                    }
                   
                </div>
                </div>
            </div>
            </div>


            
            
          <div className="container2">
          <Tabs defaultActiveKey="1" >
                <TabPane tab="Rating and Description " key="1">
                <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-6">
                      <div className="description-card">
                          <div className="description-header">

                          <h2 className="description-card-heading" >
                          Rating 
                          </h2>
                          <div className="description-card-text">
                          <Rate disabled defaultValue={3} />
                          </div>
                            <h2 className="description-card-heading" >
                              Description
                            </h2>
                            
                          </div>
                        <div className="description-card-text">
                          {item_details.Description}
                        </div>
                      </div>
                      <div className="">
                        
                        </div>
              </div>
          </div> 

                </TabPane>

                <TabPane tab="Specification" key="3">
                      <div className="grid grid-cols-6">
                        <div className="col-span-6">
                        <Descriptions title="Product Info">
                        <Descriptions.Item label="Product Color">{item_details.Color}</Descriptions.Item>
                          <Descriptions.Item label="Electronic Category">{item_details.Electronic_Category}</Descriptions.Item>
                          <Descriptions.Item label="Electronic Type">{item_details.Electronic_Type}</Descriptions.Item>
                          <Descriptions.Item label="Address">
                            {item_details.Address}
                          </Descriptions.Item>
                          <Descriptions.Item label="Country">{item_details.Country}</Descriptions.Item>
                          <Descriptions.Item label="Remark">{item_details.State}</Descriptions.Item>
                          
                        </Descriptions>
                        </div>
                      </div>
                </TabPane>
                <TabPane tab="Shipping Details" key="2">
                <div className="grid grid-cols-6">
                    <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="description-card">
                                <div className="description-header">
                                  <h2 className="description-card-heading" >
                                    Description
                                  </h2>
                                  
                                </div>
                              <div className="description-card-text">
                                {item_details.Description}
                              </div>
                            </div>
                      <div className="">
                        
                        </div>
                  </div>
              </div>
                </TabPane>
                
              </Tabs>
          </div>
          
                <div className="container mx-auto ">
                <div className="grid grid-cols-6 ">
               
               {
                 loaded_comments ?(

                   <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                      {
                        Comments.map((c)=>(
                        <>
                        <Rate disabled defaultValue={c.Rating} />

                        <Comment
                        author={c.Name}
                        avatar={
                          <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                          />
                        }
                        content={
                          <p>
                            {c.Comment}
                          </p>
                        }
                        datetime={
                          <Tooltip title>
                            <span>{c.Created}</span>
                          </Tooltip>
                        }
                      />
                      </>
                        ))
                      }

                  </div>

                      ):(
                        <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                            <h3 style={{fontSize:20}}>
                              No Comments Yet
                            </h3>
                        </div>
                      )
                    }

               <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                 <CommentForm comment_url={this.comment_endpoint} post_id = {model_id} />
               </div>

       </div>
                </div>

                  <NewFooter/>

           </>
        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token 
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Services_Item_Detail);
  