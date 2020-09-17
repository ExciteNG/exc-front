import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";

import TemporaryDrawer from '../Sidebar/SideNav'

import {Rate } from 'antd'
import User_Uploaded_Post from './uploaded_items'


import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'https://backend-entr.herokuapp.com';
const users_uploads_endpoint = host + `/retail/vendor-uploads/`
const Post_Array = []
const Main  = []
class User_Posts_Items extends Component {

    state = {
        general : [],
        loading:true ,
        error : null ,

        data:[],

        Electronics:[],
        Fashion:[],
        HomeApp:[],
        Property:[],
        Vehicles:[],
        Phones :[],

        results:[],
        Allocated_Results:[],
    }

    
    myProducts = async(token)=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_uploads_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    data:res.data
                })
            }else{
                console.log(res.data)
            }
        })

           
    }

   
    
    redirect_page=()=>{
    
      const endpoint = '/create/portal/'
      this.props.history.push(endpoint)
     }

    componentDidMount(){
        this.myProducts(this.props.token)
        
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.myProducts(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {Allocated_Results, data} = this.state
        return(
            <>

            <TemporaryDrawer/>


                <div className="main">

                  <div className="fitter">
                  
                  <div className="page-grid">
                       <div className="left">
                      
                          <div className="">
                                <h3 className="intro-header ">
                                Start Selling Online for Free
                            </h3>

                              <p className="pText">
                              Join hundreds of thousands of small businesses
                              who trust Ecwid E-commerce to sell online. 
                              </p>

                              <button
                            onClick={this.redirect_page}
                              class="custom-button" >

                              <PlusCircleOutlined 
                              style={{ fontSize: '30px' ,height:30}} 
                            />  Get Started
                            </button>
                          </div>

                       </div>


                          <div className="right">
                              
                          </div>
                   </div>
               </div>

          

            <div className="fitter">
          <div className="products-layout">
            <ul className="products-layout-container">
              {
                data.map((item)=>(
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
                      <Link to={`/vendorProducts/${item.id}/`}>
                      <button className="products-item-button">
                        Open
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
      membership_type: state.membership.mode
    };
};

//const mapDispatchToProps = dispatch => {
  //return {
    //member: () => dispatch(getMembership())
//}
//}
  
export default connect(
    mapStateToProps,
    //mapDispatchToProps
)(User_Posts_Items)