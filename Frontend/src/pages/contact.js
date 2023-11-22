import React from "react";
import './contact.css'
import { Link } from "react-router-dom";
export default function Contact() {
    return (
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, please feel free to reach out to us</p>
  
        <div className="contact-info">
          <p>Email:sehotel@gmail.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Hotel St, City, Country</p>
        </div>
  
        <Link to="/">Back to Home</Link>
      </div>
    );
}

