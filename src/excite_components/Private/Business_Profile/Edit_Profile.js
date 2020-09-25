import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 

import {Input ,Select , Form, Button ,notification} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'


const Search = Input.Search;
const { Option } = Select; 
const {TextArea} = Input

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const VendorRole = ['Mechanic','Engineer','Computer Sales Man', 'Fashion Designer','Chef']

class Profile_Edit extends Component{
    
  state ={
    Profile_Image : '',
  }

  handleImageChange = (e) => {
    this.setState({
      Profile_Image: e.target.files[0]
    })
  };
  updateProfile = (values,err) =>{
    const host = 'http://127.0.0.1:8000'
          const First_Name =  
          values["First_Name"] === undefined ? null : values["First_Name"] ;
          const Last_Name =  
              values["Last_Name"] === undefined ? null : values["Last_Name"] ;
          const Email = 
              values['Email'] === undefined ? null : values['Email'] ;
          const Phone = 
            values['Phone'] === undefined ? null : values['Phone'] ;
          const BusinessName = values['BusinessName']

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
           fd.append('BusinessName' ,BusinessName)
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
                if (res.status == 200){
                  //this.props.history.push('/profile')
                  window.location.replace('/profile')
                  openNotification('Profile edited successfully')  
                }           
            }).catch(e =>{
              openNotification(e)
                  })

            }
            
           
        }
         //process query contents ends here
        
        upload_img  =(e)=>{
          const grab = e.target.files[0]
         
          this.setState({
            pic : grab
          }) 

          
        }

        componentDidMount(){

        }
        componentWillReceiveProps(newProps) {
            if (newProps.token !== this.props.token) {
              if (newProps.token !== undefined && newProps.token !== null) {
                
              }
            }
          }
    

    render(){
        const formItemLayout = {
            wrapperCol: { span: 12, offset: 6 }
          };
          const {Profile_Image} = this.state
        return(
           
            <>

                    <div className="">
                            <div 
                            
                            className="dashboard-form-box">

                    <Form 
                
                className="dashboard-form-box-width" 
                onFinish={this.updateProfile}>
                    <Form.Item>
                      <h1 
                       style={{fontSize:23}}
                      className="ant-form-text">Edit Profile</h1>
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

                    <Form.Item name ='BusinessName'> 
                    
                    <Input
                      placeholder="Your Business Name"
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
                      
            </>

         

        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
    
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(Profile_Edit);