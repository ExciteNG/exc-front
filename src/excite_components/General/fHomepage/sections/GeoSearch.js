import React, { Component  } from 'react' 
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';


import {Rate,message} from 'antd'
import NewFooter from '../../newHome/footer';
//import Uploaded_Post from './Items'
import ExciteNav from '../../sections/nav'

const host = 'http://127.0.0.1:8000'

const a = '4rfc'

var Main = []

class GeoSearchProducts  extends Component {

    state={
        results:[],
        loading: false ,
        error:null,

        searchResult:[] ,

    }


    searchItems = async()=>{
        const UserRole = this.props.match.params.roleType
        const searchedLocation = this.props.match.params.Location

        if (UserRole && searchedLocation){
          const search_url = host + `/retail/geoSearch-business/`
          await axios.get(search_url, {'params':{UserRole , searchedLocation}})  
          .then(res=>{
              this.setState({
                  searchResult:res.data
              })
              console.log(res.data)
          })
        }else{
          message.error('Please input the data')
        }

      
          
    }
    
   
    componentDidMount(){
        
       this.searchItems()
      

    }

    render(){
        const { searchResult} = this.state
        console.log(Main)
        
        return(
            <>

                <ExciteNav/>

               <div className="fitter">
               <div className="products-layout">
            <ul className="products-layout-container">
              {
                searchResult.map((item)=>(
                  <>
                    <li className="products-item-list-container">
                 <div className="products-item-list">
                    <div className="products-item-image-container">
                      <img src={item.ProfilePicture} />
                    </div>
                    <div className="products-item-content">
                     
                      <p className="products-item-price">
                      {item.User_First_Name} {item.User_LastName}
                      </p>
                     
                      <p className="products-item-rating">
                      <Rate disabled defaultValue={3} />
                      </p>

                      <p className="products-item-location">
                        {item.Verified ? (
                          <p>
                              verified
                          </p>
                        ):
                        (
                          <p>
                              Not Verified
                            </p>
                        )}
                      </p>

                      <p className="products-item-location">
                       Delivering Nationwide
                      </p>
                    </div>

                    <div className="products-item-button-container">

                    <Link to={`/Vendor_Profile/${item.id}`}>
                    <button className="products-item-button">
                         View
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
               </div>

                <NewFooter/>
            </>
        )
    }

}



const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null ,
    is_seller: state.auth.is_seller ,
    is_buyer:state.auth.is_buyer,
  };
};



export default withRouter(connect(mapStateToProps)(GeoSearchProducts));