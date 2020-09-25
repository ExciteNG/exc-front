import React , {Component, createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import {Rate} from 'antd'
import { MessageOutlined,} from '@ant-design/icons'

import ExciteNav from './sections/nav'
import NewFooter from './sections/footer'


const host = 'http://127.0.0.1:8000'
var Main  = []

const vendor_post_url = host + `/vendors_post/`


class Vendor_View extends Component{
    state  = {
        VendorProducts :[],
        profile_details :[],
        business_profile_details :[],
        loading : true,
        error: null,

        Allocated_Results:[],
    }
    vendor_id = this.props.match.params.VendorID

    
    //Previous Model to get Vendor data
    VendorPost = async()=>{
        axios.get(`http://127.0.0.1:8000/retail/vendor_products_public/${this.vendor_id}/`)
        .then(res =>{
            if (res.status == 200){
                this.setState({
                    VendorProducts : res.data ,
                    loading : false
                    })   
                    console.log('the Vendor Post', res.data) 
            }else{
                
            }
        })
    }
    // Ends here

    Vendor_Details = async() =>{
        axios.get(host + `/core_api/vendors_profile_public/${this.vendor_id}/`)
        .then(res =>{
            this.setState({
                profile_details : res.data ,
                loading : false
                })
            console.log(this.state)
        })
    }

    Vendor_Business_Data = async()=>{
        axios.get(host + `/core_api/vendor_business_data/${this.vendor_id}/`)
        .then(res =>{
            this.setState({
                business_profile_details : res.data ,
                loading : false
                })
            console.log(this.state)
        })
    }

    componentDidMount(){
        this.VendorPost()
        this.Vendor_Details()
        this.Vendor_Business_Data()
       
    }

    render(){
        const {profile_details,Allocated_Results, loading, error, VendorProducts } = this.state
        return(

            <>
            <ExciteNav/>

            <div className="fitter">
                <div className="page-grid">
                    <div className="left">
                        
                    <div
                              style={{height:250}}
                              className="horizontal-box base-card ">
                                    <div className="horizontal-left">
                                      <div className="horizontal-box-image-container">

                                      <img
                                      
                                      src={profile_details.ProfilePicture} />

                                      </div>
                                      
                                    </div>

                                  <div className="horizontal-right">
                                      <div>
                                        <p className="horizontal-right-profile-text">
                                            {profile_details.User_First_Name} {profile_details.User_LastName}
                                          </p>
                                          <p className="horizontal-right-profile-text">
                                        {profile_details.Email}
                                          </p>
                                          <p className="horizontal-right-profile-text">
                                        {profile_details.Phone}
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
                <h3 style={{fontSize:30}}>
                    {profile_details.User_First_Name}'s Products and Services
                </h3>

            <div className="products-layout">
            <ul className="products-layout-container">
              {
                VendorProducts.map((item)=>(
                  <>
                    <li className="products-item-list-container">
                 <div className="products-item-list">
                    <div className="products-item-image-container">
                      <img src={item.Image1} />
                    </div>
                    <div className="products-item-content">
                      <p className="products-item-title">
                      {item.Title}
                      </p>
                     
                      <p className="products-item-price">
                      ₦{item.Price}
                      </p>
                     
                      <p className="products-item-rating">
                      <Rate disabled defaultValue={item.Rating} />
                      </p>

                      <p className="products-item-location">
                        {item.Address}
                      </p>

                      <p className="products-item-location">
                       Delivering Nationwide
                      </p>
                    </div>

                    <div className="products-item-button-container">

                    <Link to={`/categories/${item.Category}/${item.id}`}>
                    <button className="products-item-button">
                         view
                      </button>   
                 </Link>
                    </div>
                 </div>
              </li>
                  </>
                ))
              }
            </ul>
          </div>      
            </div>
             



            <div className="container">
                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                                 Allocated_Results.map((item)=>(
                                       <>
                                       <div className=" col-span-4  sm:col-span-4
                            md:col-span-4 lg:col-span-4 xl:col-span-4 gap-3">
                                        <div className="post-box">
                                        <div className="post-image">
                                            <img className="post-image-render"
                                                href={`/categories/${item.category}/${item.id}`}
                                                src={item.Image1}
                                                />
                                        </div>    
                                        <div className="post-content-prime">
                                            <div className="post-content-header">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            {item.Title}
                                            </a>
                                            
                                            </div>
                                            <div className="post-content-star-rating">
                                            <Rate disabled defaultValue={item.Rating} />
                                            </div>

                                            <div className="post-content-body">
                                                 <p
                                                  style={{color:"#434343"}}>
                                                    Category : {item.category}
                                                </p>
                                            </div>
                                            <div className="post-content-body">
                                                
                                                <br/>
                                                <p>
                                                <a 
                                                href={`/categories/${item.category}/${item.id}`}
                                                style={{color:"#434343"}} >
                                                {item.Description.length < 50 ? 
                                                `${item.Description}` : `${item.Description.substring(0, 300)}...` }
                                                </a>
                                                </p>
                                            </div>
                                            <div className="post-content-price">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            ₦{item.Price}
                                            </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                       </>
                                        ))
                                    } 
                               
                    </div>
                </div>

                <NewFooter/>

            </>

        )
    }


}

export default  Vendor_View