import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification} from 'antd';
  import TemporaryDrawer from '../Sidebar/SideNav'
     
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'https://backend-entr.herokuapp.com/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};


const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}


const Electronic_Category = ['Audio','Video']
//const  Electronic_Type = ['']
const Color = ['Blue','Black', 'Red']
const Size = ['Large','Medium','Small']
const Brand = ['Hi-Sense', 'O`Riely', 'LG', 'Samsung']
const Condition = ['New', 'Foriegn Used']

const QualificationType = ['SSCE','HND' ,'BSC','MSC','PHD']
const yearExp = ['1 Years','2 Years','3 Years' , '4 Years']
const Banks = ['Access','Union Bank' ,'First Bank']

const TenureLength = ['3 Months' ,'6 Months' ,'9 Months', '12 Months']

const host = 'https://backend-entr.herokuapp.com'

class requestFunding extends Component{
    state = {
        user_post : [], 
        loading: false,
        error: null ,
        categories : [],

        //Used for form conntrol
        Owner : '',
        Title : '',
        Category :'',
        Description : '',
        Location : '',
        Price : '',
        Image_Post:'',
    }

 
    Create_Query = async(values, err)=>{
        const BusinessName =  
          values["BusinessName"] === undefined ? null : values["BusinessName"] ;
        
          
          const EmploymentStatus =  
          values["Employment Status"] === undefined ? null : values["Employment Status"] ; 
        const AmountRequested =  
          values["AmountRequested"] === undefined ? null : values["AmountRequested"] ; 
        const BusinessAddress = 
           values["BusinessAddress"] === undefined ? null : values["BusinessAddress"] ; 
    //    const Description = values["Description"] === undefined ? null : values["Description"] ;
      const  BusinessAccount =
          values["BusinessAccount"] === undefined ? null : values["BusinessAccount"] ;
      
        const MaritalStats = values['MaritalStats']
        const  BankName =
          values["BankName"] === undefined ? null : values["BankName"] ;
          
          const  LGA =
          values["LGA"] === undefined ? null : values["LGA"] ;
       const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;
          
       const  LoanDuration =
          values["LoanDuration"] === undefined ? null : values["LoanDuration"] ;

        
          const Original_User_id = this.state.Owner
          const Category = parseInt(this.Category_ID)
          ///const Image_Post = this.state.Image_Post


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('BusinessName',BusinessName);
          form_data.append('AmountRequested', AmountRequested);
          //form_data.append('Description',Description);
          form_data.append('LoanDuration', LoanDuration);
          form_data.append('BusinessAccount', BusinessAccount)
          form_data.append('MaritalStats',MaritalStats)

          form_data.append('EmploymentStatus',EmploymentStatus)

          form_data.append('LGA',LGA)
          form_data.append('BusinessAddress',BusinessAddress)
          form_data.append('BankName',BankName);
          form_data.append('Country',Country)
          form_data.append('State', State)
 
  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const loanCreateUrl= host + `/management/create-loan/`
            axios.post(loanCreateUrl,form_data)
            .then(res =>{
              if (res.status == 200){
                console.log(res.data)
            const take_response = res.data['Message']
            openNotification(take_response)  
            this.props.history.push("/SME-funding") 
                }  else{
                    openNotification('Error Creating Product') 
                }  
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
                const { Price,Image_Post } = this.state
                return(
                    <>

                    <TemporaryDrawer/> 
                    
                    <div className="main">
                      
                    <div className ="fitter">
                    <div className = "form-container">

                    <div className="form-box">
                        
             <div className="login-welcome-intro">
                              <h3>
                                Request Loan
                              </h3>
                   </div>
                        <Form 
                        className="form-box-width"
                        {...formItemLayout}
                         onFinish={this.Create_Query}>
                            
                
                            


                            
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='BusinessName'> 
                            
                                <Input
                                
                                placeholder="Buisness Name" 
                                enterButton
                                />
                            
                            </Form.Item>

                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='AmountRequested'> 
                            
                                <Input
                                
                                placeholder="How much do you intend to loan" 
                                enterButton
                                />
                            
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="LoanDuration" >
                                
                                <Select placeholder="How long do you intend ot loan" >
                                
                                {
                                  TenureLength.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                
                                </Select>
                              
                            </Form.Item>



                          <Form.Item
                             rules={[{ required: true }]}
                             name ="BankName" >
                                
                                <Select placeholder="Your Bank Name ">
                                {
                                  Banks.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='BusinessAccount'> 
                            
                                <Input
                                
                                placeholder="Business Bank Account" 
                                enterButton
                                />
                            
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Employment Status" >
                                
                                <Select placeholder="Employment Status">
                                <Option value="Employed"> Employed </Option>
                                    <Option value="UnEmployed"> Unemployed </Option>
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Marital Status" >
                                
                                <Select placeholder="Marital Status">
                                <Option value = "Married">  Married   </Option>
                                <Option value = "Single">  Single   </Option>
                                <Option value = "Divorced">  Divorced   </Option>
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ='BusinessAddress' hasFeedback>

                               <Input
                                placeholder="Your Business Address"
                                enterButton
                                />
                              
                            </Form.Item>
                            
                            <Form.Item
                             rules={[{ required: true }]}
                             name ='LGA' hasFeedback>

                               <Input
                                placeholder="Your Business Local Goverment"
                                enterButton
                                />
                              
                            </Form.Item>
                            

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='State' hasFeedback>
                                
                                <Select placeholder="Your State">
                                <Option value="Lagos">Lagos</Option>
                                <Option   value="Ibadan">Ibadan</Option>
                                <Option  value="Osun">Osun</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Country' hasFeedback>
                                
                                <Select placeholder="Country">
                                <Option value="Lagos">Nigeria</Option>
                                <Option   value="Ibadan">Ghana</Option>
                                <Option  value="Osun">Cameroon</Option>
                                </Select>
                              
                            </Form.Item>

                          

                          <Form.Item >
                          <button
                            class="custom-button"
                          htmlType="submit">
                            Request Loan
                          </button>
                        </Form.Item>

                       </Form>
                    


                        </div>

                       
                    </div>
                    </div>
                      </div>
                      
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
  )(requestFunding);