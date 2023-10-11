import React, { useState, useEffect } from "react"
//import Room from "./room";
import DeluxeRoom from "./image/deluxe.jpg"
import StandardRoom from "./image/standard.jpg"
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
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="brbody">
        <body>
            <div className="bookingRoom">
                <form onSubmit={handleSubmit}>
                <div>
                    <img src= {DeluxeRoom} className="roomImg"/>
                    <div className="text-box">
                        <h1>Deluxe Room</h1>
                        <p>Max Count : 2</p>
                        <p>Price : 12500 Bath</p>
                            <div className="brinput">
                                <input type = "text" placeholder = "min:1"
                                required
                                value={deluxe}
                                onChange={(e) => setDeluxe(e.target.value)}
                                />
                            </div>
                    </div>
                </div>
            </form>
            </div>
        </body>
        <button type = "submit" className = "btn">Login</button>
        </div>
    )
}