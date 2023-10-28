import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./confirmbooking.css"

export default function Confirmbooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [addbed, setAddbed] = useState(true);
    const firstdate_Booking = location.state.firstdate_booking;
    const enddate_Booking = location.state.enddate_booking;
    const StdRoom_Detail = location.state.Bookingroom.standard;
    const DlxRoom_Detail = location.state.Bookingroom.deluxe;
    const LuxRoom_Detail = location.state.Bookingroom.luxury;
    
    const handleChange = (data) => {
        if(data == "Add One Bed"){
            if(addbed == true){
                console.log(data,"true")
            }
            setAddbed(!addbed)
        }

    }

    const handleSubmit_back = (e) => {
        e.preventDefault();
            navigate('/editbookingroom', {replace: true, state:{firstdate_Booking, enddate_Booking}});
    }
    const handleSubmit_payment = (e) => {
        e.preventDefault();
            navigate('/payment', {replace: true, state:{firstdate_Booking, enddate_Booking, StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail}});
    }
    return (
        <div>
            <h3 className="title"> Confirm Booking</h3>
            <p>Room Detail:</p>
            <p>FirstDate Booking: {firstdate_Booking} </p>
            <p>EndDate Booking: {enddate_Booking} </p>
            <p>Standard Room : {StdRoom_Detail} rooms</p>
            <p>Deluxe Room : {DlxRoom_Detail} rooms</p>
            <p>Luxury Room : {LuxRoom_Detail} rooms</p>
            { StdRoom_Detail > 0 &&
                <div className="add-on">
                <p>For Standard Room</p>
            <input type = "checkbox"/><span>Add One Bed 500 Bath</span>
            </div>
            }
            { DlxRoom_Detail > 0 &&
                <div className="add-on">
                <p>For Deluxe Room</p>
            <input type = "checkbox"/><span>Add One Bed 500 Bath</span>
            </div>
            }
            { LuxRoom_Detail > 0 &&
                <div className="add-on">
                <p>For Luxury Room</p>
            <input type = "checkbox"
                value={addbed}
                onChange={() => handleChange("Add One Bed")}
            /><span>Add One Bed 500 Bath</span>
            </div>
            }
            <form onSubmit={handleSubmit_back}>
                <button type="submit">Back</button>
            </form>
            <form onSubmit={handleSubmit_payment}>
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}