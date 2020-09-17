import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../../assets/img/ExciteLogo.png'

//import * as actions from '../../store/actions/auth';
import * as actions from '../../../store/actions/auth'
import { Input } from 'antd';

import {UserOutlined,  ShoppingCartOutlined,AudioOutlined ,LoginOutlined,LogoutOutlined} from '@ant-design/icons'

import axios from 'axios'



const host = 'https://backend-entr.herokuapp.com'

const Search = Input.Search;


class ExciteNav extends React.Component{
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
       
   redirect_page=(category_slug)=>{
    const endpoint = `/categories/${category_slug}/`
    window.location.replace(endpoint)
   }

   promptSearch = async(e)=>{
    e.preventDefault()
    
    const search_input = e.target.elements.searchBox.value;
    console.log(search_input)
    const endpoint = `/search_query/${search_input}/`
    this.props.history.push(endpoint)
   // alert(endpoint)
 //  window.location.replace(endpoint)

    }

   handleLogout = () =>{
    window.location.reload()
    this.props.logout();
   
  }
   

    componentDidMount(){
        this.Categories()
        console.log(this.props.token);

    }

    // componentDidMount(){

    //     if (this.props.token !== undefined && this.props.token !== null) {
    //       this.Categories() 
    //     }
    //   }
      
    //   componentWillReceiveProps(newProps) {
    //     if (newProps.token !== this.props.token) {
    //       if (newProps.token !== undefined && newProps.token !== null) {
    //         this.Categories(newProps.token)
    //         this.Latest_Products(newProps.token)
    //        // this.Account_Type(this.props.token)
    //           this.Latest_Products(newProps.token)
    //      }
    //     }
    //   }
    

    render(){
        const {categories} = this.state
        const {token, isAuth,is_seller, is_buyer} = this.props

        const suffix = (
            <AudioOutlined
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
            />
          );
        return(
            <>

                <div>

                                        <div className="topnav">

                            <div className="NavLogo">
                            <Link to="/">
                            <img
                            className="ExciteLogo"
                             src={Logo} /> 
                            </Link>
                            </div>
                        

                        
                        <>
                        {
                            isAuth?(
                                <>
                                <div className="userAuth">
                                    {
                                        is_seller ?(
                                            <>
                                            <div className="">
                                            <Link to="/dashboard">
                                            <UserOutlined/> 
                                                </Link>
                                            </div>
                                            </>
                                        ):(
                                            <>
                                            <div className=''>
                                            <Link to="/profile/user/">
                                            <UserOutlined/> 
                                            </Link>
                                            </div>

                                            <div className="">

                                            </div> 
                                            </>
                                        )
                                    }
                                </div>
                                    
                                <div className="userAuth">
                                    <div className="">
                                    <Link to="/cart/">
                                    <ShoppingCartOutlined /> 
                                    </Link>
                                    </div>
                                    <div className="">
                                    <a onClick={this.props.logout} >
                                        <LogoutOutlined/>
                                    </a>
                                    </div>
                                </div>
                                

                                </>
                            ) :(
                                <>
                                <div className="userAuth2" >
                                <div className="">
                                <Link to="/login">
                                Login
                                  </Link>
                                    </div>
                                
                                    <div className="">
                                <Link to="/select-account">
                                Register
                                  </Link>
                                    </div>
                                
                                </div>
                                </>
                            )
                        }
                        </>

                        <div className="search-container">
                            <form onSubmit={(e)=>{this.promptSearch(e)}}>
                            <input
                            name="searchBox"
                             type="text" placeholder="Search Products and Services"/>
                            <button type="custom-nav-button">
                                Search
                            </button>
                            </form>
                        </div>

                        </div>

                </div>

                 <div>
            

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
        
        </div>
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
  

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExciteNav));