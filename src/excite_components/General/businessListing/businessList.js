import React, { Component, useState } from "react";
import axios from "axios";
import Nav from "../fHomepage/sections/nav";
import {
  Form,
  Select,
  Input,
   
} from "antd";

const Search = Input.Search;
const { Option } = Select;

const host = "http://127.0.0.1:8000";
const businessCategories = ['Automobiles','Texttile','Insurace', 'Finance']
const businessStates  = ['Lagos','Ogun','Ibandan','Enugu']

export default class companiesListing extends Component {
  state = {
    businessList: [], 

    filteredBusinesses : [],
    loadedFilteredBusinesses:false,
    loading: true,
  };

  getBusinesses = async () => {
    const endpoint = host + `/core_api/leads-list/`;
    await axios.get(endpoint).then((res) => {
      this.setState({
        businessList: res.data,
        loading: false,
      });

      console.log(res.data)
    });
  };

  searchBusiness = async(e)=>{
    e.preventDefault()
    const BusinessName  = e.target.elements.BusinessName.value;
    const  BusinessState = e.target.elements.State.value;
    const endpoint = host + `/core_api/filter-businesses/`;
    await axios.get(endpoint,{
      params : {
        BusinessName,BusinessState
      }
    })
    .then((res) => {
      if (res.status == 200){
        this.setState({
          filteredBusinesses: res.data,
          loadedFilteredBusinesses: true,
        });  
      }else{
          
      }
    });


  }


  filterBusinesses = async(values)=>{

    const BusinessName = values['BusinessName']
    const BusinessCategory = values['BusinessCategory']
    const BusinessState = values['BusinessState']


    const endpoint = host + `/core_api/filter-businesses/`;
    await axios.get(endpoint,{
      params : {
        BusinessName,BusinessCategory ,BusinessState
      }
    })
    .then((res) => {
      if (res.status == 200){
        this.setState({
          filteredBusinesses: res.data,
          loadedFilteredBusinesses: true,
        });  
      }else{
          
      }
    });
   
  }

 

  componentDidMount() {
    this.getBusinesses();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.getBusinesses();
      }
    }
  }

  render() {
      const {businessList ,loadedFilteredBusinesses ,filteredBusinesses} = this.state
    return (
      <>
        <Nav />

        <div className="fitter fitter-adjust">
            <div className="page-grid">
                    

                    <div className="left">

                    <h3 className="h3text">
                Welcome to Excite Business Directory
                </h3>
                <p className="pText">
                Be visible! Obtain new customers and generate more traffic.
                 Improve social media shares. Get reviews and grow business reputation online. 
                Your company profile can include contacts and description, products, 
                photo gallery and your business location on the ma
                </p>
                         
                       <div className="search-bar-container">

                         <div class="search-bar">
                                <h3 className="search-bar-intro-header">
                                      
                                    </h3>
                        
                        <form onSubmit={(e)=>{this.searchBusiness(e)}}>
                                <input 
                                name='BusinessName'
                                type="text" class="a-input" 
                                    placeholder="What Business are you looking for?" />

                                <input
                                name = 'State'
                                type="text" class="a-input2" 
                                    placeholder="State ?" />

                                    <button className="a-search-button">
                                    Search  
                                    </button>
                          </form>
                        </div>   
                           
                         </div>      
                                      

                    </div>

                    <div className="right">
                        <div className="search-bar-image-container">
                            <img 
                            src
                            className='search-bar-image'
                            />
                        </div>
                    </div>
                </div>
            </div>



        <div className="fitter">
          <div className="business-boxesGird">
            <div className="left">
            <div className="">
                <Form  onFinish={this.filterBusinesses}>
                

                <Form.Item name ="BusinessName">
                  
                  <Search placeholder="Business Name" />
                      
                  </Form.Item>

                <Form.Item name ="BusinessCategory">
                      <Select placeholder ="Business Category">
                        {
                            businessCategories.map((b)=>(
                                <>
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>
                
                <Form.Item name ="BusinessState">
                      <Select placeholder ="Select a location">
                        {
                            businessStates.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item >
                    <button className="custom-button" 
                    htmlType="submit">
                        Filter
                    </button>
                  </Form.Item >
                  

                </Form>
          
          </div>
            </div> 


          <div className="right">
                        <>
                            {
                              loadedFilteredBusinesses ?(
                                <>
                                  <ul className="business-boxes-container ">
                                {
                                    filteredBusinesses.map((i=>(
                                        <>
                                        <li className="business-boxes-list">
                                          
                                            <div className="business-boxes-content">
                                              <div className="business-boxes-content-heading-box">
                                              <h3 className="business-boxes-heading">
                                            {i.BusinessName}
                                            </h3>
                                              </div>
                                            
                                            <hr />
                                          
                                            <p className="business-boxes-text">Email:{i.BusinessAddress}</p>
                                            <p className="business-boxes-text">Phone:{i.BusinessPhone} </p>
                                            <p className="business-boxes-text">Address:`</p>
                                            <p className="business-boxes-text">State: {i.BusinessState} </p>
                                          
                                            </div>
                                        </li>
                                        </>
                                    )))
                                }
                            </ul>           
                                </>
                              ) : (
                                <ul className="business-boxes-container ">
                                {
                                    businessList.map((i=>(
                                        <>
                                        <li className="business-boxes-list">
                                          
                                            <div className="business-boxes-content">
                                            <div className="business-boxes-content-heading-box">
                                              <h3 className="business-boxes-heading">
                                            {i.BusinessName}
                                            </h3>
                                              </div>
                                            <hr />
                                          
                                            <p className="business-boxes-text">Email:{i.BusinessAddress}</p>
                                            <p className="business-boxes-text">Phone:{i.BusinessPhone} </p>
                                            <p className="business-boxes-text">Address:`</p>
                                            <p className="business-boxes-text">State: {i.BusinessState} </p>
                                          
                                            </div>
                                        </li>
                                        </>
                                    )))
                                }
                            </ul>     
                              )
                            }
                        </>
          </div>

          </div>
        </div>
        
        <div className="fitter">
          <div className="section">
        
          </div>
        </div>
      </>
    );
  }
}
