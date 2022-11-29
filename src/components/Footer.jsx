import React, { useEffect } from "react"

const Footer = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    if (isMobile) {
      let mobileText = document.getElementsByClassName("box");
      let adminButton = document.getElementsByClassName("admin-button");
      for (let i = 0; i < mobileText.length; i++) {
        mobileText[i].style.fontSize = "small";
        mobileText[i].style.width = "fit-content";
      }
      for (let i = 0; i < adminButton.length; i++) {
        adminButton[i].style.fontSize = "small";
        adminButton[i].style.width = "fit-content";
      }
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <footer>
      <div id='footer'>
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
        <div id='creator'>Created and Designed by Parzidog</div>
        <div id="admin-button">
          <a href="/admin">Admin</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer