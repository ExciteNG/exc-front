import React, { Component , useState } from 'react' 

import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
 
const host = 'https://backend-entr.herokuapp.com'
export default class NewService extends React.Component{
    state = {
        NewProducts : [] ,
    }


    Latest_Products =  async()=>{
    
        const endpoint = host + '/retail/services-list/'
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            this.setState({
              NewProducts: res.data
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
        const {NewProducts}  = this.state
        return(
            <>
                    <div>
            <div class="k-wrapper">
        <section class="k-shop">
           <div className="s-k-card">
           <h1 className="s-text"><b>Latest Servicess</b></h1>

           <div class="k-products">

                {
                    NewProducts.map((item)=>(
                        <>
                        <div class="k-card">
                    <div class="">
                        <img class="k-card-img" 
                        src={item.Image1}
                         />
                    </div>
                    <div class="k-card-content">
                    <div className="k-title-box">
                         <p class="k-title">{item.Title}</p>
                        </div>
                        <div className="k-card-content-text">
                        
                        <p class="k-owner">Sold by <small> {item.Owner}</small></p>
                        <p class="k-price"> ₦{item.Price}</p>
                        </div>
                        <div className="k-card-button">
                        <a 
                        href={`/categories/${item.Category}/${item.id}`}>
                         <button class="btn">
                            view
                         </button>
                     </a>
                        </div>
                    </div>
                </div>
                        </>
                    ))
                }

               
              
            
            </div>
           </div>
        </section>
    </div>
        </div>
            </>
        )
        
    }
}
