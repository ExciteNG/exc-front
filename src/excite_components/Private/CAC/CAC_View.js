import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification , Upload, message} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

import { Link, withRouter } from 'react-router-dom';

import axios from "axios";
import { connect } from "react-redux";

import { InboxOutlined } from '@ant-design/icons';
  
import CACform from '../../../assets/CACform.pdf'
import CACTableSimple from './Tables/CACTable'
const { Dragger } = Upload

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

const host = 'http://127.0.0.1:8000'



class CacRegistration extends Component{
    state = {
        user_post : [], 
        loading: false,
        error: null ,
        categories : [],

        //Used for form conntrol
       vendorBusinesses : [] ,
    }

    handleImageChange = (e) => {
      this.setState({
        Image_Post: e.target.files[0]
      })
    };
 
    getVendorRegitseredBusiness = async(token)=>{
      const endpoint = host + '/management/vendor-cac-list/' 
      axios.defaults.headers = {
        "Content-Type": "multitype/form-data",
        Authorization: `Token ${token}`
      };
      await axios.get(endpoint)
      .then(res =>{
        if (res.status == 200) {
          this.setState({
            vendorBusinesses : res.data
          })
          
          console.log('this is are the Registered businesses', res.data)
        }else{

        }
      })
    }

    Category_ID= this.props.match.params.categoryID

    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Address = 
           values["Address"] === undefined ? null : values["Address"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
      const  Color =
          values["Color"] === undefined ? null : values["Color"] ;
        const  Brand =
          values["Brand"] === undefined ? null : values["Brand"] ;
        const  Size =
          values["Size"] === undefined ? null : values["Size"] ;
       const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;
          
       const  Electronic_Category =
          values["Electronic_Category"] === undefined ? null : values["Electronic_Category"] ;

        
          const Original_User_id = this.state.Owner
          const Category = parseInt(this.Category_ID)
          const Image_Post = this.state.Image_Post


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Location',Location);
          form_data.append('Price', Price);
          //form_data.append('Owner', Original_User_id);
          form_data.append('Electronic_Category', Electronic_Category)

          form_data.append('Address',Address)
          form_data.append('Image_Post',Image_Post);
          form_data.append('Color',Color);
          form_data.append('Brand',Brand);
          form_data.append('Size',Size);
          form_data.append('Condition',Condition);

          form_data.append('Country',Country)
          form_data.append('State', State)
 
  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_electronics/`
            axios.post(upload_url,form_data, {
              headers : {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              }
            } )
            .then(res =>{
              if (res.status == 200){
                console.log(res.data)
            const take_response = res.data['Message']
            openNotification(take_response)  
            this.props.history.push("/user_uploads") 
                }  else{
                    openNotification('Error Creating Product') 
                }  
            })
             
          }
        
          thisLoadPDf = async()=>{
            const endpoint = ''
            await axios.get(endpoint)
            .then(res =>{
              if (res.status == 200){

              }else{

              }
            })
          }

      
          componentDidMount(){
            if (this.props.token !== undefined && this.props.token !== null) {
              this.getVendorRegitseredBusiness(this.props.token)
            }
            }
      
          componentWillReceiveProps(newProps) {
              if (newProps.token !== this.props.token) {
                if (newProps.token !== undefined && newProps.token !== null) {
                  this.getVendorRegitseredBusiness(newProps.token)
                }
              }
            }
  
            render(){
                const { Price,Image_Post } = this.state
                return(
                    <>

                    <TemporaryDrawer/> 
                    
                    <div className="main">
                      
                      <div className="fitter">
                          <div className="page-grid">
                            <div className="left">

                              <div className="">
                                <h3 className="intro-header">
                                Download  CAC  Registration Form
                                </h3>

                                <p className="pText">
                                Join hundreds of thousands of small businesses
                              in registering your business hosted by exciteds.
                                </p>
                              </div>
                                
                                <div className="">
                          <button 
                          onClick={(event) => { event.preventDefault(); window.open(CACform); }}
                          className="custom-button">
                                 Dowload Form
                                    </button>  
                                </div>

                          </div>

                          <div className="left">

                            <div className="">
                                <h3 className="intro-header">
                                Get Started
                                </h3>

                                <p className="pText">
                                Register your business and let Excite Process it
                                </p>
                              </div>

                              <div className="">
                              
                              <Link to="/upload-business-data">
                              <button 
                          className="custom-button">
                                 Register Now
                            </button>
                              </Link>
                              </div>
                          </div>
                      </div>

                    </div>

                        <div className="fitter">
                        <div className="">

                              <div className ="">
                                  <h3>
                                    My Buinesses
                                  </h3>
                                  <div className="">
                                    <CACTableSimple token={this.props.token}
                                    data={this.state.vendorBusinesses} /> 
                                  </div>
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
  )(CacRegistration);