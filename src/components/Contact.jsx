import React from "react"
import logo from "../assets/logo.png";

const Contact = () => {
  const [form, setForm] = React.useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log(form);
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
        <form onSubmit={handleSubmit}>
          <input type="text" name='fname' placeholder='First Name' onChange={handleChange} />
          <input type="text" name='lname' placeholder='Last Name' onChange={handleChange} />
          <input type="email" name='email' placeholder='Email' onChange={handleChange} />
          <input type="tel" name='phone' placeholder='Phone' onChange={handleChange} />
          <textarea name="message" onChange={handleChange} id="message" cols="30" rows="10" placeholder='I would like to reserve a 10 x 15!'></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact