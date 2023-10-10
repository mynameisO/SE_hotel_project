import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar2(){
    return <nav className="navl">
        <ul>
            <CustomLink to="/room">Room</CustomLink>
            <CustomLink to="/facilities">Facilities & Service</CustomLink>
            <CustomLink to="/surrounding">Surrounding</CustomLink>
            <CustomLink to="/dine">Dine</CustomLink>
            <CustomLink to="/location">Location</CustomLink>
            <CustomLink to="/contact">Contact Us</CustomLink>
            <CustomLink to="/booking">Booking</CustomLink>
            <CustomLink to="/payment">Payment</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to) ;
    const isActive = useMatch({ path : resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}