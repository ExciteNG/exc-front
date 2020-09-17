import React from 'react'
import NewShop from './shop'
import Nav from './nav'
import NewBoxes from './boxes'
import NewHeader from './header'
import NewService from './services'
import NewFooter from './footer'
import NewBrand from './brand'

import ExciteNav from '../sections/nav'

export default function NewHome() {
    return (
        <div>
        <ExciteNav />
        <div className="fluid-container">
            <NewHeader />
            <NewBoxes />
            <NewShop />
            <NewService />
            <NewBrand />
            
        </div>
        <NewFooter />
        
    </div>
    )
}
