import { useNavigate, useLocation } from "react-router-dom";

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
    <div>
        <h1>Thank You For Booking. Name : {Guest_Firstname} {Guest_Lastname} </h1>
        <form onSubmit={handleSubmit}>
              <button type="submit" className="">
                Home
              </button>
        </form>
    </div>
    )
}