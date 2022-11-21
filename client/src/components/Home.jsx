import React from "react"
import units from "../assets/units.jpg"

const Home = () => {
  return (
    <div id='home'>
      <div id='facility' style={{
        backgroundImage: `url(${units})`,
        backgroundSize: "cover",
        height: "40vh",
      }}>
        <div>

          <h1>The friendliest storage facility in Wichita Falls, TX</h1>
          <h3 id='description'>WF Self Storage offers a comprehensive storage solution suitable for all of your personal and commercial storage needs. Our facility offers an open layout that is perfect to accomodate trucks and trailers of all sizes. With our friendly, down to earth staff, we can guide you through the moving process from start to finish. Contact us today and ask about our specials.</h3>
        </div>
      </div>
      <div id="banner">
        <h1>No Deposit, No Admin Fees</h1>
      </div>
      <div id='unit-overview'>
        <div className="unit-price">
          <h2 className="price">$39 & up</h2>
          <h3 className="size">SMALL UNITS</h3>
        </div>
        <div className="unit-price">
          <h2 className="price">$84 & up</h2>
          <h3 className="size">MEDIUM UNITS</h3>
        </div>
        <div className="unit-price">
          <h2 className="price">$124 & up</h2>
          <h3 className="size">LARGE UNITS</h3>
        </div>
      </div>
    </div>
  )
}

export default Home