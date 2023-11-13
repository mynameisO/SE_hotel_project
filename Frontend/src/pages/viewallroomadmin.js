import { React} from "react"
import { useNavigate,} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './viewallroomadmin.css'

export default function viewallroomadmin() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [admin, setAdmin] = useState([]);
    const [status, setStatus] = useState('none');
    const [bookings, setBookings] = useState([]);
    const [guestTelnum,setGuestTelnum] = useState('');
    const [guestName, setGuestName] = useState('');
 

useEffect(() => {
    fetch("http://omar-server.trueddns.com:52302/api/admin/viewAllBooking", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setBookings(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return(
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Name</th>
            <th>Guest Telephone Number</th>
            <th>Booking Detail</th>
            <th>Booking Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {search === false &&
            bookings.map((item) => (
              <tr key={item.id}>
                <td>{item.booking_id}</td>
                <td>{item.guest_name}</td>
                <td>{item.guest_telnum}</td>
                <td>{item.booking_detail}</td>
                <td>{item.booking_status}</td>
                {item.booking_status === "checked_in" && (
                  <td>
                    <button onClick={() => check_out(item.booking_id)}>Check Out</button>
                  </td>
                )}
                {item.booking_status === "checked_out" && (
                  <td>
                    <button onClick={() => check_in(item.booking_id)}>Check In</button>
                  </td>
                )}
              </tr>
            ))}
          {search === true &&
            searchBooking.map((item) => (
              <tr key={item.id}>
                <td>{item.booking_id}</td>
                <td>{item.guest_name}</td>
                <td>{item.guest_telnum}</td>
                <td>{item.booking_detail}</td>
                <td>{item.booking_status}</td>
                {item.booking_status === "checked_in" && (
                  <td>
                    <button onClick={() => check_out(item.booking_id)}>Check Out</button>
                  </td>
                )}
                {item.booking_status === "checked_out" && (
                  <td>
                    <button onClick={() => check_in(item.booking_id)}>Check In</button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}