import React, { Component } from "react";
import { Input, Form, Select, notification } from "antd";
import TemporaryDrawer from "../Sidebar/SideNav";
// import { Switch ,Checkbox } from 'antd';
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from '../Sidebar/SideNav'
const { Option } = Select;
const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 },
};

const openNotification = (msg) => {
  notification.open({
    message: "Alert!",
    description: msg,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};


const Sector = [
  "Food & Beverages",
  "Clothing & Fashion Apparel",
  "Beauty & Health care",
  "Technology",
  "Logistics & Transportation",
  "Events Planning & Corporate Gifts",
  "Consulting",
];

const BusinessYear = ["1- 2 Year", "2-4 Years", "5 Years and above"];
const BusinessLocation = ["Island", "Mainland"];

const host = "http://127.0.0.1:8000";

class smeClinicForm extends Component {
  state = {
    user_post: [],
    loading: false,
    error: null,
    categories: [],

    //Used for form conntrol
    Owner: "",
    Title: "",
    Category: "",
    Description: "",
    Location: "",
    Price: "",
    Image_Post: "",
  };

  Create_Query = async (values, err) => {
    const BusinessName =
      values["BusinessName"] === undefined ? null : values["BusinessName"];

    const AmountRequested =
      values["AmountRequested"] === undefined
        ? null
        : values["AmountRequested"];
    const BusinessAddress =
      values["BusinessAddress"] === undefined
        ? null
        : values["BusinessAddress"];
    //    const Description = values["Description"] === undefined ? null : values["Description"] ;
    const PeriodRunnning =
      values["PeriodRunnning"] === undefined
        ? null
        : values["PeriodRunnning"];

    const Capital = values["Capital"] === undefined ? null : values["Capital"];

    const LoanDuration =
      values["LoanDuration"] === undefined ? null : values["LoanDuration"];


    ///const Image_Post = this.state.Image_Post

    //Assigns New Form Data
    let form_data = new FormData();
    form_data.append("BusinessName", BusinessName);
    form_data.append("AmountRequested", AmountRequested);
    form_data.append('PeriodRunnning',PeriodRunnning);
    form_data.append("LoanDuration", LoanDuration);
    form_data.append("Capital", Capital);

    axios.defaults.headers = {
      "Content-Type": "multitype/form-data",
      Authorization: `Token ${this.props.token}`,
    };
    const loanCreateUrl = host + `/management/create-loan/`;
    axios.post(loanCreateUrl, form_data).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        const take_response = res.data["Message"];
        openNotification(take_response);
        this.props.history.push("/SME-funding");
      } else {
        openNotification("Error Creating Product");
      }
    });
  };

  componentDidMount() {}

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
      }
    }
  }

  render() {
    const { Price, Image_Post } = this.state;
    return (
      <>
        <TemporaryDrawer />

        <div className="main">
          <div className="fitter">
            <div className="form-container">
              <div className="form-box">
                <div className="login-welcome-intro">
                  <h3>Excite SME Clinic</h3>
                </div>
                <Form
                  className="form-box-width"
                  {...formItemLayout}
                  onFinish={this.Create_Query}
                >
                  <Form.Item rules={[{ required: true }]} name="BusinessName">
                    <Input
                      placeholder="What is the name of your business"
                      enterButton
                    />
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true }]}
                    name="AmountRequested"
                  >
                    <Input
                      placeholder="How much capital do you need"
                      enterButton
                    />
                  </Form.Item>

                  <Form.Item rules={[{ required: true }]} name="LoanDuration">
                    <Select placeholder="How long do you intend ot loan">
                      {Sector.map((c) => (
                        <Option value={c}>{c}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item rules={[{ required: true , message:'Please Fill this field' }]} name="PeriodRunnning">
                    <Select placeholder="How Long has your business been running ">
                      {BusinessYear.map((c) => (
                        <Option value={c}>{c}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item rules={[{ required: true }]} name="BusinessLocation">
                    <Select placeholder="Where is Your Buusiness Located ">
                      {BusinessLocation.map((c) => (
                        <Option value={c}>{c}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                    
                  <Form.Item
                    rules={[{ required: true }]}
                    name="Capital"
                    hasFeedback
                  >
                    <Select placeholder="Do You Require Capital For Your Buisness">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                      
                    </Select>
                  </Form.Item>

                  <Form.Item
                    rules={[{ required: true }]}
                    name="BusinessEmail"
                  >
                    <Input placeholder="Your Business Email" enterButton />
                  </Form.Item>

                
                                     <Form.Item>
                    <button class="custom-button" htmlType="submit">
                     Submit
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    is_seller: state.auth.is_seller,
  };
};

export default connect(mapStateToProps, null)(smeClinicForm);
