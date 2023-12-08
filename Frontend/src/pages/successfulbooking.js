import { useNavigate, useLocation } from "react-router-dom";
import './successfulbooking.css'

export default function Successfulbooking() {

    const navigate = useNavigate();
    const location = useLocation();
    const Guest_Firstname = location.state.Guest_first_name;
    const Guest_Lastname = location.state.Guest_last_name;
    const Checkin_date = location.state.Checkin_date;
    const Checkout_date = location.state.Checkout_date;
    const StdRoom_Detail = location.state.StdRoom_Detail;
    const DlxRoom_Detail = location.state.DlxRoom_Detail;
    const LuxRoom_Detail = location.state.LuxRoom_Detail;
    const AddInformation = location.state.addinfomation;
    const Voucher = location.state.voucher;
    const title = location.state.Guest_title;
    const Firstname = location.state.Guest_first_name;
    const Lastname = location.state.Guest_last_name;
    const Telnumber = location.state.Guest_telnum;
    const Address = location.state.address;
    const State = location.state.state;
    const Provice = location.state.provice;
    const Country = location.state.country;
    const Zipcode = location.state.zipcode;

    const handleSubmit = (e) => {
        e.preventDefault();
            navigate('/');
    }
    const handleSubmit_detail = (e) => {
        e.preventDefault();
            navigate('/seedetail' ,{replace: true, state:{title,Firstname, Lastname, Checkin_date, Checkout_date, 
                StdRoom_Detail, DlxRoom_Detail, LuxRoom_Detail, Address, State, Provice, Country, Zipcode, Telnumber, AddInformation, Voucher}})
    }

    return (
        <div className="sbbody">
            <div className="sbhome">
                <h1>Your payment was successful</h1>
                <h1>{Guest_Firstname} {Guest_Lastname}</h1>
                <h2>Thank you for your payment. </h2>
                <p>If you have any questions or inquiries, please feel free to reach out to us</p>
                <form onSubmit={handleSubmit}>

                    <div className="sbbutton">
                        <button type="submit" className="sbdetail">
                            Home
                        </button>
                    </div>
                </form>
                <form onSubmit={handleSubmit_detail}>
                    <div className="sbbutton">
                        <button type="submit" className="sbdetail">
                            See Detail
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}