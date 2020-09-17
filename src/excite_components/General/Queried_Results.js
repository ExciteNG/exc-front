import React from 'react';
import {Rate} from 'antd';
import { Link, withRouter } from 'react-router-dom';


const openItem= (endpoint)=>{
    window.location.replace(endpoint)
}

const Query_Results = props =>{
    const searched_items =  props.Results
    const items_props = props.Results
    const slug = props.slug_class
    

    return(
        <>
                         
                         <div className="products-layout">
            <ul className="products-layout-container">
              {
                items_props.map((item)=>(
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
          
                    </>
    )
}

export default Query_Results;