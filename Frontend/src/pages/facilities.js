import React from "react";
import './facilities.css'

export default function Facilities() {
    return (
        <div>
            <div className="facilities-container">
            <div className="facilities">
                <h2>Our Facilities</h2>
                    <li>Swimming Pool</li>
                    <li>Fitness Center</li>
                    <li>Spa & Wellness Center</li>
                    <li>Meeting Rooms</li>
            </div>
            <div className="services">
                <h2>Our Services</h2>
                    <li>Room Service</li>
                    <li>Concierge Service</li>
                    <li>24/7 Front Desk</li>
                    <li>Laundry Service</li>
            </div>
            </div>
        </div>
    );
}