import React from "react";
import './dine.css'
import Restaurant3 from "./image/res3.jpg"
import Restaurant4 from "./image/res4.jpg"
export default function Dine() {
    return (
      <div className="dine-container">
      <h2>Dining Options</h2>

      <div className="restaurant">
        <h3>Hell's Kitchen</h3>
        <p>Nigga nae nae</p>
        <img src={Restaurant3} className="res3 responsive-image" alt="" />
      </div>
  
      <div className="restaurant">
        <h3>Let Him Cook</h3>
        <p>Trud trud </p>
        <img src={Restaurant4} className="res4 responsive-image" alt="" />
      </div>
  
      </div>
    );
}