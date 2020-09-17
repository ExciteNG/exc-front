import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import axios from "axios";
import { connect } from "react-redux";


import { InboxOutlined } from '@ant-design/icons';

import LoanDetailTableSimple from './Tables/LoanDetailTable'

const host = 'https://backend-entr.herokuapp.com'

class vendorLoanDetails extends Component{
    state = {
      loanData : []
    }

    getLoandata = async(token)=>{
        const itemID = this.props.match.params.loanID
        const endpoint =  host  + `/management/vendor-loan-details/${itemID}`
        axios.defaults.headers = {
            "Content-Type": "multitype/form-data",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res => {
            if (res.status == 200){
                this.setState({
                    loanData : res.data
                })
              //  alert('3edwdusinj')
                console.log('loan Data',res.data)
            }
        })
    }

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getLoandata(this.props.token)
        }
        }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.getLoandata(newProps.token)
            } 
          }
        }
    render(){
        const {loanData} = this.state
        return(
            <>  
               <div className="wrapper">
                   <TemporaryDrawer/>
                   <div className="main">

                   <div className="fitter">
                    <div className="">
                        <LoanDetailTableSimple data={loanData} 
                        token={this.props.token} />
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
  )(vendorLoanDetails);