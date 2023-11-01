import React,  { useState, useEffect } from "react";
import './home.css'
import home1 from './image/home1.jpg';
import {useNavigate} from "react-router-dom"

export default function Home() {
    return (
        <div className="homebody">    
            <div className="box">
                <div className="imageItem">
                    <img src={home1} alt="Hotel" />
                </div>
                <div className="centered">
                    <h1>Welcome to SE Hotel</h1>
                    <p>Discover a world of luxury and comfort.</p>
                    <button type = "submit" className = "btn">More Information</button>
                </div>
            </div>
        </div>
    );
}
