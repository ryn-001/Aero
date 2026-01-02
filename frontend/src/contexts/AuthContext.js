import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${config.endpoint}/users/me`,
                    { withCredentials: true }
                );
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (userData) => {
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
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
