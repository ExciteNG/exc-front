import React, { Component } from 'react';
import axios from 'axios'
import {notification , message} from 'antd'
import { connect } from "react-redux";
//import the library
import PaystackButton from 'react-paystack';
const https = require('https')

const host = 'https://backend-entr.herokuapp.com'
const Payment_Upgrade_Url = host + '/stream/process_plan_upgrade/'
class PayGen extends Component {

    state = {
        key: "pk_test_96deeb613ab8f21138a6d59a1740cb3a3a1bacff", //PAYSTACK PUBLIC KEY
        sec:'sk_test_e05dacc80940b1afcb7fbc038b7ffe1ece96f294',
        email:'taiwoadebayo4040@gmail.com',
       //
    //campaignID : this.props.campaignItemID,
        //email: this.props.Email,  // customer email
        amount: this.props.pricing * 100 ,//equals NGN100,multiply by 100 to get actual price
        

    }

    openNotification = (msg) => {
      notification.open({
        message: 'Notification Title',
        description:msg,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
    

    
    processPayment(){
      const itemID = this.props.CACprimarykey
      const endpoint =  host  + `/management/cac-payment/${itemID}/`
     
      axios.get(endpoint)
      .then(res=>{
        if (res.status == 200){
          window.location.replace('/register-business')
         // message.success(res['data'])
      }else{

      }
      })
    }


    callback = async (response) => {
       // this.initSubscription()
        console.log('This is the response',response)
        if (response.status ==  'success'){
          this.processPayment()
         // const activateCampaignEndpoint = host + `/management/active-campaign/${this.state.campaignID}/`
        }
      // const transactionRespone = response
     
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

   
    componentDidMount(){
      console.log('this is the price to be paid',this.props.pricing );
      
    }

  render() {
    return (
      <div> 
        <p>
          <PaystackButton
            text="Make Payment"
            class="payButton"
            callback={this.callback}
            close={this.close}
            disabled={true} 
               embed={true} 
            reference={this.getReference()}
            email={this.state.email}
            amount={this.state.amount}
            paystackkey={this.state.key}
            tag="button"
           
          />
        </p>
      </div>
    );
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
)(PayGen);

