import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import TemporaryDrawer from '../Sidebar/SideNav'

import EmailBuilder from './store/webCreator'
import  PageDemo from './store/Preview'

const host = 'http://127.0.0.1:8000'



export default class buyerTemplateView extends Component{
    state = {
        pageData : [],
        loading:true, 
        error:null ,  
    }


        getWebsiteData = async()=>{
         const page_id = this.props.match.params.pageID    
         
         const endpoint = host + `/management/open-vendor-temp/${page_id}`
      
          await axios.get(endpoint)
          .then(res=>{
              if (res.status == 200){
                this.setState({
                     pageData:res.data['vendorSite']
                })
                //alert('3dedioji')
                console.log('i work')
                console.log('the page Data',res.data)
                const a = res.data['vendorSite']
                console.log(a)

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


