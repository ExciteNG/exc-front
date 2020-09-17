
import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import Logo from '../../assets/img/ExciteLogo.png'
import axios from "axios";
import * as actions from "../../store/actions/auth";
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

    handleSubmit = (values) => {

        const username = values['username']
        const email = values['email']
        const password1 = values['password']
        const password2 = values['confirm']
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
        .post(`https://backend-entr.herokuapp.com/rest-auth/registration/`, user)
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

                                <Form onFinish={this.handleSubmit} className="form-box-w">
                                    <Form.Item>
                                        {/* <h1 style={{fontSize:23, textAlign:'left'}} className="">Create an account</h1> */}
                                            </Form.Item>

                                            <Form.Item name ="username">
                                            
                                                <Input
                                                    placeholder="Username" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item name ="email">
                                                <Input
                                                    placeholder="Email" enterButton
                                                />
                                            </Form.Item>
                                            
                                            <Form.Item  name="password"
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

                                            <Form.Item  name="confirm"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                    }
                                                    return Promise.reject('The two passwords that you entered do not match!');
                                                },
                                                }),
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
                                            
                                            
                                            <Form.Item  label="Option" name="option" rules={[{ required: true }]}>
                                                <Select placeholder="marketer" >
                                                    <Select.Option default value="seller">Seller</Select.Option>
                                                </Select>
                                            </Form.Item>

                                        <Form.Item >
                                        <button class="create-button" type="submit">
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

