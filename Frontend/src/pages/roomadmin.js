import { React, useState, useEffect } from "react"
import { useNavigate,} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './roomadmin.css'


export default function Roomadmin() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [isLoaded, setIsLoaded] = useState(true);
    const [admin, setAdmin] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState('none');
    const [bookings, setBookings] = useState([]);
    const [guestTelnum,setGuestTelnum] = useState('');
    const [guestName, setGuestName] = useState('');
    const options = ['check_in', 'check_out', 'none'];
    const [search, setSearch] = useState(false);
    const [searchBooking, setSearchBooking] = useState([]);
    //const [bookingID, setBookingID] = useState([]);
    
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
      
     /* const fetchDataFromBackend = async () => {
        try {
          const token = localStorage.getItem('token');
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + token);
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          const response = await fetch("http://omar-server.trueddns.com:52302/api/admin/showBooking", requestOptions);
          const jsonData = await response.json();
          console.log('jsonData:', jsonData);
          setBookings(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };*/

     
 useEffect(()=> {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://omar-server.trueddns.com:52302/api/admin/showBooking", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setBookings(result)
          })
          .catch(error => console.log('error', error));
      },[]
      )
      const logout = ()=> {
        localStorage.removeItem('token')
        navigate('/loginadmin')
      }

      const handlesubmit_search = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "status": status,
          "guest_name": guestName,
          "guest_tel": guestTelnum
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://omar-server.trueddns.com:52302/api/admin/searchBooking", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            setSearchBooking(result)
          })
          .catch(error => console.log('error', error));
           setSearch(true)
        }
      const check_in = (booking_id) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "booking_id": booking_id,
          "status": "checked_in"
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://omar-server.trueddns.com:52302/api/admin/updateBookingStatus", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success === true ){
              MySwal.fire({
                html : <i>{result.message}</i>,
                icon : 'success'
            })
            }else if(result.success === false){
              MySwal.fire({
                html : <i>{result.message}</i>,
                icon : 'error'
            })
            }
          })
          .catch(error => console.log('error', error));
      }

      const check_out = (booking_id) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "booking_id": booking_id,
          "status": "checked_out"
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://omar-server.trueddns.com:52302/api/admin/updateBookingStatus", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success === true ){
              MySwal.fire({
                html : <i>{result.message}</i>,
                icon : 'success'
            })
            }else if(result.success === false){
              MySwal.fire({
                html : <i>{result.message}</i>,
                icon : 'error'
            })
            }
          })
          .catch(error => console.log('error', error));
      }

    if(isLoaded) return(<div>Loading..</div>)

      const viewallroomadmin = () => {
        navigate('/viewallroomadmin');
      }
    
    return (
        <div>
            <h3>Welcome! {admin.fname} </h3>
            <h4>Room Editing</h4>
              <div className="dropdown">
              <div className="dropdown-btn" onClick={(e) =>
              setIsActive(!isActive)}>
                {status}
                <span className="dropdown-span">v</span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  { options.map((options) =>
                    <div
                      onClick={(e) => {
                        setStatus(options);
                        setIsActive(false);
                      }}
                      className="dropdown-item">
                        {options}
                  </div>
                  )}
                </div>
              )}
            </div>
            <div className="searchbar">
              <p>Tel:<input type="text" placeholder="Guest TelNum" onChange={e => 
              setGuestTelnum(e.target.value)} /></p>
            </div>
            <div className="searchbar2">
              <p>Name:<input type="text" placeholder="Guest Name" onChange={e => 
              setGuestName(e.target.value)} /></p> 
              <div className="search-button" onClick={handlesubmit_search}>
                Search
              </div>
            </div>
            <div className="button-container"><button onClick={logout}>Logout</button></div>
            <div className="button-container"><button onClick={viewallroomadmin}>View All Rooms</button></div>
            <div className=""></div>
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
                  {search === false && bookings.map(item => (
                    <tr key = {item.id}>
                      <td>{item.booking_id}</td>
                      <td>{item.guest_name}</td>
                      <td>{item.guest_telnum}</td>
                      <td>{item.booking_detail}</td>
                      <td>{item.booking_status}</td>
                      {item.booking_status === "checked_in" && <td><button onClick={()=>check_out(item.booking_id)}>Check Out</button></td>}
                      {item.booking_status === "checked_out" && <td><button onClick={()=>check_in(item.booking_id)}>Check In</button></td>} 
                    </tr>
                  ))}
                  {search === true && searchBooking.map(item => (
                    <tr key = {item.id}>
                      <td>{item.booking_id}</td>
                      <td>{item.guest_name}</td>
                      <td>{item.guest_telnum}</td>
                      <td>{item.booking_detail}</td>
                      <td>{item.booking_status}</td>
                      {item.booking_status === "checked_in" && <td><button onClick={()=>check_out(item.booking_id)}>Check Out</button></td>}
                      {item.booking_status === "checked_out" && <td><button onClick={()=>check_in(item.booking_id)}>Check In</button></td>} 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>                     
    )
}