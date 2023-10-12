import React, { useState, useEffect } from "react"
//import Room from "./room";
import DeluxeRoom from "./image/deluxe.jpg"
import StandardRoom from "./image/standard.jpg"
import LuxuryRoom from "./image/luxury.jpg"
import "./bookingroom.css"

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
    const [deluxe, setDeluxe] = useState('');
    const [standard, setStandard] = useState('');
    const [luxury, setLuxury] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="brbody">
        <body>
            <div className="bookingRoom">
                <form onSubmit={handleSubmit}>
                <div>
                <img src= {StandardRoom} className="roomImg"/>
                    <div className="text-box">
                        <h2>Standard Room</h2>
                        <p>Max Count : 2</p>
                        <p>Price : 10,000 Bath</p>
                            <div className="brinput-std">
                                <input type = "text" placeholder = "min:0"
                                value={standard}
                                onChange={(e) => setStandard(e.target.value)}
                                />
                            </div>
                            <button type = "submit" className = "btn-std">Room Detail</button>
                    </div>
                </div>
                <div>
                    <img src= {DeluxeRoom} className="roomImg"/>
                    <div className="text-box">
                        <h2>Deluxe Room</h2>
                        <p>Max Count : 2</p>
                        <p>Price : 15,000 Bath</p>
                            <div className="brinput">
                                <input type = "text" placeholder = "min:1"
                                value={deluxe}
                                onChange={(e) => setDeluxe(e.target.value)}
                                />
                            </div>
                        <button type = "submit" className = "btn-deluxe">Room Detail</button>
                    </div>
                </div>
                <div>
                <img src= {LuxuryRoom} className="roomImg"/>
                    <div className="text-box">
                        <h2>Luxury Room</h2>
                        <p>Max Count : 3</p>
                        <p>Price : 20,000 Bath</p>
                            <div className="brinput-std">
                                <input type = "text" placeholder = "min:0"
                                value={standard}
                                onChange={(e) => setStandard(e.target.value)}
                                />
                            </div>
                            <button type = "submit" className = "btn-std">Room Detail</button>
                    </div>
                    <button type = "submit" className = "btn-booking">Booking</button>
                </div>
                </form>    
            </div>
        </body>
        </div>
    )
}