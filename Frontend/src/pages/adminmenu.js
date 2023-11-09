import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Adminmenu() {

    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [admin, setAdmin] = useState([]);
    const handleSubmit_roomadmin=(e) => {
        e.preventDefault();
        navigate('/roomadmin');
    }

    return (
        <div>
            <h3>Welcome! Admin</h3>
            <form onSubmit={handleSubmit_roomadmin}>
                <button type="submit" className="btn-roomadmin">
                    Room Available Edit
                </button>
            </form>
        </div>
    )


}