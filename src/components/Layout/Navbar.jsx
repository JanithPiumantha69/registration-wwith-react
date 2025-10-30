import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">Registration </Link>

                <din className="nav-menu">

                </din>
            </div>
        </nav>
    )
}
    