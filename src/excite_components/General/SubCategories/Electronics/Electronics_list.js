import React , {  Component }from 'react';
import axios from 'axios'
//import { Link, withRouter } from 'react-router-dom';
 
import {
    Form,
    Select,
    Input,
     
  } from "antd";
 
//import Nav from '../../../containers/nav'
import ExciteNav from '../../sections/nav'
import NewFooter from '../../newHome/footer'

import Query_Results from '../../Queried_Results'

import Uploaded_Post from '../../Items'

 
const Search = Input.Search;
const { Option } = Select;


const host = 'http://127.0.0.1:8000';
const slug = 'electronics'

const Brands = ['','LG','Samsung','Sony', 'Hi-Sense']
const electronic_type = ['','Audio', 'Video']

class Electronics_Items extends Component{
    state = {
        items : [],
        loading : true,
        error:null,

        search_results :[],
        loading_query : false,


        show_results : true,
        categories : [],

    }

    

    Get_Items = async()=>{
        const endpoint = host + `/retail/item-category-list/`
        await axios.get(endpoint,{
            params:{
                slug
            }
        } )
        .then(res=>{
            this.setState({
                items: res.data,
                loading: false,
            })
            console.log('items', res.data)
        })
    }

    Search_Query = (values,err) =>{
       const title =  
            values["title"] === undefined ? null : values["title"] ;
        const electronic_category = 
            values["electronic_category"] === undefined ? null : values["electronic_category"] ;
        
        const electronic_type = 
            values['electronic_type'] === undefined ? null : values['electronic_type'] ;
        const color = 
            values['color'] === undefined ? null : values['color'] ;
        const size = 
            values['size'] === undefined ? null : values['size'] ;
        const brand = 
            values['brand'] === undefined ? null : values['brand'] ;
        const condition = 
            values['condition'] === undefined ? null : values['condition'] ;
        const price = 
            values['price'] === undefined ? null : values['price'] ;
        const location = 
          values['Location'] === undefined ? null : values['Location'] ;
  
       
        if(!err){
            const endpoint_value ='search_electronics'
            const Query_Url = host + `/retail/${endpoint_value}/`
            
            axios.get(Query_Url,{params:{
                title,electronic_category,electronic_type,
                    color,size
                ,brand,condition,price,location
            }})
            .then(res=>{
                this.setState({
                    search_results: res.data,
                    show_results: false,
                })
                console.log('search result', res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
          //search query contents ends here
      };

      componentDidMount(){
        this.Get_Items()
      }

    render(){
        const {items,categories,  loading ,search_results , show_results, error } = this.state
        const query_results = search_results
        return(
            <>
        <ExciteNav/>
 
<div
    
    className="container mx-auto ">
            <div className="productListing-flex">
        
  
          <div className="left">    
                <div className ="form-box">
                <Form 
                className="form-box-width"
                onFinish={this.Search_Query}>
                  <Form.Item>
                  
                </Form.Item>
                <Form.Item name ="title">
                  
                <Search placeholder=" Title " />
                    
                </Form.Item>

                <Form.Item name ="electronic_category">
                      <Select placeholder ="Electronic Category">
                      <Option value="">None</Option>
                         <Option value="Lagos">Audio</Option>
                      </Select>
                </Form.Item>

                <Form.Item name ="electronic_type">
                      <Select placeholder ="Electronic">
                        {
                            electronic_type.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>
                
                <Form.Item name ="brand">
                      <Select placeholder ="Brand">
                        {
                            Brands.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name = "Location">
                      <Select placeholder ="Select a location">
                      <Option value=""></Option>
                      <Option value="Lagos">Lagos</Option>
                      <Option value="Calabar">Calabar</Option>
                      <Option value="Uyo">Uyo</Option>
                      </Select>
                </Form.Item>
           
               
                  <Form.Item >
                  
                  <div>
                
                  <Form.Item name = "Price_Range" style={{ marginBottom: 0 }}>
                        <Form.Item
                        name="year"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                        <Input placeholder="Starting Price" />
                        </Form.Item>
                        <Form.Item
                        name="month"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                        <Input placeholder="Closing Price" />
                        </Form.Item>
                    </Form.Item>

              </div>

                  </Form.Item>

                  <Form.Item >
                  <Form.Item >
                    <button className="custom-button" type="primary" htmlType="submit">
                      Filter
                    </button>
                  </Form.Item>
                  </Form.Item>
                </Form>
          
                </div>
          </div>
          <div className="right">
                  {
                  show_results ?(
                    <Uploaded_Post slug_class={slug}  Items={items}/>
                  ):(
                   <Query_Results  slug_class={slug} Results={search_results}/>
                  )
                }
  
              </div>
            </div>
        </div>

                <NewFooter/>

            </> 
        )
    }


}

export default Electronics_Items;