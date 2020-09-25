import React from "react";

export default function SearchBox() {
  return (
    <>
      <div className="search-box-grid">
        <div className="search-box-1">
          <h3 className="search-box-header-text">Welcome to Excite Business Directory</h3>

          <div className="search-box-text">
          <p className="search-box-text-p">
            Be visible! Obtain new customers and generate more traffic. Improve
            social media shares.
            {/* Get reviews and grow business reputation
            online. 
            Your company profile can include contacts and description,
            products, photo gallery and your business location on the map */}
          </p>
          </div>

          <div className="search-bar-container">
            <div class="search-bar-x">

              <form
                onSubmit={(e) => {
                  this.searchBusiness(e);
                }}
              >
                <input
                  name="BusinessName"
                  type="text"
                  class="a-input"
                  placeholder="What Business are you looking for?"
                />

                <input
                  name="State"
                  type="text"
                  class="a-input2"
                  placeholder="State ?"
                />

                <button className="a-search-button">Search</button>
              </form>
            </div>
          </div>
        </div>



      </div>
    </>
  );
}
