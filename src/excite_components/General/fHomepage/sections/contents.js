import React from 'react'
import { Link, withRouter } from 'react-router-dom';

export default function Contents() {
    return (
        <>
          <div>
              <div className="page-grid">
                    <div className="right">
                        <h3 className="homepage-intro">
                        Start Selling Products
                         </h3>    
                         <p className="homepage-text">
                            Take advantage of the Excite platform to for your products   <br/>
                            and services right to your buyers
                         </p>
                         <Link to="/Vendor-signup">
                         <button className="content-button">
                             Register for free
                         </button>
                         </Link>
                         
                    </div>  

                    <div className="right">
                        <img className="page-img" src="https://image.freepik.com/free-vector/office-workers-analyzing-researching-business-data_74855-4445.jpg" />
                    </div>
                </div>  


                <div className="page-grid">
                    <div className="left">
                        <img className="page-img" src="https://image.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg" />
                    </div>  

                    <div className="right">

                        <div className="">
                            <h3 className="homepage-intro">
                                Boost your buiness with influencer Marketing
                            </h3>    
                                <p className="homepage-text">
                                    Leverage the influencer Marketing on the Excite platform to 
                                    <br/>
                                    boost your products and services
                                </p>
                                <Link to="/Vendor-signup">
                                    <button className="content-button">
                                        Register for free
                                    </button>
                                    </Link>  
                        </div>                    

                    </div>
                </div>  

                <div className="page-grid">
                    <div className="right">
                        <h3 className="homepage-intro">
                            Enterprise
                         </h3>    
                         <p className="homepage-text">
                           Register your business access loans to start  <br/> up your business
                         </p>
                         <Link to="/Vendor-signup">
                         <button className="content-button">
                             Register for free
                         </button>
                         </Link>
                    </div>  

                    <div className="right">
                        <img src="https://image.freepik.com/free-vector/couple-professionals-analyzing-graphs_74855-4393.jpg" className="page-img" />
                    </div>
                </div> 

          </div>  
        </>
    )
}
