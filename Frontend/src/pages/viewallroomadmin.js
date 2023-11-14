import { React, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './viewallroomadmin.css'

export default function Viewallroomadmin() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [admin, setAdmin] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [ErrorFetchChecker, setErrorFetchChecker] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("http://omar-server.trueddns.com:52302/api/admin/auth", requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.status === 'ok'){
              setAdmin(result.user)
              setIsLoaded(false)
          }else if(result.status === 'forbidden'){
              MySwal.fire({
                  html : <i>{result.message}</i>,
                  icon : 'error'
              }).then((value) => {
                  navigate('/loginadmin')
              })
          }
        })
        .catch(error => console.log('error', error));
    });

    useEffect(()=> {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://omar-server.trueddns.com:52302/api/admin/viewAllBooking", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setBookings(result)
        })
        .catch(error => {
          console.log('error', error)
          setErrorFetchChecker(c => !c);
      });
    }, [ErrorFetchChecker]
    )
    const logout = ()=> {
      localStorage.removeItem('token')
      navigate('/loginadmin')
    }
    const cancel_booking = (booking_id) =>{
      console.log(booking_id,'cancel')
      MySwal.fire({
        html : <i>Cancel Booking ID {booking_id} success.</i>,
        icon : 'success'
      })
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://omar-server.trueddns.com:52302/api/admin/viewAllBooking", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setBookings(result)
        })
        .catch(error => {
          console.log('error', error)
      })
    }
 

/*useEffect(() => {
    fetch("http://omar-server.trueddns.com:52302/api/admin/viewAllBooking", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setBookings(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); */
  if(isLoaded) return(<div>Loading..</div>)

  return(
    <div className="table">
      <h1>Welcome! {admin.fname}</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Name</th>
            <th>Guest Telephone Number</th>
            <th>Booking Detail</th>
            <th>Booking Status</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>
        <tbody>
          {
            bookings.map((item) => (
              <tr key={item.id}>
                <td>{item.booking_id}</td>
                <td>{item.guest_name}</td>
                <td>{item.guest_tel}</td>
                <td>{item.booking_detail}</td>
                <td>{item.booking_status}</td>
                {item.booking_status !== 'cancel' && <td><button onClick={()=>cancel_booking(item.booking_id)}>Cancel</button></td>}
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </div>
  )
}