import React from "react"

const Footer = () => {
  return (
    <footer>
      <div id='footer'>
        <div id='creator'>Created and Designed by Parzidog</div>
        <div id='contact'>
          <div className="box" id='phone'>
            <h2>Phone</h2>
            <p>(940) 386-1146</p>
          </div>
          <div className="box" id="email">
            <h2>Email</h2>
            <a
              href='mailto:selfstoragewichitafalls@gmail.com?subject=Message from Website&body=I would like more information regarding units at your facility'>
              selfstoragewichitafalls@gmail.com
            </a>
          </div>
          <div className="box" id='address'>
            <h2>Address</h2>
            <p>5432 Southwest Pkwy</p>
            <p>Wichita Falls, TX 76308</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer