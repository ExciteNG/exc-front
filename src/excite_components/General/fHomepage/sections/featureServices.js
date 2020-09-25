import React from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
 

const host = "http://127.0.0.1:8000"
export default class Services extends React.Component {


    state = {
        NewServices : [] ,
        loading:false,
    }


    Latest_Products =  async()=>{
        const endpoint1 = host + '/retail/latest_uploads/'
          const endpoint = host + '/retail/services-list/'
          await axios.get(endpoint1)
          
          .then(res =>{
            if (res.status == 200){
              this.setState({
                NewServices: res.data
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
          const {NewServices} = this.state
          let  LatestServices = NewServices.slice(0,6) 
        return (

            <> 
            <h1 className="product-heading">Latest Services </h1>
    
        <div className="p-box">
    
     
            <div className="p-container">

                {
                    LatestServices.map((item)=>(
                        <div className="p-card">
                    <div className="p-image">
                        <img 
                        className="p-item-image"
                        src={item.Image1}
                        />
                    </div>
                    <div className="p-info">
                    <div className="p-name">
                            <p className="p-name-title">
                            {item.Title.length < 20 ? 
                             `${item.Title}` : `${item.Title.substring(0,20)}...` }
                            </p>

                           
                    </div>
                        <div className="p-info-2">
                            <p className="f-product-seller">
                                {item.Owner}
                            </p>
                            
                            <p className="f-product-price">
                            ₦{item.Price}
                            </p>
                           
                           <button className="f-product-button">
                                <p className="f-product-button-name">
                                View
                                </p>
                           </button>
                        </div>
                    </div>
                </div>
                    ))
                } 
    
              
    
    
    
        </div>
    </div>
         
            <div className="see-more">
                <Link to="/categories/electronics">
                <button className="see-more-button">
                    See More
                </button>
                </Link>
            </div>
            
            </>
         
        )
      }
    

}

