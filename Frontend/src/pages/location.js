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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.1070402519913!2d100.49386787508838!3d13.651252186730192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a251bb6b0cf1%3A0xf656e94ff13324ad!2sKing%20Mongkut%E2%80%99s%20University%20of%20Technology%20Thonburi%20(KMUTT)!5e0!3m2!1sen!2sth!4v1698751027962!5m2!1sen!2sth"
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