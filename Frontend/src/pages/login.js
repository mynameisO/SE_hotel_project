import React from "react";
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isProcess = 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const Login = {username, password, isProcess};
        fetch('http://localhost:3050/login',{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(Login)
        }).then((res)=>{
            navigate('/');
        })
    }
    return (
    <bodyl>
      <div className = "Login">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div class = "input-box">
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
            <button type = "submit" className = "btn">Login</button>
            <div className = "register-link">
                <p>Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>
            </div>
        </form>
    </div>
    </bodyl>
    )
}
