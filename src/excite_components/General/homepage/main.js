import React, { Component } from 'react'
import TopNav from './nav/nav'
import Banners from './sections/banners'
import Boxes from './sections/boxes'
import ProductRec from './sections/productRec'


export default class MainHomePage extends Component {
    render() {
        return (
            <div>
                <TopNav />
                <div className="container">
                    <Banners />
                    <Boxes />
                    <ProductRec />
                </div>
            </div>
        )
    }
}
