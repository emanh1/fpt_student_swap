import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
            setUser(JSON.parse(cachedUser));
            setLoading(false);
        } else {
            checkAuth();
        }

    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/auth/user`, 
                { withCredentials: true }
            );
            setUser(response.data);
            sessionStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };