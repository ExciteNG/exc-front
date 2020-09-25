import React, { Component , useState } from 'react' 
import {Link} from 'react-router-dom'
import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
 
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="-63" rx="3" ry="3" width="158" height="158" /> 
    <rect x="3" y="107" rx="3" ry="3" width="158" height="11" /> 
    <rect x="4" y="129" rx="3" ry="3" width="158" height="11" /> 
    <rect x="6" y="143" rx="3" ry="3" width="47" height="16" />

    

  </ContentLoader>
)

const lopper = [1,2,2,4]

const host = 'http://127.0.0.1:8000'
export default class Newshop extends React.Component{
    state = {
        NewProducts : [] ,
        loading:false,
    }


    Latest_Products =  async()=>{
        
        const endpoint = host + '/retail/latest_uploads/'
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            this.setState({
              NewProducts: res.data,
              loading:true,
            })
            console.log(res.data)
          }else{
            console.log()
          }
        })
      }

      componentDidMount(){

        this.Latest_Products()
   
          this.Latest_Products()
        if (this.props.token !== undefined && this.props.token !== null) {
     
       
          this.Latest_Products(this.props.token)
              
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
    
            this.Latest_Products(newProps.token)
         
         }
        }
      }
    render(){
        const {NewProducts ,loading}  = this.state
        let LatestProdutcts = NewProducts.slice(0,4)
        return(
            <>
          

        <div className="fitter">
            {
              loading ? (
                <>
                  <div className="products-layout">
            <ul className="products-layout-container">
              {
                LatestProdutcts.map((item)=>(
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
              ) : (
               
                <>
                <div className="skeleton-layout">
                      <ul className="skeleton-layout-container">
                    
                 
                  {
                    lopper.map((i)=>(
                      <li className="skeleton-item-list-containe">
                        <MyLoader/>
                      </li>
                      
                    ))
                  }
                 
                  </ul>
                  </div>
                  </>
             
              )
            }
        </div>

            </>
        )
        
    }
}