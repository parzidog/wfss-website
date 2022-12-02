import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    if (isMobile) {
      let navButtons = document.getElementsByClassName("nav-buttons");
      for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].style.fontSize = "small";
        navButtons[i].style.padding = "0%";
      }
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <nav id='navbar'>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div id='nav-buttons'>
        <Link to={"pricing"}>
          <h2 className="navbutton" >Pricing</h2>
        </Link>
        <Link to={"location"}>
          <h2 className="navbutton" >Location</h2>
        </Link>
        <Link to={"size"}>
          <h2 className="navbutton" >Size Guide</h2>
        </Link>
        <Link to={"faq"}>
          <h2 className="navbutton" >
            FAQ
          </h2>
        </Link>
        <Link to={"contact"}>
          <h2 className="navbutton" >
            Contact Us
          </h2>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar