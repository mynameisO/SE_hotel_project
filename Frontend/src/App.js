import Navbar from "./Navbar"
import Navbar2 from "./navbar2"
import Register from "./pages/register"
import Home from "./pages/home"
import Login from "./pages/login"
import Room from "./pages/room"
import { Route, Routes} from "react-router-dom"
import Facilities from "./pages/facilities"
import Contact from "./pages/contact"
import Booking from "./pages/booking"
import Surrounding from "./pages/surrounding"
import Dine from "./pages/dine"
import Location from "./pages/location"
import Forgotpass from "./pages/forgotpass"
import Payment from "./pages/payment"
import Bookingroom from "./pages/Bookingroom"
function App() {
  return( 
  <>
    <Navbar /> 
    <Navbar2 />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room" element={<Room />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/surrounding" element={<Surrounding />} />
        <Route path="/dine" element={<Dine />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookingroom" element={<Bookingroom />} />
    </Routes>
  </>
  )
}
export default App;