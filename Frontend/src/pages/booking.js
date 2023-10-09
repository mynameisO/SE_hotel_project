import React, { useState } from "react";
import "./booking.css"

export default function Booking() {
    const [firstdate, setFirstDate] = useState('');
    const [enddate, setEndDate] = useState('');
    console.log(firstdate);
    return (
       <div className="booking">
        <h1>Booking</h1>
        <p>First Date</p>
       <div className="dateborder">
        <input type="date" 
        required
        value={firstdate} onChange={(e) => setFirstDate(e.target.value)}/>
       </div>
       <p>End Date</p>
       <div className="dateborder">
        <input type="date"
        required 
        value={enddate} onChange={(e) => setEndDate(e.target.value)}/>
       </div>
       </div>
    )
}