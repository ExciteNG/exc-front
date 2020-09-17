import React from 'react'
import Logo from '../../assets/img/ExciteLogo.png'

export default function featureNav() {
    return (
        <header>
            <div>                
                <ul className="featureNav-content">
                    <div className="featureNav-left">
                        <li className="featureNav-list-logo">
                        <img
                              className="logo"
                              src={Logo} /> 
                        </li>
                        <li className="featureNav-list">
                            <span className="featureNav-item">News</span>
                        </li>
                        <li className="featureNav-list">
                            <span className="featureNav-item">Contact</span>
                        </li>
                    </div>
                    <div className="featureNav-right">        
                        <li className="featureNav-list" >
                            <span className="featureNav-item"className="featureNav-item">Sell on excite</span>
                        </li>        
                        <li className="featureNav-list" >
                            <span className="featureNav-item">Login</span>
                        </li>
                        <li className="featureNav-list-button">
                            <button className="featureNav-button">
                                Get started on Excite
                            </button>
                        </li>
                    </div>
                </ul>
            </div>

        </header>
    )
}
