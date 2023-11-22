import React from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Loginadmin() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   /* const handleSubmit = (e) => {
        e.preventDefault();
        const Login = {username, password, isProcess};
        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/login`,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(Login)
        }).then((res)=>{
            navigate('/');
        })
    }*/
    const handleSubmit = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": username,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/admin/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.error){
                MySwal.fire({
                    html : <i>{result.error}</i>,
                    icon : 'error'
                })
               navigate('/loginadmin');
            }else{
                MySwal.fire({
                    html : <i>login Success.</i>,
                    icon : 'success'
                }).then((value) => {
                    localStorage.setItem('token', result.accessToken)
                    console.log(result.accessToken)
                    navigate('/adminmenu');
                })
            }
        })
        .catch(error => console.log('error', error));
    }
    return (
    <bodyl>
      <div className = "Login">
        <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <div class = "input-box">
                <input type = "text" placeholder = "Email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className = "input-box">
                <input type = "password" placeholder = "Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type = "submit" className = "btn-login">Login</button>
        </form>
    </div>
    </bodyl>
    )
}
