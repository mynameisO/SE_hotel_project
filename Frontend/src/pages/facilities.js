import React from "react";
import './dine.css'
import Swimming from "./image/swim.png"
import Fitness from "./image/fitness.png"
import Spa from "./image/spa.png"
import Meeting from "./image/meeting.png"

export default function Dine() {
    return (
    <div className="dine-container">
      <h2>Our facilities & Services</h2>

      <div className="restaurant-container">
        <div className="restaurant">
          <div className="image">
            <img src={Swimming} className="swim responsive-image" alt="" />
          </div>
          <div className="details">
            <h3>Swimming Pool</h3>
            <p>Enjoy a refreshing dip in our pool.</p>
            <h4>Opening Hours</h4>
            <p>Monday - Sunday</p>
            <p>8am - 8pm</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 659 9000</p>
            <h4>Email</h4>
            <p>se-hotel@gmail.com</p>
          </div>
      </div>
   
  
      <div className="restaurant">
        <div className="image">
          <img src={Fitness} className="fitness responsive-image" alt="" />
        </div>
        <div className="details">
            <h3>Fitness Center</h3>
            <p>Stay fit with our state-of-the-art fitness facilities.</p>
            <h4>Opening Hours</h4>
            <p>Monday - Sunday</p>
            <p>6am - 10pm</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 659 9000</p>
            <h4>Email</h4>
            <p>se-hotel@gmail.com</p> 
        </div>
        </div>

        <div className="restaurant">
        <div className="image">
          <img src={Spa} className="spa responsive-image" alt="" />
        </div>
        <div className="details">
            <h3>Spa & Wellness Center</h3>
            <p>Indulge in relaxation and rejuvenation at our spa.</p>
            <h4>Opening Hours</h4>
            <p>Tuesday - Sunday</p>
            <p>10am - 8pm</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 659 9000</p>
            <h4>Email</h4>
            <p>se-hotel@gmail.com</p>
        </div>
        </div>

        <div className="restaurant">
        <div className="image">
          <img src={Meeting} className="meeting responsive-image" alt="" />
        </div>
        <div className="details">
            <h3>Meeting Rooms</h3>
            <p>Host your events and meetings in our versatile meeting spaces.</p>
            <h4>Availability</h4>
            <p>By reservation</p>
            <h4>Contact</h4>
            <p>+66 (0) 2 659 9000</p>
            <h4>Email</h4>
            <p>se-hotel@gmail.com</p>
        </div>
        </div>

    </div>
    </div>
  );
}