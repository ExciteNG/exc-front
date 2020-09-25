import React from 'react'
import {
    HomeOutlined, CarOutlined, MailOutlined
  } from '@ant-design/icons';

export default function NewBoxes() {
    return (
        <div>
        <div class="k-home-box">

            <div class="k-home-card k-box-1">
                <span className="box-color"><homeOutlined /><b>Store</b></span>
            </div>

            <div class="k-home-card k-box-1">
                <span   className="box-color"><CarOutlined /> <b>Delivery</b></span>
            </div>

            <div class="k-home-card k-box-1">
                <span className="box-color"><CarOutlined /> <b>Logistics</b></span>
            </div>

            <div class="k-home-card k-box-1">
                <span className="box-color" ><MailOutlined /><b> Email Marketing</b></span>
            </div>
       

        </div>

             
        <div className="j-brand">
                <div className="j-brand-box1">

                </div>
                <div className="j-brand-box2">

                </div>
            </div>
    </div>
    )
}
