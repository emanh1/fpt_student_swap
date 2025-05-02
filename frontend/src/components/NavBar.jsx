import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import axios from "axios";

function NavBar() {
    const { checkAuth } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/auth/logout`, {
                withCredentials: true,
            });

            sessionStorage.removeItem('user');
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-lg border-b border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                    <Link 
                        to="/" 
                        className="hover:text-blue-400 font-bold transition-colors duration-200"
                    >
                        Swap Requests
                    </Link>
                    <Link 
                        to="/add" 
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Add Request
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                    onClick={handleLogout}
                    className="hover:text-blue-400"
                    >
                    Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;