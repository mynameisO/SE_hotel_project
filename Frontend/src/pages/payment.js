import React from "react";
import './payment.css'
import card from './image/card.jpg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Payment(){
    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [provice, setProvice] = useState('');
    const [telnum, setTelnum] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [cardholdername, setCardholdername] = useState('');
    const [cardnum, setCardnum] = useState('');
    const [expdate, setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [addinfomation, setAddinformation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const Payment = {title, firstname, lastname, email, address, state, provice, telnum, 
            country, zipcode, cardholdername, cardnum, expdate, cvv, addinfomation}
            console.log(Payment)
            fetch(`http://${process.env.REACT_APP_BACKEND_IP}/payment`,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify(Payment)
            }).then((res)=>{
                navigate('/');
            })
    }
    return (
        <body>
            <div class="container">

<form onSubmit={handleSubmit}>

    <div class="row">

        <div class="col">

            <h3 class="title"> 1. guest information</h3>

            <div class="inputBox">
                <span>title :</span>
                <input type="text" placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>first name :</span>
                <input type="text" placeholder="FirstName"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>last name :</span>
                <input type="text" placeholder="LastName"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>street address :</span>
                <input type="text" placeholder="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>state :</span>
                <input type="text" placeholder="state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>province :</span>
                <input type="text" placeholder="Provice"
                required
                value={provice}
                onChange={(e)=> setProvice(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>telephone number :</span>
                <input type="text" placeholder="000-000-0000"
                required
                value={telnum}
                onChange={(e) => setTelnum(e.target.value)}
                />
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>country :</span>
                    <input type="text" placeholder="Thailand"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div class="inputBox">
                    <span>zip code :</span>
                    <input type="text" placeholder="123 456"
                    required
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    />
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
                <input type="text" placeholder="Firstname Lastname"
                required
                value={cardholdername}
                onChange={(e) => setCardholdername(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444"
                required
                value={cardnum}
                onChange={(e) => setCardnum(e.target.value)}
                />
            </div>
            <div class="inputBox">
                <span>exp date :</span>
                <input type="text" placeholder="January"
                required
                value={expdate}
                onChange={(e) => setExpdate(e.target.value)}
                />
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
            </div>

        </div>

        <div class = "col">
            <h3 class = "title">3. Additional information</h3>
            <span>Is there anything else you'd like us to know about your stay?</span>
            <div class = "comment-box">
            <textarea rows="4" placeholder="Enter Details"
            value={addinfomation}
            onChange={(e) => setAddinformation(e.target.value)}
            />
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
