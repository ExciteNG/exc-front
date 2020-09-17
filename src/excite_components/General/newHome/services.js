import React, { Component , useState } from 'react' 
import {Link} from 'react-router-dom'
import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
 
const host = 'https://backend-entr.herokuapp.com'
export default class NewService extends React.Component{
    state = {
      NewServices : [] ,
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
        const {NewServices}  = this.state
        let services = NewServices.slice(0,4)
        return(
            <>
                    
                <div className="fitter">
                  <div className="services-layout">
                   
                      <ul classNam>
                        {
                          services.map((item)=>(
                            <>
                              <li>
                        <div className="services-horizontal-box">
                            <div className="services-horizontal-left">
                                <div className="services-horizontal-box-image-container">
                                    <img src={item.Image1}/>
                                </div>
                              
                            </div>

                            <div className="services-horizontal-right">
                                <h3 className="sercive-title">
                                {item.Title}
                                </h3>
                                
                                
                                <p className="services-cost">
                                ₦ {item.Price}
                                </p>

                               
                                <p className="services-location">
                                {item.Address} {item.State}
                                </p>  

                   

                                <div className="services-button-container">
                                <Link to={`/categories/${item.Category}/${item.id}`}>
                                  <button className="services-button">
                                      view
                                    </button>   
                              </Link>
                              </div>

                            </div>

                        </div>
                        </li>
                            </>
                          ))
                          }
                      </ul>
                  </div>
                </div>

            </>
        )
        
    }
}
