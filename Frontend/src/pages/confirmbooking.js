import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./confirmbooking.css"

export default function Confirmbooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [addonLux, setAddonLux] = useState([]);
    const [addonDlx, setAddonDlx] = useState([]);
    const [addonStd, setAddonStd] = useState([]);
    const firstdate_Booking = location.state.firstdate_booking;
    const enddate_Booking = location.state.enddate_booking;
    const StdRoom_Detail = location.state.Bookingroom.standard;
    const DlxRoom_Detail = location.state.Bookingroom.deluxe;
    const LuxRoom_Detail = location.state.Bookingroom.luxury;
    const [addonlux_count, setAddonlux_count] = useState('0');
    const [addondlx_count, setAddondlx_count] = useState('0');
    const [addonstd_count, setAddonstd_count] = useState('0');

    function handleChange_Lux(event){
        const {value, checked} = event.target
        if(checked){
            setAddonLux(pre => [...pre, value])
            setAddonlux_count('1')
        }
        else{
            setAddonlux_count('0')
        }
    }
    
    function handleChange_Dlx(event){
        const {value, checked} = event.target
        if(checked){
            setAddonDlx(pre => [...pre, value])
            setAddondlx_count('1')
        }
        else{
            setAddondlx_count('0')
        }
    }

    function handleChange_Std(event){
        const {value, checked} = event.target
        if(checked){
            setAddonStd(pre => [...pre, value])
            setAddonstd_count('1')
        }
        else{
            setAddonstd_count('0')
        }
    }

    const handleSubmit_back = (e) => {
        e.preventDefault();
            navigate('/editbookingroom', {replace: true, state:{firstdate_Booking, enddate_Booking}});
    }
    const handleSubmit_payment = (e) => {
        e.preventDefault();
            navigate('/payment', {replace: true, state:{firstdate_Booking, enddate_Booking, StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail, addonLux, addonDlx, addonStd, addondlx_count, addonlux_count, addonstd_count}});
    }
    return (
        <div className="cbbody">
            <body>
                <div className="Cfbooking-style">
                    <h1> Confirm Booking</h1>
                    <p>Room Detail:</p>
                    <p>FirstDate Booking: {firstdate_Booking} </p>
                    <p>EndDate Booking: {enddate_Booking} </p>
                    <p>Standard Room : {StdRoom_Detail} rooms</p>
                    <p>Deluxe Room : {DlxRoom_Detail} rooms</p>
                    <p>Luxury Room : {LuxRoom_Detail} rooms</p>
                    { StdRoom_Detail > 0 &&
                        <div className="add-on">
                        <p>For Standard Room</p>
                    <div>
                    <input type = "checkbox"
                        value = 'Add On Bed. '
                        onChange={handleChange_Std}
                    /><span> Add One Bed. 500 Bath</span>
                    </div>
                    <div>
                    <input type = "checkbox"
                        value = 'Add Breakfast. '
                        onChange={handleChange_Std}
                    /><span> Add Breakfast. 100 Bath</span>
                    </div>
                    <div>
                    <input type = "checkbox"
                        value = 'Add Parking. '
                        onChange={handleChange_Std}
                    /><span> Add Parking</span>
                    </div>
                    <div>
                    <input type = "checkbox"
                        value = 'Add Spa. '
                        onChange={handleChange_Std}
                    /><span> Add Spa. 400Bath</span>
                    </div>
                    <input type = "checkbox"
                        value = 'Add Champagne. '
                        onChange={handleChange_Std}
                    /><span> Add Champagne. 1500 Bath</span>
                    </div>
                    }
                    { DlxRoom_Detail > 0 &&
                        <div className="add-on">
                        <p>For Deluxe Room</p>
                    <input type = "checkbox"
                        value=' Add One Bed. '
                        onChange={handleChange_Dlx}
                    /><span> Add One Bed 500 Bath</span>
                                        <div>
                    <input type = "checkbox"
                        value = 'Add Spa. '
                        onChange={handleChange_Dlx}
                    /><span> Add Spa. 400Bath</span>
                    </div>
                    <input type = "checkbox"
                        value = 'Add Champagne. '
                        onChange={handleChange_Dlx}
                    /><span> Add Champagne. 1500 Bath</span>
                    </div>
                    }
                    { LuxRoom_Detail > 0 &&
                        <div className="add-on">
                        <p>For Luxury Room</p>
                    <input type = "checkbox"
                        value= ' Add One Bed. '
                        onChange={handleChange_Lux}
                    /> Add One Bed 500 Bath
                    <div>
                    <input type = "checkbox"
                        value = 'Add Champagne. '
                        onChange={handleChange_Lux}
                    /><span> Add Champagne. 1500 Bath</span>
                    </div>
                    </div>
                    }
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