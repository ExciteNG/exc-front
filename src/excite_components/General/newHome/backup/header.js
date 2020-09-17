import React from 'react'
import { Link, withRouter } from 'react-router-dom';

export default function NewHeader() {
    return (
        <div className="">
        <section class="k-top-container">
          
          <div class="k-showcase">
          <Link to="/categories/electronics/">
          <header >
          <h1 >Your Web Presence</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </header>
          </Link>
          </div>

            <div className="k-top-box k-top-box-a">
            <Link to="/categories/electronics/">
            <div class="">
            <h1 className="">Your Web Presence</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            </Link>
            </div>
            

          <div className="k-top-box k-top-box-b">
          <Link to="/categories/electronics/">
           <div class="">
             <h1 className="">Your Web Presence</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
           </Link>
          </div>
           

        </section>
        </div>
    )
}
