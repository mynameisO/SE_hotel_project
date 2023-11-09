import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./confirmbooking.css"

export default function Confirmbooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const firstdate_Booking = location.state.firstdate_booking;
    const enddate_Booking = location.state.enddate_booking;
    const StdRoom_Detail = location.state.Bookingroom.standard;
    const DlxRoom_Detail = location.state.Bookingroom.deluxe;
    const LuxRoom_Detail = location.state.Bookingroom.luxury;

    const handleSubmit_back = (e) => {
        e.preventDefault();
            navigate('/editbookingroom', {replace: true, state:{firstdate_Booking, enddate_Booking}});
    }
    const handleSubmit_payment = (e) => {
        e.preventDefault();
            navigate('/payment', {replace: true, state:{firstdate_Booking, enddate_Booking, StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail}});
    }
    return (
        <div className="cbbody">
            <body>
                <div className="Cfbooking-style">
                    <h1> Confirm Booking</h1>
                    <p>Room Detail:</p>
                    <p>FirstDate Booking: {firstdate_Booking} </p>
                    <p>EndDate Booking: {enddate_Booking} </p>
                    { StdRoom_Detail > 0 && <p>Standard Room : {StdRoom_Detail} rooms</p> }
                    { DlxRoom_Detail > 0 && <p>Deluxe Room : {DlxRoom_Detail} rooms</p> }
                    { LuxRoom_Detail > 0 && <p>Luxury Room : {LuxRoom_Detail} rooms</p> }
                    <form onSubmit={handleSubmit_back}>
                        <button type="submit" className="btn-back">Back</button>
                    </form>
                    <form onSubmit={handleSubmit_payment}>
                        <button type="submit" className="btn-confirm">Confirm</button>
                    </form>
                </div>
            </body>
        </div>
    )
}