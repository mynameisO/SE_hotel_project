import React, { useEffect, useState } from "react"
//import Room from "./room";
import DeluxeRoom from "./image/deluxe.jpg"
import StandardRoom from "./image/standard.jpg"
import LuxuryRoom from "./image/luxury.jpg"
import "./bookingroom.css"
import { useNavigate } from "react-router-dom"

export default function Bookingroom() {

/*    const [data,setData] = useState([]);
    const [loading, setLoading] =useState();
    const getData = ()=>{
        fetch('http://localhost:3050/roombooking',{headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }}).then((res)=>{
            return res.json()
        }).then((myjson)=>{
            //console.log(data) 
            setData(myjson)
        })
    }
    useEffect(() => {
        setLoading(true)
        getData()
        setLoading(false)
    }, []) */



    const [deluxe, setDeluxe] = useState(0);
    const [standard, setStandard] = useState(0);
    const [luxury, setLuxury] = useState(0);
    const navigate = useNavigate();


    const handleDecrement = (roomType) => {
        switch (roomType) {
          case 'standard':
            setStandard(standard > 0 ? standard - 1 : standard);
            break;
          case 'deluxe':
            setDeluxe(deluxe > 0 ? deluxe - 1 : deluxe);
            break;
          case 'luxury':
            setLuxury(luxury > 0 ? luxury - 1 : luxury);
            break;
          default:
            break;
        }
      };

    const handleIncrement = (roomType) => {
        switch (roomType) {
          case 'standard':
            setStandard(standard + 1);
            break;
          case 'deluxe':
            setDeluxe(deluxe + 1);
            break;
          case 'luxury':
            setLuxury(luxury + 1);
            break;
          default:
            break;
        }
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        const Bookingroom = {deluxe, standard, luxury};
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/bookingdetail`,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(Bookingroom)
        }).then((res)=>{
            navigate('/payment');
        })
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
      <body>
        <div className="bookingRoom">
          <form onSubmit={handleSubmit_std}>
            <div>
              <img src={StandardRoom} className="roomImg" alt="" />
              <div className="text-box">
                <h2>Standard Room</h2>
                <p>Max Count : 2</p>
                <p>Price : 10,000 Bath</p>
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
                <p>Max Count : 2</p>
                <p>Price : 15,000 Bath</p>
                <div className="brinput">
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
                <p>Max Count : 3</p>
                <p>Price : 20,000 Bath</p>
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
      </body>
    </div>
  );
}