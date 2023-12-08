import React from "react";
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Login() {
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

        fetch("http://omar-server.trueddns.com:52302/api/admin/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.error){
                MySwal.fire({
                    html : <i>{result.error}</i>,
                    icon : 'error'
                })
               navigate('/login');
            }else{
                MySwal.fire({
                    html : <i>login Success.</i>,
                    icon : 'success'
                })
               navigate('/');
            }
        })
        .catch(error => console.log('error', error));
    }
    return (
    <div className="LoginContainer">
      <div className = "Login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className = "input-box">
                    <input type = "text" placeholder = "Username"
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
                <div className = "remember-forger">
                    <label><input type = "checkbox"></input> Remember me </label>
                    <Link to = "/forgotpass">Forgot Your Password?</Link>
                </div>
                <button type = "submit" className = "btn-login">Login</button>
                <div className = "register-link">
                    <p>Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
    )
}
