import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import { Link, withRouter } from 'react-router-dom';

import axios from "axios";
import { connect } from "react-redux";

import { InboxOutlined } from '@ant-design/icons';
  
import CACform from '../../../assets/CACform.pdf'
import CACTableSimple from './Tables/CACListTable'
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


const Electronic_Category = ['Audio','Video']
//const  Electronic_Type = ['']
const Color = ['Blue','Black', 'Red']
const Size = ['Large','Medium','Small']
const Brand = ['Hi-Sense', 'O`Riely', 'LG', 'Samsung']
const Condition = ['New', 'Foriegn Used']

const QualificationType = ['SSCE','HND' ,'BSC','MSC','PHD']
const yearExp = ['1 Years','2 Years','3 Years' , '4 Years']

const host = 'http://127.0.0.1:8000'



class AdminCACList extends Component{
    state = {
        user_post : [], 
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
 
    getVendorRegitseredBusiness = async(token)=>{
      const endpoint = host + '/excite-admin-connect/cac-application-list/'
      
      axios.defaults.headers = {
        "Content-Type": "multitype/form-data",
        Authorization: `Token ${token}`
      };
      await axios.get(endpoint)
      .then(res =>{
        if (res.status == 200) {
          this.setState({
            vendorBusinesses : res.data
          })
          
          console.log('this is are the Registered businesses', res.data)
        }else{

        }
      })
    }


  
      componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getVendorRegitseredBusiness(this.props.token)
          
        }
        }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.getVendorRegitseredBusiness(newProps.token)
            }
          }
        }
  
            render(){
                const { vendorBusinesses} = this.state
                return(
                    <>

                    <TemporaryDrawer/> 
                     
                    <div className="main">

                    <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                              Total Registered
                            </h3>
                            <p  className="display-card-text">
                              {vendorBusinesses.length}
                            </p>
                          </div>
                      </li>
                    </ul>
                  </div>
                     

                        <div className="fitter">
                        <div className="">

                              <div className ="">
                                  <h3>
                                    Registered Buinesses List
                                  </h3>
                                  <div className="">
                                    <CACTableSimple token={this.props.token}
                                    data={vendorBusinesses} /> 
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
  )(AdminCACList);