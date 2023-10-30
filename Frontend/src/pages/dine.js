import React from "react";
import './dine.css'
import Restaurant1 from "./image/res1.jpg"
import Restaurant2 from "./image/res2.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Dine() {
    return (
      <div className="dine-container">
        <h2>Dining Options</h2>
  
        <div className="restaurant">
          <h3>Hell's Kitchen</h3>
          <p>Nigga nae nae</p>
          <img src={Restaurant1} className="res1" alt="" />
        </div>
  
        <div className="restaurant">
          <h3>Let Him Cook</h3>
          <p>Trud trud </p>
          <img src={Restaurant2} className="res2" alt="" />
        </div>
  
      </div>
    );
}