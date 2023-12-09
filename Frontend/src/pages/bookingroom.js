import React, { useState } from "react"
//import Room from "./room";
import DeluxeRoom from "./image/deluxe.jpg"
import StandardRoom from "./image/standard.jpg"
import LuxuryRoom from "./image/luxury.jpg"
import "./bookingroom.css"
import { useNavigate, useLocation } from "react-router-dom"

export default function Bookingroom() {

    const [deluxe, setDeluxe] = useState(0);
    const [standard, setStandard] = useState(0);
    const [luxury, setLuxury] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const firstdate_booking = location.state.dateBooking.firstdate;
    const enddate_booking = location.state.dateBooking.enddate;
    const [num_room_1, setNumroom1] = useState(0);
    const [num_room_2, setNumroom2] = useState(0);
    const [num_room_3, setNumroom3] = useState(0);
    const [price_room_1, setPrice1] = useState(3000);
    const [price_room_2, setPrice2] = useState(5500);
    const [price_room_3, setPrice3] = useState(8000);
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/room/room_available?checkin_date=${firstdate_booking}&checkout_date=${enddate_booking}`)
    .then(res => {return res.json()})
    .then(data => { 
      if(data[0]){
        switch(data[0]["room_type_id"]){
          case 1:
            setNumroom1(data[0]["Number of room"]);
            setPrice1(data[0]["price"])
            break;
          case 2:
            setNumroom2(data[0]["Number of room"]);
            setPrice2(data[0]["price"])
            break;
          case 3:
            setNumroom3(data[0]["Number of room"]);
            setPrice3(data[0]["price"])
            break;
          default:
            break;
        }
      }
      if(data[1]){
        switch(data[1]["room_type_id"]){
          case 1:
            setNumroom1(data[1]["Number of room"]);
            setPrice1(data[1]["price"])
            break;
          case 2:
            setNumroom2(data[1]["Number of room"]);
            setPrice2(data[1]["price"])
            break;
          case 3:
            setNumroom3(data[1]["Number of room"]);
            setPrice3(data[1]["price"])
            break;
          default:
            break;
        }
      }
      if(data[2]){
        switch(data[2]["room_type_id"]){
          case 1:
            setNumroom1(data[2]["Number of room"]);
            setPrice1(data[2]["price"])
            break;
          case 2:
            setNumroom2(data[2]["Number of room"]);
            setPrice2(data[2]["price"])
            break;
          case 3:
            setNumroom3(data[2]["Number of room"]);
            setPrice3(data[2]["price"])
            break;
          default:
            break;
        }
      }
    });
    const handleDecrement = (roomType) => {
        switch (roomType) {
          case 'standard':
            setStandard((standard > 0) ? standard - 1 : standard);
            break;
          case 'deluxe':
            setDeluxe((deluxe > 0) ? deluxe - 1 : deluxe);
            break;
          case 'luxury':
            setLuxury((luxury > 0) ? luxury - 1 : luxury);
            break;
          default:
            break;
        }
      };

    const handleIncrement = (roomType) => {
        switch (roomType) {
          case 'standard':
            setStandard((standard < num_room_1) ? standard + 1 : standard);
            break;
          case 'deluxe':
            setDeluxe((deluxe < num_room_2) ? deluxe + 1 : deluxe);
            break;
          case 'luxury':
            setLuxury((luxury < num_room_3) ? luxury + 1 : luxury);
            break;
          default:
            break;
        }
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        const Bookingroom = {deluxe, standard, luxury};
            navigate('/confirmbooking', {replace: true, state:{Bookingroom, firstdate_booking, enddate_booking}});
    }
    const handleSubmit_std = (e) => {
        e.preventDefault();
        navigate('/room');
    }
    const handleSubmit_delux = (e) => {
        e.preventDefault();
        navigate('/room');
    }
    const handleSubmit_lux = (e) => {
        e.preventDefault();
        navigate('/room');
    } 
      return (
    <div className="brbody">
        <div className="bookingRoom">
          <form onSubmit={handleSubmit_std}>
            <div>
              <img src={StandardRoom} className="roomImg" alt="" />
              <div className="text-box">
                <h2>Standard Room</h2>
                <p>Max Count : {num_room_1}</p>
                <p>Price : {price_room_1} Bath</p>
                <div className="brinput-std">
                  <button type="button" onClick={() => handleDecrement('standard')} className="brinput-std">
                    -
                  </button>
                  <input
                    type="text"
                    placeholder="min:0"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                  />
                  <button type="button" onClick={() => handleIncrement('standard')} className="brinput-std">
                    +
                  </button>
                </div>
                <button type="submit" className="btn-std">
                  Room Detail
                </button>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit_delux}>
            <div>
              <img src={DeluxeRoom} className="roomImg" alt="" />
              <div className="text-box">
                <h2>Deluxe Room</h2>
                <p>Max Count : {num_room_2}</p>
                <p>Price : {price_room_2} Bath</p>
                <div className="brinput-std">
                  <button type="button" onClick={() => handleDecrement('deluxe')} className="brinput-std">
                    -
                  </button>
                  <input
                    type="text"
                    placeholder="min:1"
                    value={deluxe}
                    onChange={(e) => setDeluxe(e.target.value)}
                  />
                  <button type="button" onClick={() => handleIncrement('deluxe')} className="brinput-std">
                    +
                  </button>
                </div>
                <button type="submit" className="btn-deluxe">
                  Room Detail
                </button>
              </div>
            </div>
          </form>
          <div>
            <form onSubmit={handleSubmit_lux}>
              <img src={LuxuryRoom} className="roomImg" alt="" />
              <div className="text-box">
                <h2>Luxury Room</h2>
                <p>Max Count : {num_room_3}</p>
                <p>Price : {price_room_3} Bath</p>
                <div className="brinput-std">
                  <button type="button" onClick={() => handleDecrement('luxury')} className="brinput-std">
                    -
                  </button>
                  <input
                    type="text"
                    placeholder="min:0"
                    value={luxury}
                    onChange={(e) => setLuxury(e.target.value)}
                  />
                  <button type="button" onClick={() => handleIncrement('luxury')} className="brinput-std">
                    +
                  </button>
                </div>
                <button type="submit" className="btn-std">
                  Room Detail
                </button>
              </div>
            </form>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn-booking">
                Booking
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}