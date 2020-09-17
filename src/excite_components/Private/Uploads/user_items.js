import React, { Component } from 'react'
import UserUploadsTable from './table'
import TemporaryDrawer from '../Sidebar/SideNav'
import BasicTable from './new-table'

export default class UserItems extends Component {
    render() {
        return (
            <div>
                <TemporaryDrawer/>
                <div className="main">
                    <div className="intro-header-content">
                        <h1>Start Selling Online for Free</h1>
                        <p>Join hundreds of thousands of small businesses who trust Ecwid E-commerce to sell online.</p>
                        <button className="user-upload-custom-button"> Get started</button>
                    </div>

                    <div>
                        <BasicTable />
                    </div>

                </div>
            </div>
        )
    }
}
