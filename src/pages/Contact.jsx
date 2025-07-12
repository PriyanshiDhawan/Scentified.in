// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>Email: support@scentified.in</p>
      <p>WhatsApp: <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer">Message us</a></p>
      <form>
        <input placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Your message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;