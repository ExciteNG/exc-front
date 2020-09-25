import React from "react";
import axios from "axios";
import { connect } from "react-redux"; 
import { Form, Input, Select, message, notification } from "antd";
//import { MessageOutlined,  LikeOutlined, StarOutlined } from '@ant-designs';
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import 'antd/dist/antd.css';
import NewFooter from "../excite_components/General/newHome/footer";
import ExciteNav from '../excite_components/General/sections/nav'

const FormItem = Form.Item

const Search = Input.Search;
const { Option } = Select; 
const {TextArea} = Input

const openNotification = (msg) => {
  notification.open({
    message: 'Profile Notification',
    description: msg
  });
};

const formItemLayout = {
    wrapperCol: { span: 12, offset: 6 }
  };

const host = 'http://127.0.0.1:8000'
const VendorRole = ['Mechanic','Engineer','Computer Sales Man', 'Fashion Designer','Chef']

class completeProfile extends React.Component{
    state = {
      Profile_Image : null,
    }
    
    handleImageChange = (e) => {
      this.setState({
        Profile_Image: e.target.files[0]
      })
    };

    Profile_ID = async (token) =>{
        const Profile_id_url  = host + `/stream/get_profile_id/`

        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(Profile_id_url)
        .then(res =>{
          const the_id = res.data
          this.setState({
            profile_id: res.data
          })
        });
        const {profile_id} = this.state
        const parse_profile_id = profile_id['Profile_id']
        console.log(parse_profile_id)
        
  
      }


    updateProfile = (values,err) =>{
        const First_Name =  
             values["First_Name"] === undefined ? null : values["First_Name"] ;
             const Last_Name =  
             values["Last_Name"] === undefined ? null : values["Last_Name"] ;
         const Email = 
             values['Email'] === undefined ? null : values['Email'] ;
         const Phone = 
           values['Phone'] === undefined ? null : values['Phone'] ;
         
         const Address = 
           values['Address'] === undefined ? null : values['Address'] ;
         
    const Bio = 
       values['Bio'] === undefined ? null : values['Bio']

     const LGA = 
         values['Local Goverment Area'] === undefined ? null : values['Local Goverment Area'] 

         const State = 
           values['State'] === undefined ? null : values['State']
         const Country = 
           values['Country'] === undefined ? null : values['Country'] 
         const Role = 
           values['Role'] === undefined ? null : values['Role']
     
          
           const Profile_Picture = this.state.Profile_Image
           //Assigns Form Data for POST request
           const fd  = new FormData()
           fd.append('Profile_Picture', Profile_Picture);
           fd.append('First_Name', First_Name);
           fd.append('Last_Name',Last_Name);
           fd.append('Email', Email);
           fd.append('Phone', Phone);
           fd.append('Address', Address);
           fd.append('LGA', LGA);
           fd.append('Bio', Bio);
           fd.append('State', State);
           fd.append('Country', Country);
           fd.append('Role', Role)


           if(!err){

             axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
             axios.defaults.xsrfCookieName = "csrftoken";
             axios.post(`http://127.0.0.1:8000/stream/edit_profile/`,fd, {
               headers : {
                 "Content-Type": "multitype/form-data",
                 Authorization: `Token ${this.props.token}`
               }
             }).then(res =>{
               this.props.history.push('/profile')
               openNotification('Profile edited successfully')             
           }).catch(e =>{
             openNotification(e)
                 })

           }
           
          
       }

    componentDidMount(){
      //  this.Profile_ID(this.props.token)

         }
 
    render(){
        return(
            <>  

            <ExciteNav/>

            <div className="container2">
            <div className="form-container">
                <div className="form-box">
                <Form 
                {...formItemLayout}
                className="form-box-width"
                onFinish={this.updateProfile}>
                    <Form.Item>
                      <h1 
                       style={{fontSize:23}}
                      className="ant-form-text">Setup Profile</h1>
                    </Form.Item>
 
                    <Form.Item name ="First_Name">
                    
                        <Input
                          placeholder="First Name"
                          
                          enterButton
                        />
                      
                    </Form.Item>

                    <Form.Item name ="Last_Name">
                    
                        <Input
                          placeholder="Last Name"
                          
                          enterButton
                        />
                      
                    </Form.Item>
                    <Form.Item name ='Email'> 
                    
                        <Input
                          placeholder="Email"
                          enterButton
                        />
                      
                    </Form.Item>

                    <Form.Item name ='Phone'> 
                    
                        <Input
                          placeholder="Phone Number"
                          
                          enterButton
                        />
                      
                    </Form.Item>
                    
                    <Form.Item name = "Role">
                        <Select placeholder ="What kind of business/service do you offer">

                          {
                            VendorRole.map((v)=>(
                              <>
                            <Option value={v}>{v}</Option>
                              </>
                            ))
                          }
                        
                        </Select>
                </Form.Item>

                    

                    <Form.Item name ='Address'> 
                    
                    <Input
                      placeholder="Address"
                      
                      enterButton
                    />
                  </Form.Item>
                     
                  <Form.Item
                  rules={[{ required: true }]}
                  name ='Local Goverment Area'> 
                  
                    <Input
                      placeholder="Local Goverment Area"
                      
                      enterButton
                    />
                  </Form.Item>
                     

                <Form.Item 
                name="Bio">
                <TextArea 
                placeholder = 'Tell us about Yourself'
                rules={[{ required: true }]}
                rows={4} />
                </Form.Item>

                <Form.Item name = "State">
                        <Select placeholder ="Your State/Province">
                        <Option value="Sport">Lagos</Option>
                        <Option value="Sport">Calabar</Option>
                        <Option value="Sport">Uyo</Option>
                        </Select>
                </Form.Item>
                
                <Form.Item name ='Country'> 
                    
                <Select placeholder ="Your Country">
                        <Option value="Sport">Nigeria</Option>
                        <Option value="Sport">Ghana</Option>
                        <Option value="Sport">Benin</Option>
                        </Select>
                  
                </Form.Item>

                <Form.Item 
                    rules={[{ required: true }]}
                  name="Post_Image1">

                  <Input  type="file"
                  
                  onChange={this.handleImageChange} 
                  name="Post_Image1" />
                  </Form.Item>

                  
                <Form.Item >
                      <button className="custom-button" type="primary" htmlType="submit">
                        Submit
                      </button>
              </Form.Item>

                        </Form>
                </div>
            </div>
            </div>

            <NewFooter/>

            </>
        )
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
  )(completeProfile);