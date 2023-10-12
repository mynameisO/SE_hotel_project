import React from "react";
import './home.css'
import home1 from './image/home1.jpg';
import home2 from './image/home2.jpg';
import home3 from './image/home3.jpg';
import home4 from './image/home4.jpg';
import {useNavigate } from "react-router-dom"
export default function Home(){
    return (
        <body>
            <div class = "headContainer">
                <div class = "box">
                    <div class = "text">
                        <h1>Welcome to SE Hotel</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  
                        </p>
                        <button type = "submit" className = "btn">More Information</button>
                    </div>
                    <div class = "image">
                    </div>
                    <div class = "imageItem">
                        <img src= {home1} alt =""/>   
                        <img src= {home2}  alt="" />
                        <img src= {home3}  alt="" />
                        <img src= {home4}  alt=""/>
                    </div>
                </div> 
            </div>
        </body>
    )
}
