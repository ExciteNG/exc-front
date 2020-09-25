import React, { Component  } from 'react' 
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";

import {Rate} from 'antd'
import NewFooter from './newHome/footer';
//import Uploaded_Post from './Items'
import ExciteNav from './sections/nav'

const host = 'http://127.0.0.1:8000'
const search_url = host + `/retail/search-item/`


var Main = []

export default class Basic_Query  extends Component {

    state={
        results:[],
        loading: false ,
        error:null,

        searchResult:[] ,

    }


    searchItems = async()=>{
        const searchedItem = this.props.match.params.Title
        await axios.get(search_url, {'params':{searchedItem}})
        .then(res=>{
            this.setState({
                searchResult:res.data
            })
            console.log(res.data)
        })
           
    }
    
   
    componentDidMount(){
        
       this.searchItems()
      

    }

    render(){
        const { searchResult} = this.state
        console.log(Main)
        
        return(
            <>

                <ExciteNav/>

               <div className="fitter">
               <div className="products-layout">
            <ul className="products-layout-container">
              {
                searchResult.map((item)=>(
                  <>
                    <li className="products-item-list-container">
                 <div className="products-item-list">
                    <div className="products-item-image-container">
                      <img src={item.Image1} />
                    </div>
                    <div className="products-item-content">
                      <p className="products-item-title">
                      {item.Title}
                      </p>
                     
                      <p className="products-item-price">
                      ₦{item.Price}
                      </p>
                     
                      <p className="products-item-rating">
                      <Rate disabled defaultValue={item.Rating} />
                      </p>

                      <p className="products-item-location">
                        {item.Address}
                      </p>

                      <p className="products-item-location">
                       Delivering Nationwide
                      </p>
                    </div>

                    <div className="products-item-button-container">

                    <Link to={`/categories/${item.Category}/${item.id}`}>
                    <button className="products-item-button">
                         view
                      </button>   
                 </Link>
                    </div>
                 </div>
              </li>
                  </>
                ))
              }
            </ul>
          </div>          
               </div>

                <NewFooter/>
            </>
        )
    }

}