import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import EmailBuilder from './store/email'
import  PageDemo from './store/Preview'

const host = 'https://backend-entr.herokuapp.com'



export default class buyerTemplateView extends Component{
    state = {
        pageData : [],
        loading:true, 
        error:null ,  
    }


        getWebsiteData = async(token)=>{
         const page_id = this.props.match.params.pageID    
         
         const endpoint = host + `/management/open-vendor-temp/${page_id}`
      
          await axios.get(endpoint)
          .then(res=>{
              if (res.status == 200){
                this.setState({
                     pageData:res.data['previewHTML']
                })
                //alert('3dedioji')
                console.log('i work')
                console.log('the page Data',res.data['previewHTML'])
              }else{

              }
          })
        }
 
   

    componentDidMount(){
            this.getWebsiteData()
      }
    
  

      render(){
          const {AllowUser , pageData} = this.state
          console.log('ss');
          return(
                <>
                <div className="wrapper">
                  
                    <div className="fitter">
                        <div className="">
                          <PageDemo Page={pageData}/>
                        </div>
                    </div>
               
                </div>
              </>
          )
      }

}


