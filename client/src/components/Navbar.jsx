import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav id='navbar'>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div id='nav-buttons'>
        <Link to={"pricing"}>
          <h2>Unit Pricing</h2>
        </Link>
        <Link to={"location"}>
          <h2>Location</h2>
        </Link>
        <Link to={"size"}>
          <h2>Size Guide</h2>
        </Link>
        <Link to={"faq"}>
          <h2>
            FAQ
          </h2>
        </Link>
        <Link to={"contact"}>
          <h2>
            Contact Us
          </h2>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar