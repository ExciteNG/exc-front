import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

import TemporaryDrawer from '../Sidebar/SideNav'
import axios from "axios";
import moment from 'moment';
import Load_Comments from '../../General/Comments'
import CommentForm from '../../containers/Comment_Form'

import {Button , 
     Card, Avatar , Comment, Tooltip, Rate ,  Tabs , notification } from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card; 
const { TabPane } = Tabs;

const host = 'http://127.0.0.1:8000'
const users_post_detail_url = host + '/stream/view_post_contents/'
const user_delete_post_url = host + '/stream/delete_post/'

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

class User_Post_Conent extends Component{

    state ={
        post_detail : [] ,
        productsComments : [],
        rating : null,
        chartData :[],
        quotes : [],
         }

    
    model_id = this.props.match.params.vendorProductId

         
    Get_Contents = (token) =>{

        const endpoint = host + `/retail/vendor-uploads-detail/${this.model_id}`
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(endpoint)
        .then(res =>{
            this.setState({
                post_detail : res.data
            }); console.log(res.data)
        })
        .catch(e =>{
            console.log(e)
        }) 
    }

    Delete_Post =()=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
    axios.post(user_delete_post_url + `${this.model_id}/`)
    .then(res =>{
        openNotification(res.data['Message'])
        this.props.history.push("/user_post")
    })
    .catch(e =>{
        console.log(e)
    }) 
    }

    Get_Comments = () =>{
      const model_id = this.model_id
       axios.get(`http://127.0.0.1:8000/retail/vendor-uploads-comments/${model_id}/`)
      .then(res =>{
          this.setState({
              productsComments : res.data ,
              loading : false
              })   
              console.log(res.data)
      })

     };

    Ratings = async(token)=>{
      const parse_id= this.model_id;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(`http://127.0.0.1:8000/core_api/post_rating/${parse_id}/`)
      .then( res =>{
        const ra = res.data['Rating']
        this.setState({
          rating: Math.round(ra)
        })
        console.log('rated_Data',Math.round(res.data['Rating']))
      })
    } 

    Quotes =async (token) =>{
      const parse_id= this.model_id;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(`http://127.0.0.1:8000/stream/quotations/${parse_id}/`)
      .then( res =>{
        this.setState({
          quotes : res.data
        })
      console.log(this.state.quotes)
      })
    }

    Post_Analytics = async (token) =>{
      await axios.get()
    }

    
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Get_Contents(newProps.token)
            this.Ratings(newProps.token)
            this.Quotes(newProps.token)
            

          }
        }
      }

      componentDidMount(){
        this.Get_Comments(this.props.token)
        this.Ratings(this.props.token)
        this.Quotes(this.props.token)
      }

    render(){

      const {post_detail, productsComments, rating , quotes} = this.state
      const {is_seller} = this.props
        return(

              <div>
                {
                is_seller ?(
                  <>
                 
                 <div className="wrapper">
                 <TemporaryDrawer />
                  
                    <div className="main">
                  

                    <div className="fitter">
            
            <div className="product-detail">
                <div className="p-info">
                    <img 
                    alt ='Image Appears here'
                    src={post_detail.Image1}
                     />
                </div>
                <div className="p-info"> 
                <div class="p-content">
          
            
                    <h2 >   {post_detail.Title}</h2>
                    <hr/>

                    <p > ₦{post_detail.Price}</p>

                    <Link to={`/vendor-products/${post_detail.Owner_id}`}>
                    <p >Sold by {post_detail.Owner}</p>
                    </Link>
                    
                   
                    <div className="description-card-text">
                          <Rate disabled defaultValue={3} />
                      </div>
               
                    
                   
                    <p>
                    {post_detail.Address} {post_detail.State} {post_detail.Country}
                    </p>

                    <hr/>

                    
                    
                </div>
                </div>
            </div>
            
              
        </div>

        
            <div className="fitter">

                <div className="shift100">
                  
            <Tabs defaultActiveKey="1" >
          <TabPane tab="Description" key="1">
              <div className="shift70">
              
                      <div className="description-card">
                          <div className="description-header">
                            <h2>
                              Description
                            </h2>
                            <Rate disabled defaultValue={rating} />
                          </div>
                        <div className="description-card-text">
                          {post_detail.Description}
                        </div>
                      </div>
            
              </div>
          </TabPane>
          <TabPane tab="Comments and Rating" key="2">

                  <div className="shift50">

                {
                        productsComments.map((c)=>(
                          <>
                          <Rate disabled defaultValue={c.rating} />

                          <Comment
                          author={c.name}
                          avatar={
                            <Avatar
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              alt="Han Solo"
                            />
                          }
                          content={
                            <p>
                              {c.comments}
                            </p>
                          }
                          datetime={
                            <Tooltip title>
                              <span>{c.created}</span>
                            </Tooltip>
                          }
                        />
                        </>
                          ))
                        }

                        </div>

                  </TabPane>
          
          <TabPane tab="Quotes" key="4">
            <div class="grid grid-cols-6">
              <div className="grid-col-6">

              {
                quotes.map((q)=>(
                  <>
                  <Rate disabled defaultValue={q.Requested_by} />

                  <Comment
                  author={q.name}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      {q.message}
                    </p>
                  }
                  datetime={
                    <Tooltip title>
                      <span>{q.created}</span>
                    </Tooltip>
                  }
                />
                </>
                 ))
               }                          

              </div>
            </div>
          </TabPane>
          
        </Tabs>
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

        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(User_Post_Conent);