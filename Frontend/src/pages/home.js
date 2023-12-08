import React from "react";
import './home.css'

export default function Home() {
    return (
        <div className="homebody">    
            <div className="box">
                <div className="centered">
                    <h1>Welcome to SE Hotel</h1>
                    <p>Discover a world of luxury and comfort.</p>
                    <a href = "/location">
                        <button type = "submit" className = "btn">More Information </button>
                    </a>
                    <a href = "contact">
                        <button type = "submit" className = "btn">Contact Us</button>
                    </a>
                </div>
            </div>
            <div className="HomeBackground"/>
        </div>
    );
}