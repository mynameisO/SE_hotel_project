import React from "react"
import { useNavigate } from "react-router-dom"
import './room.css'
import Deluxe from './image/deluxe.jpg'
import window_icon from './image/windows.png'
import bath_icon from './image/bathtub.png'
import dining_icon from './image/chair.png'
import wardrobe_icon from './image/wardrobe.png'
import Luxury from './image/luxury.jpg'
import elavator_icon from './image/elevator.png'
import gym_icon from './image/gym.png'
import workstation_icon from './image/workstation.png'
import marblebath_icon from './image/marblebath.png'
import standard from './image/standard.jpg'
import toilet_icon from './image/marblebath.png'

export default function Room() {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
       navigate('/booking');
    }

    return (
        <div className="room-container">
            <div className="stdroom">
              <img src={standard} className="std-pic" alt=""/>
              <h3>Standard Room</h3>
              <p>Large room with a sofa and seating area to relax in. There are wood floors and carpets inspired by nature. and decorated to create a Thai atmosphere It provides a unique experience 
                in a resort-style atmosphere with river and city views.</p>
              <h4>Highlight :</h4>
              <img src={window_icon} className="Icon" alt=""/>
                <p className="window">Floor-to-ceiling windows</p>
                <img src={bath_icon} className="Icon" alt=""/>
                <p className="bath">Bathtub and rain shower</p>
                <img src={toilet_icon} className="Icon"alt=""/>
                <p className="toilet">Japanese style toilet</p>
                <form onSubmit={handleSubmit}>
                <button type = "submit" className = "btn-booking">Booking</button>
                </form>
            </div>
            <div className="room">
                <img src={Deluxe} alt=""/>
                <h3>Deluxe Room</h3>
                <p>Large room with a sofa and seating area to relax in. There are wood floors and carpets inspired by nature. 
                  and decorated to create a Thai atmosphere It provides a unique experience in a resort-style atmosphere with river and city views.</p>
                <h4>Highlight :</h4>
                <img src={window_icon} className="Icon" alt=""/>
                <p className="window">Floor-to-ceiling windows</p>
                <img src={bath_icon} className="Icon" alt=""/>
                <p className="bath">Bathtub and rain shower</p>
                <img src={dining_icon} className="Icon" alt=""/>
                <p className="dining">Dining Room</p>
                <img src={wardrobe_icon} className="Icon" alt=""/>
                <p className="closet">Walk-in Wardrobe</p>
                <form onSubmit={handleSubmit}>
                <button type = "submit" className = "btn-booking">Booking</button>
                </form>
            </div>
            <div className="luxroom">
              <img src={Luxury} className="luxury-pic" alt=""/>
              <h3>Luxury Room</h3>
              <p> 
                This room was designed with royal guests visiting Thailand in mind. There is a private entrance, meeting rooms, fitness center and spa room. There is also the option of additional bedrooms to accommodate 
                dependents. family member or for security purposes
              </p>
              <h4>Highlight :</h4>
                <img src={bath_icon} className="Icon" alt=""/>
                <p className="bath">Bathtub and rain shower</p>
                <img src={dining_icon} className="Icon" alt=""/>
                <p className="dining">Dining Room</p>
                <img src={wardrobe_icon} className="Icon" alt=""/>
                <p className="closet">Walk-in Wardrobe</p>
                <img src={elavator_icon} className="Icon" alt=""/>
                <p className="elavator">Enter and exit the room using the private elevator.</p>
                <img src={gym_icon} className="Icon" alt=""/>
                <p className="gym">Private gym</p>
                <img src={workstation_icon} className="Icon" alt=""/>
                <p className="workstation">Workstation Room</p>
                <img src={marblebath_icon} className="Icon" alt=""/>
                <p className="marblebath">Marble-lined bathroom</p>
                <form onSubmit={handleSubmit}>
                <button type = "submit" className = "btn-booking">Booking</button>
                </form>
            </div>
        </div>
    )
}