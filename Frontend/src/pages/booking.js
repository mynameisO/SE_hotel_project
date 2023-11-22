import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Booking() {
    const [firstdate, setFirstDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const navigate = useNavigate();
    const isProcess = 0;
    const MySwal = withReactContent(Swal);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/room/room_available?checkin_date=${firstdate}&checkout_date=${enddate}`)
        .then(response => response.json())
          .then(result => {
            if(result.error){
                MySwal.fire({
                    html : <i>{result.error}</i>,
                    icon : 'error'
                }).then((value) => {
                    navigate('/booking')
                })
            }else {
                const dateBooking = {firstdate, enddate, isProcess};
                navigate('/bookingroom', {replace: true, state:{dateBooking}});
            }
          })
          .catch(error => console.log('error', error));
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