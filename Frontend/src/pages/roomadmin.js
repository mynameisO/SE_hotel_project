import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './roomadmin.css'

export default function Roomadmin() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [isLoaded, setIsLoaded] = useState(true);
    const [admin, setAdmin] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState('All roomtype');
    const [Search, setSearch] = useState('');
    const [bookings, setBookings] = useState([]);
    const options = ['Deluxe room', 'Luxury room', 'Standard room', 'All roomtype'];
    
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
      }, [MySwal, navigate]);
      
      const fetchDataFromBackend = async () => {
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
      };

      const logout = ()=> {
        localStorage.removeItem('token')
        navigate('/loginadmin')
      }
      const data = {selected, Search};
      console.log(data)

    if(isLoaded) return(<div>Loading..</div>)
    
    return (
        <div>
            <h3>Welcome! {admin.fname} </h3>
            <h4>Room Editing</h4>
            <div className="dropdown">
              <div className="dropdown-btn" onClick={(e) =>
              setIsActive(!isActive)}>
                {selected}
                <span className="dropdown-span">v</span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  { options.map((options) =>
                    <div
                      onClick={(e) => {
                        setSelected(options);
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
              <p>Search<input type="text" placeholder="Booking ID" onChange={e => 
              setSearch(e.target.value)} /></p>
            </div>
            <div className="searchbar2">
              <p>Search<input type="text" placeholder="Guest Name" onChange={e => 
              setSearch(e.target.value)} /></p> 
            </div>
            <div><button onClick={logout}>Logout</button></div>
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
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(item => (
                    <tr key = {item.id}>
                      <td>{item.booking_id}</td>
                      <td>{item.guest_name}</td>
                      <td>{item.guest_telenum}</td>
                      <td>{item.booking_detail}</td>
                      <td>{item.booking_status}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>                     
    )
}