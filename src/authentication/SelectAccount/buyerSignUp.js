import React from "react";
import { Form, Input, Select, message, notification } from "antd";
import { Link, NavLink, Redirect } from "react-router-dom";
//import { MessageOutlined,  LikeOutlined, StarOutlined } from '@ant-designs';
import { connect } from "react-redux";
import Logo from '../../assets/img/ExciteLogo.png'

import * as actions from "../../store/actions/auth";
import 'antd/dist/antd.css';
//import NewFooter from "../excite_components/General/newHome/footer";
//import ExciteNav from '../excite_components/General/sections/nav'


const FormItem = Form.Item
const Option = Select.Option;

const openNotification = (msg) => {
  notification.open({
    message: 'Profile Notification',
    description: msg
  });
};


class BuyerRegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (values )=> {

    const form_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const password_1 = values['password']
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
            let is_buyer = true
            //is Buyer is true, then Seller is false
            this.props.onAuth(
              values['username'],
              values['email'] ,
              values['password'],
              values['password2'],
              is_buyer
            );
            openNotification('Account created successfully')
            this.props.history.push("/setup-profile/");
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


  render() {
   
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };

    return (
            
          <>

                        <div className="access-form-layout">
                            <div className="access-form-image">
                              <div className="access-form-bg-image">
                                <div className="access-header-intro">
                                    <h3>
                                      Excite Enterprise
                                    </h3>
                                    <p>
                                     Hello New Customer, Welcome to Excite
                                    </p>
                                </div>
                              </div>
                            </div>


                            <div className="access-form-box">

                            <nav class="access-main-nav">
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
                                                       Customer SignUp
                                                      </h3>
                                            </div>
                                            <Form className="form-box-width" 
                                                      onFinish={this.handleSubmit}>
                                                    
                                              <FormItem 
                                              rules={[{ required: true, message:'Username is required' }]}
                                              name ="username">
                                                
                                                  <Input
                                                    prefix
                                                    placeholder="Username"
                                                  />
                                              
                                              </FormItem>

                                              <FormItem
                                              rules={[{ required: true, message:'Email is required' }]}
                                              name = "email">
                                                
                                                  <Input
                                                    prefix
                                                    placeholder="Email"
                                                  />
                                              
                                              </FormItem>

                                              <FormItem 
                                              rules={[{ required: true, message:'Paswword is required' }]}
                                              name="password">
                                                
                                                  <Input.Password
                                                    prefix
                                                    type="password"
                                                    placeholder="Password"
                                                  />
                                                
                                              </FormItem>

                                              <FormItem 
                                              rules={[{ required: true, message:'You need to confirm your password' }]}
                                              name = "password2">
                                                
                                                  <Input.Password
                                                    prefix
                                                    type="password"
                                                    placeholder="Type Password Again"
                                                    
                                                    onChange={this.Validate_Passowrds}
                                                  />
                                              
                                              </FormItem>

                                              
                                              <FormItem                                            
                                              >
                                                
                                                  <Input
                                                    prefix
                                                    placeholder="Affliate Code (Optional)"
                                                  />
                                              
                                              </FormItem>

                                              <Form.Item >
                                              <button
                                                    class="form-button"
                                                  htmlType="submit">
                                                    Register
                                                  </button>
                                                </Form.Item>
                                            </Form>


                                <div className="">
                                              <Link to="/login/">
                                               <p className="access-suggestion">
                                               Already Have an account ? Login
                                                </p>
                                              </Link>
                                              <br/>

                                              
                                             
                                      </div>

                                      </div>
                           
                            </div>
                </div>

          </>

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
    onAuth: (username, email, password1, password2, is_buyer) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_buyer)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerRegistrationForm);
