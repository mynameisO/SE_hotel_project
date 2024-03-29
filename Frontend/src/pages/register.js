import React from "react";
import './register.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Register() {
    const MySwal = withReactContent(Swal);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [phonenum, setPhonenum] = useState('');

    const navigate = useNavigate();
    console.log(process.env.BACKEND_IP) 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmpass){
        const Register = {username, password, firstname, lastname, dateofbirth, email, phonenum};
        fetch(`http://omar-server.trueddns.com:52302/api/admin/register`,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(Register)
        }).then((res)=>{
            MySwal.fire({
                html : <i>Register Success.</i>,
                icon : 'success'
            })
           navigate('/login');
        })
        } else{
            MySwal.fire({
                html : <i>Password Not Matched</i>,
                icon: 'error'
            })
        }
    }
    return (
    <div className="RegisterContainer">
      <div className = "Register">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
                <div className = "input-box">
                    <p>Username</p>
                    <input type = "text" placeholder = "Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>First Name</p>
                    <input type = "text" placeholder = "First name"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Last Name</p>
                    <input type = "text" placeholder = "Last Name"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Date of Birth</p>
                    <input type = "text" placeholder = "DD/MM/YY"
                    required
                    value={dateofbirth}
                    onChange={(e) => setDateofbirth(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Email</p>
                    <input type = "text" placeholder = "Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Phone Number</p>
                    <input type = "text" placeholder = "Phone Number"
                    required
                    value={phonenum}
                    onChange={(e) => setPhonenum(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Password</p>
                    <input type = "password" placeholder = "Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className = "input-box">
                    <p>Confirm Password</p>
                    <input type = "password" placeholder = "Confirm Password"
                    required
                    value={confirmpass}
                    onChange={(e) => setConfirmpass(e.target.value)}
                    />
                </div>
                <button type = "submit" className = "btn-reg">Register</button>
                <div className = "register-link">
                </div>
                <div className = "register-link">
                    <p>Have an Account?
                        <Link to="/login"> Login</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
    )
}