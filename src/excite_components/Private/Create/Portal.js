import React , {  Component }from 'react';
import {Rate} from 'antd'
//import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import TemporaryDrawer from '../Sidebar/SideNav'

const host = 'http://127.0.0.1:8000'

class Create_Post_Portal extends Component{
    state ={
        categories:[] ,
        loading: true,
    }

    Categories = async() =>{
    
        const category_url = host + `/retail/categories/`
        await axios.get(category_url).then( res =>{
            this.setState({
                categories : res.data ,
                loading : false
            });console.log(res.data)
                });  
       };

    redirect_page=(create_slug, category_id)=>{
    
        const endpoint = `/create/portal/${create_slug}/${category_id}/`
        this.props.history.push(endpoint)
       }
       

    componentDidMount(){
        this.Categories()
    }

    componentWillReceiveProps(){}

    render(){
        const {categories} = this.state
        return(
            <>
                <TemporaryDrawer />

                <div className="main">
                <div className="container">
                    <div className="grid-cols-4 grid ">
                        <div className="col-span-4">
                        <p style={{fontSize:30, textAlign:"center", paddingTop:10}}>
                        Select A Category
                    </p>
                        </div>
                    </div>
                </div>

            <div className="fitter">
                <ul className="post-create-container">
                    {
                        categories.map((c)=>(
                            <li
                            onClick={()=>{this.redirect_page(c.CategoryKey, c.id)}}
                             className="post-create-list">
                                
                                    <div className="create-post-box">
                                     <div className="create-post-box-content">
                                        <div className="create-post-box-content-icon">
                                        </div>
                                        <div className="create-post-box-title">
                                        <p onClick={()=>{this.redirect_page(c.CategoryKey, c.id)}}>
                                        {c.CategoryName}
                                        </p>
                                            
                                    </div>
                                </div>
                                </div>

                             </li>
                        ))
                    }
                </ul>
            </div>

                </div>

        </>
        )
    }

}

export default Create_Post_Portal;