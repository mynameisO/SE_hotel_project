import React from "react";
import './dine.css'
import Temple from "./image/temple.png"
import Cafe from "./image/cafe.png"
import MRT from "./image/mrt.png"

export default function Dine() {
    return (
    <div className="dine-container">
      <h2>Surrounding</h2>

      <div className="restaurant-container">
        <div className="restaurant">
          <div className="image">
            <img src={Temple} className="temple responsive-image" alt="" />
          </div>
        <div className="details">
            <h3>Local Temple</h3>
            <p>Experience spiritual tranquility in our sacred space.</p>
            <h4>Opening Hours</h4>
            <p>Monday - Sunday</p>
            <p>Morning: 6am - 12pm</p>
            <p>Evening: 4pm - 8pm</p>
            <h4>Ceremonial Days</h4>
            <p>Special ceremonies and events may have extended hours.</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 123 4567</p>
            <h4>Email</h4>
            <p>info@localtemple.org</p>
          </div>
      </div>
   
  
      <div className="restaurant">
        <div className="image">
          <img src={Cafe} className="cafe responsive-image" alt="" />
        </div>
        <div className="details">
            <h3>Cozy Cafe</h3>
            <p>Indulge in delicious coffee and treats in a warm ambiance.</p>
            <h4>Opening Hours</h4>
            <p>Monday - Sunday</p>
            <p>Weekdays: 7am - 6pm</p>
            <p>Weekends: 8am - 5pm</p>
            <h4>Special Events</h4>
            <p>Extended hours for special events and live music nights.</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 987 6543</p>
            <h4>Email</h4>
            <p>info@cozycafe.com</p>
        </div>
        </div>

        <div className="restaurant">
        <div className="image">
          <img src={MRT} className="mrt responsive-image" alt="" />
        </div>
        <div className="details">
            <h3>City Metro MRT</h3>
            <p>Efficient and convenient transportation for urban commuters.</p>
            <h4>Operating Hours</h4>
            <p>Monday - Sunday</p>
            <p>Weekdays: 6am - 11pm</p>
            <p>Weekends: 7am - 10pm</p>
            <h4>Holidays</h4>
            <p>Special schedules may apply on public holidays.</p>
            <h4>Contact</h4>
            <p>Customer Service: 123-456-7890</p>
            <h4>Website</h4>
            <p>www.citymetro.com</p>
        </div>
        </div>

    </div>
    </div>
  );
}