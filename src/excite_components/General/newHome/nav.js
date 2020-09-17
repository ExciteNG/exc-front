import React from 'react'

export default function NewNav() {
    return (
        <div>
                    <div>
            <div className="k-nav">
                <div className="k-nav-box">
                    <div className="k-nav-list-link " ><a href="#home"><span className="link-a">Excite</span></a></div>
                    <div className="k-nav-list-link"><a  href="#news">News</a></div>
                    <div className="k-nav-list-link"><a  href="#news">About</a></div>
                    <div className="k-nav-list-link link-k">
                        {/* <Search placeholder="input search text"  onSearch={value => console.log(value)} enterButton /> */}
                    </div>
                    <div >
                        <a  href="#contact" style={{float:"right"}}> 
                            <span className=" cart">My Cart</span>
                            {/* <ShoppingCartOutlined /> */}
                        </a>
                    </div>
                    <div className="k-nav-list-link link-b" style={{float:"right"}}><a  href="/login">Login</a></div>
                    <div className="k-nav-list-link link-b" style={{float:"right"}}><a   href="/register">Register</a></div>
                </div>

                <div className="k-cat-box">
                    <div className="k-cat-link"><a href="#news">Fashion</a></div>
                    <div className="k-cat-link"><a href="#news">Electronics</a></div>
                    <div className="k-cat-link"><a href="#news">Vehicles</a></div>
                    <div className="k-cat-link"><a href="#news">Home Appliance</a></div>
                    <div className="k-cat-link"><a href="#news">Phones</a></div>
                    <div className="k-cat-link"><a href="#news">Home & Kitchen</a></div>
                </div>
            </div>
        
        </div>
        </div>
    )
}
