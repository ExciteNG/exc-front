import React , {Component} from 'react'
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";


import ExciteNav from '../sections/nav'
import NewFooter from '../newHome/footer'



const host = 'http://127.0.0.1:8000'
export default class PaymentSuccessPage extends Component{
    state = {

    }

    setPay(){
        const endpoint = host + `/retail/process-pay/`
        axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
               window.location.replace("/") 
            }
        })
    }

    componentDidMount(){
        
    }

    render(){
        return(

            <>

                <ExciteNav/>
                <div className="container">

                        <div className="page-grid">
                            <div className="left">
                                <h3>
                                    Order Placed  Successful
                                </h3>
                                <p>
                                Thank You for using our service
                                </p>
                            </div>

                            <div className="right">
                                <div className="successfulPayment-image">
                                    <img
                                   style ={{width:100}}
                                    className="img-f"
                                    src="https://enterprise40.s3.eu-west-2.amazonaws.com/18980.jpg" 
                                    />
                                </div>
                            </div>
                        </div>

                </div>

                <NewFooter/>

            </>

        )
    }

}