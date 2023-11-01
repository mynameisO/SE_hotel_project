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
    const addonLux = location.state.addonLux;
    const addonDlx = location.state.addonDlx;
    const addonStd = location.state.addonStd;
    const addondlx_count = location.state.addondlx_count;
    const addonlux_count = location.state.addonlux_count;
    const addonstd_count = location.state.addonstd_count;
    const AddInformation = location.state.addinfomation;
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
                    { addonlux_count > 0 &&
                        <p>Luxury Room Add On : {addonLux} </p>
                    }
                    { addondlx_count > 0 &&
                        <p>Deluxe Room Add On : {addonDlx} </p>
                    }
                    { addonstd_count > 0 &&
                        <p>Standard Room Add On : {addonStd} </p>
                    }
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