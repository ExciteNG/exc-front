import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import AffiliateUsersTable from './Table/affiliateTableDetail'
import TemporaryDrawer from '../Sidebar/SideNav'


class AffDetail extends Component {

    state = {
        aff_det: '',
        user_list: ''
    }

    getAffiliateUsers = (token, ref) => {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    };
      axios.get(`https://backend-entr.herokuapp.com/excite-admin-connect/get-affiliate-users/${ref}/`)
      .then(res => {
        this.setState({
          user_list: res.data
        })
      })
    }

    getAffiliateCode = (token) => {
      const affiliateID = this.props.match.params.affID;
      console.log(affiliateID);

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios.get(`https://backend-entr.herokuapp.com/excite-admin-connect/get-affiliate-codes/${affiliateID}/`)
        .then(res => {
            this.setState({
              aff_det: res.data[0]
            });
            const ref = this.state.aff_det.link
            console.log(ref);
                  axios.get(`https://backend-entr.herokuapp.com/excite-admin-connect/get-affiliate-users/${ref}/`)
            .then(res => {
              this.setState({
                user_list: res.data
              })
            })
          });
    
    }

  

    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getAffiliateCode(this.props.token)
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getAffiliateCode(newProps.token)
         }
        }
      }
    

    render() {
        const {aff_det, user_list } = this.state
        console.log(aff_det);
        console.log(user_list);
        const ref_users = Array.from(user_list)
        return (
            <div>
              <TemporaryDrawer />
                <div className="main">
                  <div className="fitter">
                  <h1>Referred accounts by {aff_det.marketer} </h1>
        <h3>Number of users registered: {ref_users.length}</h3>
                <AffiliateUsersTable data={ref_users} />
                  </div>
                </div>
            </div>
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



 
export default connect(mapStateToProps,null)(AffDetail);