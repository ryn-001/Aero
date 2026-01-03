import {Navigate,Outlet} from "react-router-dom";
import { useEffect } from "react";
import {useAuth} from "../contexts/AuthContext";

export const ProtectedRoute = () => {
    const {user,loading} = useAuth();

    useEffect(() => {

    }, [user,loading]);

    if(loading) return null;

    return user ? <Outlet/> : <Navigate to="/login" replace/>
} 

export const PublicRoute = () => {
    const {user,loading} = useAuth();

    if(loading) return null;
    
    return !user ? <Outlet /> : <Navigate to="/tripForm" replace />;
}