import React from "react";
import './payment.css'
import card from './card.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Payment(){
/*    const [username,    setUsername] = useState('');
    const [firstname,   setFirstname] = useState('');
    const [lastname,    setLastname] = useState('');
    const [address, setAdress] = useState('');
    const [city,    setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email,   setEmail]  = useState('');
    const [phonenum, setPhonenum]  = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const Login = {username, password};
        console.log(Login)
    }
*/
    return (
        <body>
            <div class="container">

<form action="">

    <div class="row">

        <div class="col">

            <h3 class="title"> 1. guest information</h3>

            <div class="inputBox">
                <span>title :</span>
                <input type="text" placeholder=""/>
            </div>
            <div class="inputBox">
                <span>first name :</span>
                <input type="text" placeholder="Omar Yusoh"/>
            </div>
            <div class="inputBox">
                <span>last name :</span>
                <input type="text" placeholder="Omar Yusoh"/>
            </div>
            <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com"/>
            </div>
            <div class="inputBox">
                <span>street address :</span>
                <input type="text" placeholder="address"/>
            </div>
            <div class="inputBox">
                <span>state :</span>
                <input type="text" placeholder="state"/>
            </div>
            <div class="inputBox">
                <span>province :</span>
                <input type="text" placeholder="Bangkok"/>
            </div>
            <div class="inputBox">
                <span>telephone number :</span>
                <input type="text" placeholder="000-000-0000"/>
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>country :</span>
                    <input type="text" placeholder="Thailand"/>
                </div>
                <div class="inputBox">
                    <span>zip code :</span>
                    <input type="text" placeholder="123 456"/>
                </div>
            </div>

        </div>

        <div class="col">

            <h3 class="title">2. payment information</h3>

            <div class="inputBox">
                <span>cards accepted :</span>
                <img src={card} alt=""/>
            </div>
            <div class="inputBox">
                <span>card holder name :</span>
                <input type="text" placeholder="Mr.Omar Yusoh"/>
            </div>
            <div class="inputBox">
                <span>card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444"/>
            </div>
            <div class="inputBox">
                <span>exp date :</span>
                <input type="text" placeholder="January"/>
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234"/>
                </div>
            </div>

        </div>

        <div class = "col">
            <h3 class = "title">3. Additional information</h3>
            <span>Is there anything else you'd like us to know about your stay?</span>
            <div class = "comment-box">
            <textarea rows="4" placeholder="Enter Details"></textarea>
            </div>
        </div>
        
        <div class = "col">
            <h3 class = "title">4. Terms and Conditions</h3>
            <p>By clicking on the Check Out button, I acknowledge and agree that the above information is accurate and that my reservation will be subject to the Hotel Booking Terms and Policies. </p>
            <label>
                <input type = "checkbox"></input> Yes, I agree to the MOHG Data Privacy Terms.
            </label>
        </div>

    </div>

    <input type="submit" value="Check Out" class="submit-btn"/>

</form>

    </div> 
        </body>
    )
   
}
