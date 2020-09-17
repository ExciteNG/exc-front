import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import axios from "axios";
import { connect } from "react-redux";

import PayGen from './Payment/PayWay'
import { InboxOutlined } from '@ant-design/icons';

import CACTableDetailsDrag from './Tables/CACTablesDetails'

const host = 'https://backend-entr.herokuapp.com'

class CacBusinessDetails extends Component{
    state = {
        CACDATA : []
    }

    getCACdata = async(token)=>{
        const itemID = this.props.match.params.CACID
        const endpoint =  host  + `/management/vendor-cac-details/${itemID}`
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res => {  
            if (res.status == 200){
                this.setState({
                    CACDATA : res.data
                })
                console.log('the CAC', res.data)
            }
        })
    }

    processPayment(){
      const itemID = this.props.match.params.CACID
      const endpoint =  host  + `/excite-admin-connect/cac-payment/${itemID}`
      axios.defaults.headers = {
          "Content-Type": 'application/json',
          Authorization: `Token ${this.props.token}`
        };
      axios.get(endpoint)
      .then(res=>{
        if (res.status == 200){
          message.success(res['data'])
      }else{

      }
      })
    }


    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getCACdata(this.props.token)
        }
        }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.getCACdata(newProps.token)
            } 
          }
        }
    render(){
        const {CACDATA} = this.state
        const itemID = this.props.match.params.CACID
        return(
            <>  
               <div className="wrapper">
                   <TemporaryDrawer/>
                   <div className="main">

                   <div className="fitter">
                    <div className="">
                        <CACTableDetailsDrag data={CACDATA} 
                        token={this.props.token} />
                    </div>
                </div>

                <div className="fitter">
                  <div className="page-grid">
                   
                    {
                      CACDATA.Verified ? (
                        <>
                         <div className="left">
                    <PayGen 
                          pricing = {CACDATA.RegistrationCost}
                          CACprimarykey = {itemID}
                          token = {this.props.token}
                          
                          />
                    </div>
                        </>
                      ) : (
                        <>
                          
                        </>
                      )
                    }


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
  )(CacBusinessDetails);