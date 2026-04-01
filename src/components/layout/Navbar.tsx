import { NavLink } from "react-router-dom";
import "./Navbar.css";

const linkClass =
  "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">
          HotelBook
        </h1>

        <div className="flex gap-2 bg-black">
          <NavLink to="/hotels" className={linkClass}>
            Hotels
          </NavLink>
          <NavLink to="/booking" className={linkClass}>
            Booking
          </NavLink>
          <NavLink to="/dining" className={linkClass}>
            Dining
          </NavLink>
          <NavLink to="/cab" className={linkClass}>
            Cab
          </NavLink>
          <NavLink to="/payment" className={linkClass}>
            Payment
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
