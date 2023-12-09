import React from "react";
import './payment.css'
//import card from './image/card.jpg';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Payment(){
    const MySwal = withReactContent(Swal);
    const [Guest_title, setTitle] = useState('Title');
    const [Guest_first_name, setFirstname] = useState('');
    const [Guest_last_name, setLastname] = useState('');
    const [Guest_email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [provice, setProvice] = useState('');
    const [Guest_telnum, setTelnum] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');
    const options = ['Mr', 'MS']
   /* const [cardholdername, setCardholdername] = useState('');
    const [cardnum, setCardnum] = useState('');
    const [expdate, setExpdate] = useState('');
    const [cvv, setCvv] = useState(''); */
    const [voucher, setVoucher]= useState('');
    const [addinfomation, setAddinformation] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const Checkin_date = location.state.firstdate;
    const Checkout_date = location.state.enddate;
    const StdRoom_Detail = location.state.StdRoom_Detail;
    const DlxRoom_Detail = location.state.DlxRoom_Detail;
    const LuxRoom_Detail = location.state.LuxRoom_Detail;
    /*const addonLux = 0;
    const addonDlx = 0;
    const addonStd = 0;
    const addondlx_count = 0;
    const addonlux_count = 0;
    const addonstd_count = 0; 
    .then((res)=>{
                MySwal.fire({
                    html : <i>Confirm Booking Success!</i>,
                    icon : 'success'
                }).then((value) =>{
                    navigate('/successfulbooking', {replace: true, state:{Guest_title,Guest_first_name, Guest_last_name, Checkin_date, Checkout_date, StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail, address, state, provice, country, zipcode, Guest_telnum, addinfomation, voucher}});
                })
    */

    const handleSubmit = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Checkin_date": Checkin_date,
            "Checkout_date": Checkout_date,
            "Guest_address": {
                "address": address,
                "country": country,
                "province": provice,
                "state": state,
                "zipcode": zipcode
            },
            "Guest_email": Guest_email,
            "Guest_first_name": Guest_first_name,
            "Guest_last_name": Guest_last_name,
            "Guest_telnum": Guest_telnum,
            "Guest_title": Guest_title,
            "Room": {
                "DlxRoom_Detail": DlxRoom_Detail,
                "LuxRoom_Detail": LuxRoom_Detail,
                "StdRoom_Detail": StdRoom_Detail
            },
            "addinfomation": addinfomation
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/createBooking`, requestOptions)
        .then(response => response.json())
        .then(result => 
            MySwal.fire({
            html : <i>{result.message}</i>,
            icon : 'success'
        }).then((value) =>{
            navigate('/successfulbooking', {replace: true, state:{Guest_title,Guest_first_name, Guest_last_name, Checkin_date, Checkout_date, StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail, address, state, provice, country, zipcode, Guest_telnum, addinfomation, voucher}});
        }))
        .catch(error => console.log('error', error));
    }
    return (
         <div className="container">

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col">

                        <h3 className="title"> 1. guest information</h3>
                        <p>Room Detail:</p>
                        <p>Checkin Date: {Checkin_date} </p>
                        <p>Checkout Date: {Checkout_date} </p>
                        {StdRoom_Detail > 0 && <p>Standard Room : {StdRoom_Detail} rooms</p>}
                        {DlxRoom_Detail > 0 && <p>Deluxe Room : {DlxRoom_Detail} rooms</p>}
                        {LuxRoom_Detail > 0 && <p>Luxury Room : {LuxRoom_Detail} rooms</p>}

                        <div className="inputBox">
                            <span>title :</span>
                            <div className="dropdown">
                                <div className="dropdown-btn" onClick={(e) =>
                                setIsActive(!isActive)}>
                                    {Guest_title}
                                    <span className="dropdown-span">v</span>
                                </div>
                                {isActive && (
                                    <div className="dropdown-content">
                                    { options.map((options) =>
                                        <div
                                        onClick={(e) => {
                                            setTitle(options);
                                            setIsActive(false);
                                        }}
                                        className="dropdown-item">
                                            {options}
                                    </div>
                                    )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="inputBox">
                            <span>first name :</span>
                            <input type="text" placeholder="FirstName"
                            required
                            value={Guest_first_name}
                            onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>last name :</span>
                            <input type="text" placeholder="LastName"
                            required
                            value={Guest_last_name}
                            onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>email :</span>
                            <input type="email" placeholder="example@example.com"
                            required
                            value={Guest_email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>street address :</span>
                            <input type="text" placeholder="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>state :</span>
                            <input type="text" placeholder="state"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>province :</span>
                            <input type="text" placeholder="Provice"
                            required
                            value={provice}
                            onChange={(e)=> setProvice(e.target.value)}
                            />
                        </div>
                        <div className="inputBox">
                            <span>telephone number :</span>
                            <input type="text" placeholder="000-000-0000"
                            required
                            value={Guest_telnum}
                            onChange={(e) => setTelnum(e.target.value)}
                            />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>country :</span>
                                <input type="text" placeholder="Thailand"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                        <div className="inputBox">
                            <span>zip code :</span>
                            <input type="text" placeholder="123 456"
                            required
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                                />
                        </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="inputBox">
                            <span>voucher Redeem :</span>
                            <input type="text" placeholder="Voucher"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className = "col">
                        <h3 className = "title">3. Additional information</h3>
                        <span>Is there anything else you'd like us to know about your stay?</span>
                        <div className = "comment-box">
                        <textarea rows="4" placeholder="Enter Details"
                        value={addinfomation}
                        onChange={(e) => setAddinformation(e.target.value)}
                        />
                        </div>
                    </div>
                    
                    <div className = "col">
                        <h3 className = "title">4. Terms and Conditions</h3>
                        <p>By clicking on the Check Out button, I acknowledge and agree that the above information is accurate and that my reservation will be subject to the Hotel Booking Terms and Policies. </p>
                        <label>
                            <input type = "checkbox"></input> Yes, I agree to the Data Privacy Terms.
                        </label>
                    </div>

                </div>

                <input type="submit" value="Check Out" className="submit-btn"/>

            </form>

        </div> 
    )
   
}

/*<h3 className="title">2. payment information</h3>

<div className="inputBox">
    <span>cards accepted :</span>
    <img src={card} alt=""/>
</div>
<div className="inputBox">
    <span>card holder name :</span>
    <input type="text" placeholder="Firstname Lastname"
    required
    value={cardholdername}
    onChange={(e) => setCardholdername(e.target.value)}
    />
</div>
<div className="inputBox">
    <span>card number :</span>
    <input type="number" placeholder="1111-2222-3333-4444"
    required
    value={cardnum}
    onChange={(e) => setCardnum(e.target.value)}
    />
</div>
<div className="inputBox">
    <span>exp date :</span>
    <input type="text" placeholder="January"
    required
    value={expdate}
    onChange={(e) => setExpdate(e.target.value)}
    />
</div>
<div className="flex">
    <div className="inputBox">
        <span>CVV :</span>
        <input type="text" placeholder="1234"
        required
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        />
    </div>
</div> 

{ addonlux_count > 0 &&
                <p>Luxury Room Add On : {addonLux} </p>
            }
            { addondlx_count > 0 &&
                <p>Deluxe Room Add On : {addonDlx} </p>
            }
            { addonstd_count > 0 &&
                <p>Standard Room Add On : {addonStd} </p>
            }
*/
