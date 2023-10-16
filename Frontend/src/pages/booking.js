import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css"

export default function Booking() {
    const [firstdate, setFirstDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const navigate = useNavigate();
    const isProcess = 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateBooking = {firstdate, enddate, isProcess};
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/booking`,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(dateBooking)
        }).then((res)=>{
            navigate('/bookingroom', {replace: true, state:{dateBooking}});
        })
    }
    return (
        <bodylhh>
            <div className="booking">
                <form onSubmit={handleSubmit}>
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
                <button type="submit">Booking</button>
                </form>
            </div>
       </bodylhh>
    )
}