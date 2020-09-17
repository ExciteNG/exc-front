import React from 'react'

export default function Sidebar() {

    return (
        <>
        <div class="sidenav">
                <div class="sidenav-header">
                    <img src="https://www.w3schools.com/howto/img_avatar.png"  style={{width:'80px', borderRadius: '50%'}} />
                    <p><h3>John Doe</h3></p>
                    <p>Johndoe@gmail.com</p>
                    <span><button className="profile-button">Edit Profile</button></span>
                </div>
            <a href="#about" className="link-active">Dashboard</a>
            <a href="#about">Profile</a>
            <a href="#services">Analysis</a>
            <a href="#clients">Products</a>
            <a href="#contact">Influencer Marketing</a>
            <a href="#contact">Book Keeping</a>
            <a href="#contact">Inventory</a>

        </div>
        </>
    )
}
 