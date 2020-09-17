import React from 'react'
import Search from './search-page'
import Nav from '../../sections/nav'
import NewFooter from '../../sections/footer'


export default function SearchPage(props) {

  const geoSearch = async(e)=>{
    e.preventDefault()
    
    const business_input = e.target.elements.VendorRole.value;
    const location_input = e.target.elements.Location.value;
    console.log(business_input, location_input)
    const endpoint = `/results/produts/${business_input}/${location_input}/`
    props.history.push(endpoint)
   // alert(endpoint)
    //  window.location.replace(endpoint)

    }

  return(
      <>
        <Nav />
        
        <div className="fitter ">
                    <div class="search-bar">
                    <h3 className="search-bar-intro-header">
                            Find A Service
                        </h3>

                        <form onSubmit={(e)=>{geoSearch(e)}}>
                        <input 
                        name='VendorRole'
                        type="text" class="a-input" 
                            placeholder="What Service are you looking for?" />
                        <input
                        name = 'Location'
                        type="text" class="a-input2" 
                            placeholder="Location?" />

                        <button className="a-search-button">
                        Search  
                            </button>
                            </form>
                    </div>
            </div>
        <NewFooter />
      </>
  )
}
