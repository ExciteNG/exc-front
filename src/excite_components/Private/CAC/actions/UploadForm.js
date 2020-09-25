import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../../Sidebar/SideNav'

import { Link, withRouter } from 'react-router-dom';

import axios from "axios";
import { connect } from "react-redux";

import { InboxOutlined } from '@ant-design/icons';

const host = 'http://127.0.0.1:8000'
class CacUploader extends Component {
    state = {
        vendorCACForm:[]
    }

    submitReg = async()=>{

    }

    handleImageChange = (e) => {
        this.setState({
          vendorCACForm: e.target.files[0]
        })
      };


    submitReg = async(values)=>{
        const endpoint = host + `/management/create-cac-application/`
        const pdf = this.state.vendorCACForm 
        const BusinessName = values['BusinessName']

        const fd = new FormData()
        fd.append('CACPdf',pdf)
        fd.append('BusinessName', BusinessName)

        axios.defaults.headers = {
            "Content-Type": "multitype/form-data",
            Authorization: `Token ${this.props.token}`
          };
          
         await axios.post(endpoint, fd)
         .then(res =>{
             if (res.status == 200){
                 message.success('Form Submitted Successfully')
                 this.props.history.push('/register-business')
             }else{
                 message.error('Error uploading file')
             }
         })
    }

    render(){
        return(
            <>

                <div className="wrapper">
                    <TemporaryDrawer />
                   
                        <div className="main">
                        <div className="single-grid">
                    <div className="form-container">
                        <div className='form-box'>
                            <div className="form-box-width">
                            <Form 
                          
                          onFinish={this.submitReg}>

                              <Form.Item name ="BusinessName">
                              
                                  <Input
                                    placeholder="Your Business Name"
                                    
                                    enterButton
                                  />
                                
                              </Form.Item>

                              <Form.Item 
                              rules={[{ required: true }]}
                            name="Post_Image1">

                            <Input  type="file"
                            value 
                            onChange={this.handleImageChange} 
                            name="Post_Image1" />
                            </Form.Item>

                                    
                                    <Form.Item >
                                <button
                                    class="custom-button"
                                htmlType="submit">
                                    Submit
                                </button>
                                </Form.Item>

                    </Form>
                            </div>
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
      

    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(CacUploader);