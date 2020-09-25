import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message , Checkbox } from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import axios from "axios";
import { connect } from "react-redux";

import { InboxOutlined } from '@ant-design/icons';

import SMEDetailTable from './Tables/SMEDetailsTables'

const host = 'http://127.0.0.1:8000'

class CacAdminBusinessDetails extends Component{
    state = {
        businessData : [] ,
        clientCACForm:null ,
        Verified:false,
        loading: false,
    }

    getbusinessData = async(token)=>{
        const itemID = this.props.match.params.CACID
        const endpoint =  host  + `/excite-admin-connect/cac-application-details/${itemID}`
        axios.defaults.headers = {
            "Content-Type": "multitype/form-data",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res => {
            if (res.status == 200){
                this.setState({
                    businessData : res.data ,
                    clientCACForm:res.data['cacFile']
                })
                console.log('the cac business data',res.data)

            }
        })
    }


    verifyBusinessData =  async()=>{
      const itemID = this.props.match.params.CACID
      const endpoint =  host  + `/excite-admin-connect/change-cac-application-status/${itemID}`
      axios.defaults.headers = {
          "Content-Type": 'application/json',
          Authorization: `Token ${this.props.token}`
        };
      await axios.get(endpoint)
      .then(res => {
          if (res.status == 200){
              this.getbusinessData(this.props.token)
          }
      }) 

    }



    updateVerification(e){
      let temp = e.target.checked
      if (temp == true){
        this.setState({
          Verified: true

        })
      }else{
        this.setState({
          Verified: false

        })
      }
      
    }

    updateBusinessData = async(values)=>{
      const RegCost  = values['Registration Cost']
      const Verify = this.state.Verified
      
      const itemID = this.props.match.params.CACID
      const endpoint =  host  + `/excite-admin-connect/update-cac-application-cost/${itemID}`
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
    
      await axios.get(endpoint, {
        params : {
          RegCost ,Verify
        }
      })
      .then(res => {
          if (res.status == 200){
              message.success('Cost updated Successfully')
              this.getbusinessData(this.props.token)
          }
      })

    }


    

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getbusinessData(this.props.token)
        }
        }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.getbusinessData(newProps.token)
            } 
          }
        }
    render(){
        const {businessData ,clientCACForm} = this.state
        console.log(this.props.token);
        return(
            <>  
               <div className="wrapper">
                   <TemporaryDrawer/>
                   <div className="main">


                  
                   <div className="fitter">
                    <ul className="display-cards-container">
                      <li className="display-cards-list">
                          <div className="display-cards-box display-green">
                            <h3 className="display-card-title-override">
                                Registraion Cost
                            </h3>
                            
                            {
                              businessData.Verified ? (
                                <p  className="display-card-text">
                                ₦ {businessData.RegistrationCost}
                                </p>
                              ) :(
                                <p  className="display-card-text">
                                Please Update
                                </p>
                              )
                            }
                            
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                          <h3 className="display-card-title-default">
                              Date Registered
                            </h3>
                            <p className="display-card-text">
                                      {businessData.DateCreated}
                                  </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box">
                          <h3 className="display-card-title-default">
                              Payment Status
                            </h3>
                            <p className="display-card-text-default">
                              {
                                businessData.Paid ? (
                                  <p>
                                    Paid
                                  </p>
                                ) : (
                                  <p>
                                      Pending
                                    </p>
                                )
                              }
                            </p>
                          </div>
                      </li>
                    </ul>
                  </div>

                   <div className="fitter">
                    <div className="">
                        <SMEDetailTable data={businessData} 
                        token={this.props.token} />
                    </div>
                </div>

          
              <div className ="fitter">
                <div className="page-grid">

                <div className="left">
                    <div className="">
                      <p>
                        Client Business Registration form 

                        </p>
                      <button 
                       onClick={(event) => { event.preventDefault(); window.open(clientCACForm); }}
                      >
                        Open Form
                      </button>
                    </div>
                </div>


                  <div className="right">
        
             <div className="dashboard-form-box">

              <div className="">
                  
              </div>

                    <Form className="dashboard-form-box-width" 
                    onFinish={this.updateBusinessData}>

                <Form.Item>
                <h3 className="dashboard-foreign-header">
                      Update Business Data
                  </h3>
                </Form.Item>

                <Form.Item 
                name ="Registration Cost">
                <Input
                placeholder="Update Cost of registration" />
                </Form.Item>

                <Form.Item name="Permit">
                  {
                    businessData.Verified ? (
                      <>
                      <Checkbox 
                     defaultChecked={true}
                    onChange={(e)=>{this.updateVerification(e)}}
                    >
                  Verify
                  </Checkbox>
                      </>
                    ): (
                      <> 
                      <Checkbox 
                      defaultChecked={false}
                     onChange={(e)=>{this.updateVerification(e)}}
                     >
                   Verify
                   </Checkbox>
                      </>
                    )
                  }
               
               
                </Form.Item>

                <Form.Item >
                  <button
                    class="form-button"
                  htmlType="submit">
                    Update
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
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(CacAdminBusinessDetails);