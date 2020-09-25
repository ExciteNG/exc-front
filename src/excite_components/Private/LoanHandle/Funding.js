import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification} from 'antd';
  import TemporaryDrawer from '../Sidebar/SideNav'
     
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'http://127.0.0.1:8000/stream/view_post/'


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


const host = 'http://127.0.0.1:8000'

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
        const BuinsessType = values["BuinsessType"] === undefined ? null : values["BuinsessType"] ;
      const  BusinessAccount =
          values["BusinessAccount"] === undefined ? null : values["BusinessAccount"] ;
 
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


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('BusinessName',BusinessName);
          form_data.append('AmountRequested', AmountRequested);
          //form_data.append('Description',Description);
          form_data.append('LoanDuration', LoanDuration);
          // form_data.append('BusinessAccount', BusinessAccount)
          form_data.append('BuinsessType',BuinsessType)

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
                    name="AmountRequested"
                  >
                    <Input
                      placeholder="How much capital do you need"
                      enterButton
                    />
                  </Form.Item>
                              
                  <Form.Item rules={[{ required: true }]} name="BuinsessType">
                    <Select placeholder="What Kind of business do you run">
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
                              name="BusinessEmail"
                            >
                              <Input placeholder="Your Business Email" enterButton />
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