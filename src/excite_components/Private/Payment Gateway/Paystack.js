import React, { Component } from 'react';
import axios from 'axios'
import {notification, message} from 'antd'
//import the library
import PaystackButton from 'react-paystack';
const https = require('https')

const host = 'http://127.0.0.1:8000'
const Payment_Upgrade_Url = host + '/stream/process_plan_upgrade/'
class Paystacker extends Component {

    state = {
        key: "pk_test_96deeb613ab8f21138a6d59a1740cb3a3a1bacff", //PAYSTACK PUBLIC KEY
        sec:'sk_test_e05dacc80940b1afcb7fbc038b7ffe1ece96f294',
        email: this.props.Email,  // customer email
        amount: this.props.pricing * 100 ,//equals NGN100,multiply by 100 to get actual price
        the_membership : this.props.Membership,
        the_membership_id : this.props.Membership_id,
        'paystack_plan': this.props.Plan_Code

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
    
    callback = async (response) => {
        this.initSubscription()
        console.log('This is the response',response)
        console.log('this is selected membership',this.state.the_membership); // card charged successfully, get reference here
        const Paid_Membership = this.state.the_membership
        const Membership_Query_id = this.state.the_membership_id
        const plan_code = this.state.Plan_Code
        
      console.log('Membership paid for', Paid_Membership)
      console.log('Membership ID ', Membership_Query_id)

      const transactionResponse = response
        if (transactionResponse['status'] == 'success'){

          await axios.get(Payment_Upgrade_Url,{
            params:{
              Paid_Membership ,Membership_Query_id ,transactionResponse , plan_code
            }
          })
          .then(res =>{
            if (res.status == 200 || res.status == 201){
              this.openNotification(res.data['Message'])
              console.log(res.data)
              //this.props.history.push("/dashboard/")
              window.location.replace("/dashboard/")
            }else{
              this.openNotification('Payment Failed')
            }
          })
          .then(res =>{
            console.log('Paid for')
          })

        } else{
          message.error('Payment Failed')
        }
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

    initSubscription = async()=>{
      
        const params = JSON.stringify({
          "email":this.state.email,
          "plan" :this.state.paystack_plan ,
          "amount" :this.state.amount
        })
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: 'Bearer sk_test_e05dacc80940b1afcb7fbc038b7ffe1ece96f294',
            'Content-Type': 'application/json'
          }
        }
        const req = https.request(options, res => {
              let data = ''
              res.on('data', (chunk) => {
                data += chunk
              });
              res.on('end', () => {
                console.log(JSON.parse(data))
              })
            }).on('error', error => {
              console.error(error)
            })
            req.write(params)
            req.end()
        //ends
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
            plan={this.state.paystack_plan}
          />
        </p>
      </div>
    );
  }
}

export default Paystacker;