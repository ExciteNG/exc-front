import React , { useState, Component }from 'react';
//import {Row, Col , List, Avatar ,Rate,Input , Spin ,Card , Form, Button } from 'antd';
//import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

import {  Rate} from 'antd';


const openItem= (endpoint)=>{
    window.location.replace(endpoint)
}

const Uploaded_Post = props =>{
  const NewProducts = props.Items
  const slug = props.slug_class
  console.log('item props',NewProducts )
  console.log('slug',slug)
   
     
    return (
      
      <>
          <div className="products-layout">
            <ul className="products-layout-container">
              {
                NewProducts.map((item)=>(
                  <>
                    <li className="products-item-list-container">
                 <div className="products-item-list">
                    <div className="products-item-image-container">
                      <img src={item.Image1} />
                    </div>
                    <div className="products-item-content">
                      <span className="products-item-title-container">
                      <p className="products-item-title">
                      {item.Title}
                      </p>
                      </span>
                     
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
    </>
              
    );
  

}

export default Uploaded_Post