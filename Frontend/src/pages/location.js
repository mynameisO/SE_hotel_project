import React from "react";
import './location.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Location() {
    return (
      <div className="location-container">
        <h2>Location</h2>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-73.987654!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzEzLjEiTiA3M8KwMTcnMTMuMyJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            title="Hotel Location"
          ></iframe>
        </div>
        <div className="address">
          <p>Address: 123 Hotel St, City, Country</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Email: info@hotel.com</p>
        </div>
      </div>
    );
}