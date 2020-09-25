import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import { Link, withRouter } from 'react-router-dom';

import axios from "axios";
import { connect } from "react-redux";

const { Dragger } = Upload

//import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'http://127.0.0.1:8000/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};


const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}



const host = 'http://127.0.0.1:8000'



class smeClinicPortal extends Component{
    state = {
        vendorLoans : [], 
        loading: false,
        error: null ,
        categories : [],

        //Used for form conntrol
       vendorBusinesses : [] ,
    }

    handleImageChange = (e) => {
      this.setState({
        Image_Post: e.target.files[0]
      })
    };
 
    getVendorLoans = async(token)=>{
      const endpoint = host + '/management/vendor-loans/' 
      axios.defaults.headers = {
        "Content-Type": "multitype/form-data",
        Authorization: `Token ${token}`
      };
      await axios.get(endpoint)
      .then(res =>{
        if (res.status == 200) {
          this.setState({
            vendorLoans : res.data
          })
          
          console.log('this is are the loans', res.data)
        }else{

        }
      })
    }

  //  Category_ID= this.props.match.params.categoryID


  
    thisLoadPDf = async()=>{
      const endpoint = ''
      await axios.get(endpoint)
      .then(res =>{
        if (res.status == 200){

        }else{

        }
      })
    }


    componentDidMount(){
      if (this.props.token !== undefined && this.props.token !== null) {
        this.getVendorLoans(this.props.token)
      }
      }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getVendorLoans(newProps.token)
          }
        }
      }
  
            render(){
                const { Price,vendorLoans } = this.state
                return(
                    <>
                    <TemporaryDrawer/>                     
                    <div className="main">
                      

                    <div className="fitter">
                          <div className="page-grid">
                            <div className="right">

                              <div className="">

                                <h3>
                                   Excite SME Clinic
                                </h3>

                                <p className="pText">
                                We provide aspiring, emerging and experienced entrepreneurs with hands on
                                 non-conventional training, 
                                knowledge and information on how to start, grow and sustain their businesses.
                                </p>
                              </div>
                                
                                <div className="">
                          <Link to="/SME-clinic-reg/">
                          <button 
                          className="custom-button">
                            Get Started
                        </button> 
                          </Link> 
                                </div>

                          </div>

                        
                      </div>

                    </div>
                     

                       
                    </div>  

                    </>
                )
            }

}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(smeClinicPortal);