
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import Logo from '../../assets/img/ExciteLogo.png'
import axios from "axios";
import * as actions from "../../store/actions/auth";
import {message} from 'antd'

import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

class SellerRegistrationForm extends React.Component {
    state = {

    };

    getTodayDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = yyyy + '-' +  mm + '-' +dd
        console.log(today);
        this.setState({
          date: today
        })
      }

      
  verifySubmit = (values)=> {

    const form_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const password_1 = values['password1']
    
    const password_2 = values['password2']
    
    if (password_1.match(form_regex)){
            
          if (password_1 != password_2){
            message.error('Your Passwords don`t match')
        }
        else if(password_1 && password_2 <= 8){
          message.error('Your Passwords must not be lesser than 8 letters')
        }
        
        else{
          var email_regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          const email = values['email']
          if (email.match(email_regex)){
            //Email Validation passes
            
            // this.props.onAuth(
            //   values['username'],
            //   values['email'] ,
            //   values['password1'],
            //   values['password2'],
            //   is_buyer,
              
              // expirationDate: new Date(new Date().getTime() + 3600 * 1000)
            // );
            
                      const password1 = values['password1']
                      const password2 = values['password2']

                      const username = values['username']
                      const email = values['email']
                      
                      const option = values['option']
                      const refferal_code = values['refferal_code']
                      const registered_date = this.state.date
                      console.log(username);
                     
                      console.log(password1);
                      console.log(password2);
                      console.log(refferal_code);
                      let is_buyer = false;
                      let is_seller;
                      let is_marketer;
                      if (values.option === "buyer") is_buyer = true;
                      const user = {
                      username,
                      email,
                      password1,
                      password2,
                      refferal_code,
                      registered_date,
                      is_buyer,
                      is_seller: !is_buyer,
                      is_marketer: true,
                      
                      };
                      console.log(user);
                      axios
                      .post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
                      .then(res => {
                        const user = {
                          token: res.data.key,
                          username,
                          userId: res.data.user,
                          is_buyer,
                          is_seller: !is_buyer,
                          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
                          };
                         localStorage.setItem("user", JSON.stringify(user));
                          console.log(user);
                           this.props.history.push("/login")
                          // window.location.reload();
                           message.success('Account created successfully')
                          // localStorage.setItem("user", JSON.stringify(user));
                          // this.props.history.push("/vendor/setup-profile/");
                     
                      })
                      .catch(err => {
                        message.error(err)
                      console.log(err);
                      });

      
          }else{
            //Email validation verifies its wrong
            message.error('Please enter a valid email adress')
          }

      } 

    }
    else{
      message.error('Your Passwords must contain at least one Uppercase \n one special character \n and one numeric digit ')
    }
  
  };


    handleSubmit = (values) => {
      const password1 = values['password']
      const password2 = values['confirm']

        const username = values['username']
        const email = values['email']
        
        const option = values['option']
        const refferal_code = values['refferal_code']
        const registered_date = this.state.date
        console.log(username);
        console.log(option);
        console.log(password1);
        console.log(password2);
        console.log(refferal_code);
        let is_buyer = false;
        let is_seller;
        let is_marketer;
        if (values.option === "buyer") is_buyer = true;
        const user = {
        username,
        email,
        password1,
        password2,
        refferal_code,
        registered_date,
        is_buyer,
        is_seller: !is_buyer,
        is_marketer: true,
        };
        console.log(user);
        axios
        .post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
        .then(res => {
            const user = {
            token: res.data.key,
            username,
            userId: res.data.user,
            is_buyer,
            is_seller: !is_buyer,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000)
            };
            // localStorage.setItem("user", JSON.stringify(user));
            console.log(user);
            this.props.history.push("/dashboard")
            // window.location.reload();
        //  dispatch(authSuccess(user));
            //dispatch(fetchCart())
        //  dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
        console.log(err);
        });

    };

    componentDidMount(){
        this.getTodayDate()
    }


render() {


      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const Demo = () => {
        const onFinish = values => {
          console.log('Success:', values);
        };
      }

        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };


return (

                <div className="access-form-layout">
                <div className="access-form-image">
                <div className="access-form-bg-image">
                    <div className="access-header-intro">
                        <h3>
                        Excite Enterprise
                        </h3>
                        <p>
                        We Grow SMEs
                        </p>
                    </div>
                </div>
                </div>

                <div className="access-form-box">
                <nav className="access-main-nav">
                    <ul>
                        <li>
                        <Link to="/">
                        <div className="ExciteLogoContainer">
                        <img
                        className="ExciteLogo"
                        src={Logo} /> 
                        </div>
                        </Link>
                        </li>
                    
                    </ul>
                    </nav>

                <div className="form-box">

                        <div className="login-welcome-intro">
                                        <h3>
                                         Create an account
                                        </h3>
                                </div>

                                <Form onFinish={this.verifySubmit} 
                                className="form-box-width">
                                    <Form.Item>
                                        {/* <h1 style={{fontSize:23, textAlign:'left'}} className="">Create an account</h1> */}
                                            </Form.Item>

                                            <Form.Item name="username">
                                            
                                                <Input
                                                    placeholder="Username" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item name ="email">
                                                <Input
                                                    placeholder="Email" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item  name="password1"
                                                rules={[
                                                {
                                                required: true,
                                                    message: 'Please input your password!',
                                                    },
                                        ]}> 
                                            <Input
                                                    placeholder="Password"
                                                    enterButton
                                                />
                                            </Form.Item>

                                            <Form.Item  name="password2"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Please confirm your password!',
                                                },
                                                
                                            ]}
                                            > 
                                            <Input
                                                    placeholder="Confirm Password"
                                                    enterButton
                                                />
                                            </Form.Item>

                                            <Form.Item name ="refferal_code">
                                                <Input
                                                    placeholder="Referral Code" enterButton
                                                />
                                            </Form.Item>
                                            
                                            
                                           
                                          

                                        <Form.Item >
                                        <button
                                         className="form-button"
                                        type="submit">
                                            Submit
                                        </button>
                                    </Form.Item>

                                </Form>
                        <div className="">
                                <Link to="/login">
                                <p className="access-suggestion">
                                    Already have an account? Sign in
                                </p>
                                </Link>
                                <br/>

                                <Link to="#">
                                <p className="access-suggestion">
                                Forgot Password ? 
                                    </p>
                                </Link>
                                
                        </div>

                        </div>

                </div>
                </div>


    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Signup: (username, email, password1, password2, is_buyer) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_buyer)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerRegistrationForm);

