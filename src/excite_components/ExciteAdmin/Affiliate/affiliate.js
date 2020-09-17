import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'
import AffiliateTable from './Table/affiliateTable'

class Affiliate extends Component {

    state = {
        data:  ''
    }

    getAffiliateMarketers = (token) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.get('https://backend-entr.herokuapp.com/excite-admin-connect/get-affiliate-marketers/')
        .then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    
    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getAffiliateMarketers(this.props.token)
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getAffiliateMarketers(newProps.token)
         }
        }
      }
    

    render() {
      const {data} = this.state
      console.log(data)
      const aff_data = Array.from(data)
        return (
            <>
              <TemporaryDrawer />
              <div className="main">
                  <div className="fitter">
                    <h1>List of Affiliate Marketer</h1>
                    <AffiliateTable data={aff_data}  />
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
     membership_type: state.membership.mode,
    };
  };


  
   
export default connect(mapStateToProps,null)(Affiliate);