import React, { useRef } from "react"
import logo from "../assets/logo.png";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_95frlzb", "template_2siu0er", form.current, "XK2dyAYyrDeAvynpX")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
    openAlert();
  };

  const closeAlert = () => {
    document.querySelector(".alert").style.display = "none";
  };

  const openAlert = () => {
    const alert = document.querySelector(".alert");
    alert.style.display = "flex";
    alert.style.flexWrap = "wrap";
    setTimeout(closeAlert, 5000);
  };

  return (
    <div id='contact'>
      <div className="alert" id='alert'>
        <span className="closebtn" onClick={closeAlert}>&times;</span>
        <img src={logo} alt="logo" />
        <h2>Thank you for your message! One of our staff members will contact you shortly.</h2>
      </div>
      <div className="header">

        <h1>Contact Us</h1>
      </div>
      <p id='description'>
        {"Feel free to call us at "}
        <span
          style={{ textDecoration: "underline" }}>
          (940) 386-1146
        </span>
        {" with any questions you may have, or to start your next great rental experience today! <br />You can also contact us using this online form if that is more convenient, and a member of our staff will get back to you as soon as possible."}</p>
      <div id='contact-form'>
        <form ref={form} id="contact-form" onSubmit={handleSubmit}>
          <input type="text" name='user_name' placeholder='Full Name' required />
          <input type="email" name='email' placeholder='Email' required />
          <textarea name="message" required id="message" cols="30" rows="10" placeholder='I would like to reserve a 10 x 15!'></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact