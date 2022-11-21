import React from "react"
import Map from "./Map"

const Location = () => {
  return (
    <div id='location'>
      <div id='map'>
        <h1>{"We are located at "}
          <span style={{ textDecoration: "underline" }}>
            5432 Southwest Parkway
          </span>
          {" across the street from Memorial Stadium!"}</h1>
        <Map />
      </div>
      <div id='directions'>
        <div className='directions'>
          <h1>Directions from MSU</h1>
          <ol>
            <li>
              Head north toward Council Dr
            </li>
            <li>
              Turn left toward Council Dr
            </li>
            <li>
              Turn right at the 1st cross street onto Council Dr
            </li>
            <li>
              Turn left onto Hampstead Ln
            </li>
            <li>
              Slight left to stay on Hampstead Ln
            </li>
            <li>
              Turn left onto Kemp Blvd
            </li>
            <li>
              Turn right onto Southwest Pkwy
            </li>
            <li>
              Destination will be on the right
            </li>
          </ol>
        </div>
        <div className="directions">
          <h1>Directions from Sheppard AFB</h1>
          <ol>
            <li>Head southwest on Sheppard Access Rd toward Enterprise St</li>
            <li>Keep left to continue on TX-325 Spur S</li>
            <li>Take the I-44 W/US-277 S/US-281 S exit toward US-287 S/Wichita Fls/Ft Worth</li>
            <li>Merge onto I-44/US-277 S/US-281 S</li>
            <li>Continue onto US-277 S/US-281 S/US-287 S</li>
            <li>Take the US-82 W/US-277 S exit toward Lubbock/Abilene</li>
            <li>Continue onto US-277 S/US-82 W</li>
            <li>Take the exit toward FM-1634/Barnett Rd</li>
            <li>Merge onto Kell W Blvd</li>
            <li>Turn left onto Barnett Rd</li>
            <li>Turn right onto Southwest Pkwy</li>
            <li>
              Destination will be on the right
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Location