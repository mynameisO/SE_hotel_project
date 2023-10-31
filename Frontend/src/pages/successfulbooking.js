import { useNavigate, useLocation } from "react-router-dom";
import './successfulbooking.css'

export default function Successfulbooking() {

    const navigate = useNavigate();
    const location = useLocation();
    const Guest_Firstname = location.state.Guest_first_name;
    const Guest_Lastname = location.state.Guest_last_name;

    const handleSubmit = (e) => {
        e.preventDefault();
            navigate('/');
    }

    return (
    <div className="sbbody">
        <body>
        <h1>Your payment was successful</h1>
        <h1>{Guest_Firstname} {Guest_Lastname}</h1>
        <h2>Thank you for your payment. </h2>
        <p>If you have any questions or inquiries, please feel free to reach out to us</p>
        <form onSubmit={handleSubmit}>

        <div className="sbbutton">
            <button type="submit" className="sbhome">
                Home
              </button>
            </div>
        </form>
        </body>
    </div>
    )
}