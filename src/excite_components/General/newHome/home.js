import React from 'react'
import NewShop from './shop'
import Nav from './nav'
import NewBoxes from './boxes'
import NewHeader from './header'
import NewService from './services'
import NewFooter from './footer'
import NewBrand from './brand'
import NewSlider from './sliders'
import { Descriptions } from 'antd'
import { HomeOutlined, CarOutlined, MailOutlined }  from '@ant-design/icons'

import { Link, withRouter } from 'react-router-dom';
import ExciteNav from '../sections/nav'

import ContentLoader from "react-content-loader"

// const MyLoader = (props) => (
//   <ContentLoader 
//     speed={2}
//     width={400}
//     height={160}
//     viewBox="0 0 400 160"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
   
//   >
//     <rect x="2" y="-63" rx="3" ry="3" width="158" height="158" /> 
//     <rect x="3" y="107" rx="3" ry="3" width="158" height="11" /> 
//     <rect x="4" y="129" rx="3" ry="3" width="158" height="11" /> 
//     <rect x="6" y="143" rx="3" ry="3" width="47" height="16" />
//   </ContentLoader>
// )




export default function NewHome(props) {

    const geoSearch = async(e)=>{
        e.preventDefault()
        
        const business_input = e.target.elements.VendorRole.value;
        const location_input = e.target.elements.Location.value;
        console.log(business_input, location_input)
        const endpoint = `/results/produts/${business_input}/${location_input}/`
        props.history.push(endpoint)
       // alert(endpoint)
        //  window.location.replace(endpoint)
    
        }

        

    return (
        <>
            <div>
        <ExciteNav />

          
        <div className="">
            <NewSlider/>
        </div>

        <div class="search-bar">
                   |<form onSubmit={(e)=>{geoSearch(e)}}>
                <input 
                name='VendorRole'
                type="text" class="a-input" 
                    placeholder="What are product or Service are you looking for?" />
                <input
                name = 'Location'
                type="text" class="a-input2" 
                      placeholder="Location?" />

                <button className="a-search-button">
                Search  
                    </button>
                    </form>
            </div>


                            

        <div className="fitter">
                <div className="">
                <NewShop />
                </div>
            </div>

     
         

    <div className="fitter">

                <div className="popularCategories-intro">
                                <div className="popularCategories-intro-bar">
                                        <p>
                                        Services
                                        </p>
                                </div>
                            </div>
                                        
                            <NewService />
                            
                        </div>

                      

               <div className="offers-fitter">
               <section class="offers-section">
                <div class="offers-container">
                    <i class="fas fa-chart-pie fa-4x"></i>
                    <h3 className="offers-heading">Register</h3>
                    <p>
                        Easy Sign Up and Registration
                    </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-globe fa-4x"></i>
                    <h3 className="offers-heading">Buy and Sell</h3>
                    <p>
                    Sell commodities to VIT or Buy commodities from VIT
                    </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-cog fa-4x"></i>
                    <h3 className="offers-heading">CAC Registration</h3>
                    <p>
                    Register Your Business with Us    
                    </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-users fa-4x"></i>
                    <h3 className="offers-heading">Web Hosting</h3>
                    <p>
                        Build and Deploy websites with Excite
                    </p>
                </div>
                </section>

                <section class="offers-section">
                <div class="offers-container">
                    <i class="fas fa-chart-pie fa-4x"></i>
                    <h3 className="offers-heading">Logistics</h3>
                    <p>
                        Excite Enterprise handles logistics across the Nation
                    </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-globe fa-4x"></i>
                    <h3 className="offers-heading">Marketing</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-cog fa-4x"></i>
                    <h3 className="offers-heading">Development</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                </div>
                <div class="offers-container">
                    <i class="fas fa-users fa-4x"></i>
                    <h3 className="offers-heading">Support</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                </div>
                </section>

               </div>

               <div className="fitter">
                   
                   <div className="page-grid">
                       <div className="left">
                       <h3 className="intro-header ">
                          Start Selling Online for Free
                       </h3>

                       <p className="pText">
                       Set up your Excite store once to easily sync 
                       and sell across the nation, social media,
                  marketplaces .
                       </p>

                       </div>


                       <div className="right">
                           
                       </div>
                   </div>

                   <div className="page-grid">
                       <div className="left">
                       
                       </div>


                       <div className="right">
                       <h3 className="intro-header ">
                          Start Selling Online for Free
                       </h3>

                       <p className="pText">
                       Want easy-to-use marketing tools like Mailchimp,
              plus Google and Facebook advertising to grow your business fast? You got it.
                       </p>

                       </div>
                   </div>

                   <div className="page-grid">
                       <div className="left">
                       <h3 className="intro-header ">
                          Start Selling Online for Free
                       </h3>

                       <p className="pText">
                       Join hundreds of thousands of small businesses
                                        who trust Ecwid E-commerce to sell online. 
                       </p>

                       </div>


                       <div className="right">
                           
                       </div>
                   </div>
               </div>

               <div className="">
                <div className="signUp-section">
                    <div className="signUp-field">
                       <div className="signUp-container">
                       <h3>
                            Signup Today
                        </h3>

                        <Link>
                        <button className="signUp-button">
                            Register 
                        </button>
                        </Link>

                       </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="fitter">
                    <div className="">
                        <ul className="tiles">
                            <li className="tiles-list">
                                <div className="tiles-upper-content">
                                    <h3>
                                    Enterprise Solutions
                                    </h3>
                                    <p>
                                    Take your store to the next level with 
                                    new tools and apps from our Ecwid partners.
                                    </p>
                                </div>

                                <div className="tiles-upper-lower">
                                    <button className="custom-button">
                                    Open
                                    </button>
                                </div>
                            </li>

                            <li className="tiles-list">
                                <div className="tiles-upper-content">
                                    <h3>
                                    Enterprise Solutions
                                    </h3>
                                    <p>
                                    Take your store to the next level with 
                                    new tools and apps from our Ecwid partners.
                                    </p>
                                </div>

                                <div className="tiles-upper-lower">
                                    <button className="custom-button">
                                    Open
                                    </button>
                                </div>
                            </li>


                            <li className="tiles-list">
                                <div className="tiles-upper-content">
                                    <h3>
                                    Enterprise Solutions
                                    </h3>
                                    <p>
                                    Take your store to the next level with 
                                    new tools and apps from our Ecwid partners.
                                    </p>
                                </div>

                                <div className="tiles-upper-lower">
                                    <button className="custom-button">
                                    Open
                                    </button>
                                </div>
                            </li>
                        </ul>

                    </div>    
                </div>

              


            <NewFooter />
        </>
    )
}


// const mapStateToProps = state => {
//     return {
//       token: state.auth.token,
//       isAuth: state.auth.token !== null ,
//       is_seller: state.auth.is_seller ,
//       is_buyer:state.auth.is_buyer,
//     };
//   };
  
  
  
//   export default withRouter(connect(mapStateToProps)(GeoSearchProducts));