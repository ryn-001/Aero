import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [trips,setTrips] = useState(null);
    const [UnsplashKey,setUnsplashKey] = useState(null);
    const [loading, setLoading] = useState(true);

    const initializeAuth = async () => {
        try {
            setLoading(true);
            const [userRes,tripsRes] = await Promise.all([
                await axios.get(`${config.endpoint}/users/me`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }),
                axios.get(`${config.endpoint}/trip/all`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            ]);
            localStorage.setItem("user-trips", JSON.stringify(tripsRes.data.trips));
            setUser(userRes.data.user);
            setTrips(tripsRes.data.trips)
            setUnsplashKey(tripsRes.data.key)
        } catch (e) {
            console.error("Auth initialization failed:", e);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            toast.loading("Logging out...", { id: "logout" });

            await axios.get(
                `${config.endpoint}/users/logout`,
                { withCredentials: true }
            );

            toast.success("Logged out!", { id: "logout" });
            setUser(null);
        } catch (err) {
            toast.error("Logout failed", { id: "logout" });
        }
    };

    return (
    <AuthContext.Provider value={{ user, login, logout, UnsplashKey, loading, trips}}>
        {!loading && children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
