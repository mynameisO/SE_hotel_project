import React from "react";
import './dine.css'
import Restaurant3 from "./image/res3.jpg"
import Restaurant4 from "./image/res4.jpg"
export default function Dine() {
    return (
    <div className="dine-container">
      <h2>View All Dine</h2>

      <div className="restaurant-container">
        <div className="restaurant">
          <div className="image">
            <img src={Restaurant3} className="res3 responsive-image" alt="" />
          </div>
          <div className="details">
            <h3>Riverside Terrace</h3>
            <p>Traditional Thai Food.</p>
            <h4>Lunch</h4>
            <p>12-3:30pm (Tuesday - Sunday)</p>
            <h4>Dinner</h4>
            <p>6:30-11:30pm (Tuesday - Sunday)</p>
            <h4>Call</h4>
            <p>+66 (0) 2 659 9000</p>
            <h4>Email</h4>
            <p>se-hotel@gmail.com</p>
          </div>
      </div>
   
  
      <div className="restaurant">
        <div className="image">
          <img src={Restaurant4} className="res4 responsive-image" alt="" />
        </div>
        <div className="details">
          <h3>The Verandah</h3>
          <p>The perfect choice for all-day dining. </p>
          <h4>Breakfast A la carte</h4>
          <p>6-11am</p>
          <h4>Breakfast Buffet</h4>
          <p>7-10:30am (Monday-Friday)</p>
          <p>7-11am (Saturday-Sunday)</p>
          <h4>All Day Dining</h4>
          <p>10:30am-midnight</p>
          <h4>Call</h4>
          <p>+66 (0) 2 659 9000</p>
          <h4>Email</h4>
          <p>se-hotel@gmail.com</p>     
        </div>
        </div>
      </div>
    </div>
  );
}