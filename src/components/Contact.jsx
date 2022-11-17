import React from 'react'

const Contact = () => {
  return (
    <div id='contact'>
      <div id='description'>
        <div className="header">

          <h1>Contact Us</h1>
        </div>
        <p>
          Feel free to call us at (940) 386-1146 with any questions you may have, or to start your next great rental experience today! You can also contact us using this online form if that is more convenient, and a member of our staff will get back to you as soon as possible.</p>
      </div>
      <div id='contact-form'>
        <form action="">
          <input type="text" placeholder='Name' />
          <input type="email" placeholder='Email' />
          <input type="tel" placeholder='Phone' />
          <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact