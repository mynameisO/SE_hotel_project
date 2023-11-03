import { useLocation } from "react-router-dom";
import './seedetail.css';

export default function Seedetail(){
    const location = useLocation();
    const Firstname = location.state.Firstname;
    const Lastname = location.state.Lastname;
    const Checkin_date = location.state.Checkin_date;
    const Checkout_date = location.state.Checkout_date;
    const StdRoom_Detail = location.state.StdRoom_Detail;
    const DlxRoom_Detail = location.state.DlxRoom_Detail;
    const LuxRoom_Detail = location.state.LuxRoom_Detail;
    const AddInformation = location.state.AddInfomation;
    const Voucher = location.state.Voucher;
    const title = location.state.title;
    const Telnumber = location.state.Telnumber;
    const Address = location.state.Address;
    const State = location.state.State;
    const Provice = location.state.Provice;
    const Country = location.state.Country;
    const Zipcode = location.state.Zipcode;


    return(
        <div className="sdbody">
            <body>
                <div className="sd-style">
                    <h1>See Detail</h1>
                    <p>Title : {title}</p>
                    <p>Name : {Firstname} {Lastname}</p>
                    <p>Tell Number : {Telnumber}</p>
                    <p>CheckIn Date : {Checkin_date}</p>
                    <p>CheckOut Date : {Checkout_date}</p>
                    <p>Standard Room : {StdRoom_Detail} rooms</p>
                    <p>Deluxe Room : {DlxRoom_Detail} rooms</p>
                    <p>Luxury Room : {LuxRoom_Detail} rooms</p>
                    <p>Address : {Address}</p>
                    <p>State : {State}      Province : {Provice}</p>
                    <p>Country : {Country}  Zipcode : {Zipcode}</p>
                    <p>Voucher : {Voucher}</p>
                    <p>Add Information : {AddInformation}</p>
                </div>
            </body>
        </div>
    )
}

/*
{
  "Checkin_date": "2023-10-04",
  "Checkout_date": "2023-10-06",
  "Room": {
    "StdRoom_Detail": 0,
    "DlxRoom_Detail": 0,
    "LuxRoom_Detail": 1
  },
  "Guest_title": "Mr",
  "Guest_first_name": "Dummy",
  "Guest_last_name": "Dummy_last",
  "Guest_email": "dummy@mail.com",
  "Guest_address": {
    "address": "dummy address",
    "state": "dummy_state",
    "province": "dummy_province",
    "country": "Thailand",
    "zipcode": "24110"
  },
  "Guest_telnum": "0000000000",
  "addinfomation": "I want the room that is clean",*/