import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

//Admin Designs
import './assets/AdminDesigns/information-cards.css'
import './assets/AdminDesigns/SME-loans.css'

// import * as actions from "./store/actions/auth";
import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";

import './assets/css/featureHompage.css'

import './assets/css/Homepage.css'
import './assets/css/ProductsandServcies.css'
import './assets/css/LoginLayout.css'
import './assets/css/CartandOrder.css'
import './assets/css/customForms.css'

//Loads Skelenton
import './assets/css/Skeleton.css'

import './assets/css/enterprise.css'
import './assets/css/dashboard.css'
import './assets/css/payment.css'
import './assets/css/logicstics.css'
import './assets/css/post_item_cards.css'
import './assets/css/post_create.css'
import './assets/css/AuthandForm.css'
import './assets/css/unveil.css'
import './assets/css/sidebar.css'
import './assets/css/payment.css'
import './App.css'
import './assets/css/antd-override.css'
import './assets/css/cart.css'

import './assets/styles/Navigation.less'

import './assets/excite_style/dashboard.css'
import './assets/excite_style/home.css'
import './assets/excite_style/nav.css'
import './assets/excite_style/infographicsCard.css'
import './assets/excite_style/footer.css'

import './assets/kCss/header1.css'
import './assets/kCss/home.css'
import './assets/kCss/nav.css'
import './assets/kCss/shop.css'

import './assets/excite_style/imarketing.css'

//Enterprise Tools 
import './assets/VendorDesigns/Invoice.css'
import './assets/css/inventory.css'

import CustomLayout from "./layout"
//import CustomLayout from "./excite_components/containers/layout"
import PageRouter from './routes'

import './assets/excite_style/shop.css'
import './assets/AdminDesigns/newDashboard.css'

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

    render() {
        return (
            <div>
            <Router>
              <CustomLayout  {...this.props}>
                  <PageRouter />
              </CustomLayout>
            </Router>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);