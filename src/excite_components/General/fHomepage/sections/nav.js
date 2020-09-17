import React ,{useState, useEffect} from 'react'
import Logo from '../../../../assets/img/ExciteLogo.png'
import * as actions from '../../../../store/actions/auth'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'


const host = 'https://backend-entr.herokuapp.com'

 class featureNav extends React.Component {

    state = {
        categories : [],
        loading:true,
    }

    Categories = async() =>{
    
        const category_url = host + `/retail/categories/`
        
        await axios.get(category_url).then( res =>{
            this.setState({
                categories : res.data ,
                loading : false
            });console.log(res.data)
                });  
       };

    
       componentDidMount(){
        this.Categories()
    }


    render(){
        const Passer =  false
        const {categories  } = this.state
        const {isAuth} = this.props
        console.log(isAuth);
        return (
            <header>
                <div>                
                    <ul className="featureNav-content">
                        <div className="featureNav-left">
                            <li className="featureNav-list-logo">
                            <img
                                  className="logo"
                                  src={Logo} /> 
                            </li>
                        
                             
                        </div>
                        <div className="featureNav-right"> 

                        <li className="featureNav-list" >
                                <Link
                                style={{color:'black'}}
                                to="/categories/electronics">
                                <span className="featureNav-item"className="featureNav-item">
                                    Market Place
                                </span>
                                </Link>
                                
                            </li>  

                            <li className="featureNav-list" >
                                <Link
                                style={{color:'black'}}
                                to="/vendor-signup">
                                <span className="featureNav-item"className="featureNav-item">Sell on excite</span>
                                </Link>
                                
                            </li>        
                           {
                               isAuth ? (
                                   <>

                                <li className="featureNav-list" >
                                <Link
                                style={{color:'black'}}
                                to="/dashboard">
                                <span className="featureNav-item">Dashboard</span>
                                </Link>
                                  </li>
                                 

                                      </>
                               ) : (
                                   <>
                                  <li className="featureNav-list" >
                                <Link
                                style={{color:'black'}}
                                to="/login">
                                <span className="featureNav-item">Login</span>
                                </Link>
                            </li>
                                 
                                   </>
                               )
                           }
                            <li className="featureNav-list-button">
                                <button className="featureNav-button">
                                    Get started on Excite
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
    
                <div className="cat-box">
    
                        {
                            categories.map((c)=>(
                                <>
                                <div className="cat-link">
                                <a
                                 
                                 href={`/categories/${c.CategoryKey}/`}> {c.CategoryName}</a>
                                </div>
                                </>
                            ))
                        } 
                </div>
    
            </header>
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
  

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(featureNav));