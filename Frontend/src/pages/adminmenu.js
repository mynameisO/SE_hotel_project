import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './adminmenu.css'

export default function Adminmenu() {

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [isLoaded, setIsLoaded] = useState(true);
    const [admin, setAdmin] = useState([]);
    const handleSubmit_roomadmin=(e) => {
        e.preventDefault();
        navigate('/roomadmin');
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/admin/auth`, requestOptions)
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
      }, [])
      const logout = ()=> {
        MySwal.fire({
          html : <i>Log Out Success!</i>,
          icon : 'success'
      }).then((value) => {
        localStorage.removeItem('token')
        navigate('/loginadmin')
      })
      }

    if(isLoaded) return(<div>Loading..</div>)
    return (
        <div className="admin-menu-container">
            <h3>Welcome! {admin.fname} </h3>
            <form onSubmit={handleSubmit_roomadmin}>
                <button type="submit" className="btn-roomadmin">
                    Room Available Edit
                </button>
                <div><button onClick={logout}>Logout</button></div>
            </form>
        </div>
    )


}