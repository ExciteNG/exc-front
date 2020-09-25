import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message , Checkbox } from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import axios from "axios";
import { connect } from "react-redux";

import { InboxOutlined } from '@ant-design/icons';

import FundingDetailTableDrag from './Tables/FundingDetailTable'

const host = 'http://127.0.0.1:8000'

class AdminLoanDDetailsView extends Component{
    state = {
        loanData : [] ,
        Grant : false ,
        Verify :false,
        loading: false,
    }

    getloanData = async(token)=>{
      const itemID = this.props.match.params.LoanID
        const endpoint =  host  + `/excite-admin-connect/admin-loan-detail/${itemID}`
        axios.defaults.headers = {
            "Content-Type": "multitype/form-data",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res => {
            if (res.status == 200){
                this.setState({
                    loanData : res.data ,
                    clientCACForm:res.data['cacFile']
                })
                console.log('the sme funding data',res.data)

            }
        })
    }




    //Process Loan Permit
    updatePermit(e){
      console.log(e.target.checked)
      this.setState({
        Grant: e.target.checked
      })
    }


    updateVerification(e){
       
    //  console.log(e.target.checked)
      this.setState({
        Verify: e.target.checked
      })
    }
    
    
    updateloanData = async(values)=>{
      const IntrestRate  = values['Intrest Rate']
      const Verify =  this.state.Verify
      const Grant = this.state.Grant
      
      const itemID = this.props.match.params.LoanID
      const endpoint =  host  + `/excite-admin-connect/admin-updateLoan/${itemID}`
      axios.defaults.headers = {
          "Content-Type":'application/json',
          Authorization: `Token ${this.props.token}`
        };
    
      await axios.get(endpoint, {
        params : {
          IntrestRate , Grant, Verify
        }
      })
      .then(res => {
          if (res.status == 200){
             this.getloanData(this.props.token)
              message.success('Loan Data updated Successfully')
          }else{
            message.success('Error updating data')
          }
      })

    }

    

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getloanData(this.props.token)
        }
        }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.getloanData(newProps.token)
            } 
          }
        }
    render(){
        const {loanData ,clientCACForm} = this.state
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
                              Amount Requested
                            </h3>
                            <p  className="display-card-text">
                              {loanData.AmoutRequested}
                            </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box ">
                          <h3 className="display-card-title-default">
                              Intrest Rate
                            </h3>
                            <p>
                              {
                                loanData.Permitted ? (
                                  <p className="display-card-text">
                                      {loanData.Intrest}
                                  </p>
                                ):(
                                  <p  className="display-card-text">
                                    Please Update 
                                    </p>
                                )
                              }
                            </p>
                          </div>
                      </li>

                      <li className="display-cards-list">
                          <div className="display-cards-box">
                          <h3 className="display-card-title-default">
                              Loan Duration
                            </h3>
                            <p className="display-card-text-default">
                              {loanData.LoanDuration}
                            </p>
                          </div>
                      </li>
                    </ul>
                  </div>

                  
          
              <div className ="fitter">
                <div className="page-grid">
                      
                      <div className="left">
                          <div className="SME-loan-descripton-box">
                            <div className="SME-loan-descripton-content">
                                 <h3 className="loans-text">
                                    Business Name
                                  </h3>

                                  <p className="loans-text">
                                    {loanData.BusinessName}
                                  </p>

                                  <h3 className="loans-text">
                                    Business Address
                                  </h3>

                                  <p className="loans-text">
                                  {loanData.BusinessAdress}
                                  </p>

                                  <h3 className="loans-text">
                                    Business Bank
                                  </h3>

                                  <p className="loans-text">
                                  {loanData.BusinessBank}
                                  </p>
                                   
                            </div>

                            <div className="SME-loan-descripton-content">
                                 <h3 className="loans-text">
                                    Business Address
                                  </h3>

                                  <p className="loans-text">
                                  {loanData.BusinessAdress}  {loanData.BusinessState} {loanData.BusinessCountry}
                                  </p>

                                   
                            </div>

                          
                             
                               </div>
                      </div>


                  <div className="right">
        
                                <div className="dashboard-form-box">

                                  <div className="">
                                      
                                  </div>

                                    
                                  <Form className="dashboard-form-box-width" 
                                        onFinish={this.updateloanData}>

                                    <Form.Item>
                                    <h3 className="dashboard-foreign-header">
                                          Update Loan Data
                                      </h3>
                                    </Form.Item>

                                  
                                    <Form.Item 
                                    name ="Intrest Rate">
                                    <Input
                                    placeholder="Update Intrest of Loan" />
                                    </Form.Item>

                                    <Form.Item name="Permit">
                                    
                                    {
                                      loanData.Verified ? (
                                        <Checkbox 
                                        defaultChecked={true}
                                        onChange={(e)=>{this.updatePermit(e)}}
                                        >
                                      Disable Permit
                                    </Checkbox>
                                      ) : (
                                        <Checkbox 
                                        defaultChecked={false}
                                      onChange={(e)=>{this.updatePermit(e)}}
                                      >
                                    Grant Loan
                                  </Checkbox>
                                      )
                                    }
                                  
                                    </Form.Item>



                                    <Form.Item name="Verfiy"> 
                                    
                                    {
                                      loanData.Verified ? (
                                        <Checkbox 
                                    defaultChecked={true}
                                        onChange={(e)=>{this.updateVerification(e)}}
                                        
                                        >  
                                    Disable Verification
                                    </Checkbox>
                                      ) : (
                                        <Checkbox 
                                    defaultChecked={false}
                                        onChange={(e)=>{this.updateVerification(e)}}
                                        
                                        >  
                                        Verified
                                    
                                    </Checkbox>
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
  )(AdminLoanDDetailsView);