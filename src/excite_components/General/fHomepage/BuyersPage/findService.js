import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import { connect } from "react-redux";
import {message ,Rate} from 'antd'

import Nav from '../sections/nav'
import NewFooter from '../sections/footer'

 
const host = "http://127.0.0.1:8000"

export default class servicesFinder extends Component{

    state = {
        searchResult : [] ,
        notEmpty: true, 

    }

    searchService = async(e)=>{
        e.preventDefault()

        // const UserRole = this.props.match.params.roleType
       // const searchedLocation = this.props.match.params.Location

        const name  = e.target.elements.ServiceName.value;

        const  location = e.target.elements.ServiceName2.value;
         
        
        

        if (name && location){
          const search_url = host + `/retail/geoSearch-business/`
          
          await axios.get(search_url, { params:{name , location}})  
          .then(res=>{
              if(res.status == 200){
                this.setState({
                  searchResult:res.data ,
                  
              })
                if (res.data > 0 ){
                  this.setState({notEmpty:true})
                }
                console.log('the data',res.data)
              } else{

              }
          })
        }else{
          message.error('Please Input Your Search')
        }
                
    }


    componentDidMount(){
        //this.searchService()
     }
    

     render(){
         const {notEmpty ,searchResult} =  this.state

         return(
            <>
            <Nav/>
            <div className="fitter fitter-adjust">
            <div className="page-grid" >
                    

                    <div className="left">

                        <div className="">
                            <h3 className="homepage-intro">
                            Find A Service
                            </h3>    
                                <p className="homepage-text">
                                    Leverage the influencer Marketing on the Excite platform to 
                                    <br/>
                                    boost your products and services
                                </p>
                                
                        </div> 
                        
                       <div className="search-bar-container">

                         <div class="search-bar">
                                <h3 className="search-bar-intro-header">
                                      
                                    </h3>
                        
                        <form onSubmit={(e)=>{this.searchService(e)}}>
                                <input 
                                name='ServiceName'
                                type="text" class="a-input" 
                                    placeholder="What Service are you looking for?" />

                                <input
                                name = 'ServiceName2'
                                type="text" class="a-input2" 
                                    placeholder="Location?" />

                                    <button className="a-search-button">
                                    Search  
                                    </button>
                          </form>
                        </div>   
                           
                         </div>      
                                      

                    </div>

                    <div className="right">
                        <div className="search-bar-image-container">
                            <img 
                            src={'https://vccloud.blob.core.windows.net/vcsites/vcimages/resource/uploads/uploads/HomePage/WEB/sample2.jpg?fit=clip&w=500&h=500'}
                            className='search-bar-image'
                            />
                        </div>
                    </div>
                </div>
            </div>

            
                            <>

                {
                    notEmpty ? (
                        <>
                              <div className="fitter">
                                            
                              <div className="p-box">
                        
                        
                        <div className="p-container">

                            {
                                searchResult.map((item)=>(
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
                                    
                                    <Link to={`/categories/${item.Category}/${item.id}`}>
                                    <button className="f-product-button">
                                            <p className="f-product-button-name">
                                            View
                                            </p>
                                    </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                                ))
                            } 

                    </div>
                    </div>          
                  </div>

                        </>
                    ) : (
                        <>

                        </>
                    )
                }


                </>



            <div className="footer-push">
              
            <NewFooter/>
            </div>

            </>
         )
     }

}