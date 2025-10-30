import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Navbar.css'

export default function Navbar(){
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    //handle user logout
    async function handleLogout() {
        try{
            await logout();
            navigate('/login');
        }catch(error){
            console.error('Failed to login', error);
        }
    }
    
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">Registration </Link>

                <div className="nav-menu">

                </div>
            </div>
        </nav>
    )
}
    