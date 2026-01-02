import {Navigate,Outlet} from "react-router-dom";
import { useEffect } from "react";
import {useAuth} from "../contexts/AuthContext";
import toast from 'react-hot-toast';

export const ProtectedRoute = () => {
    const {user,loading} = useAuth();

    useEffect(() => {

        if(!loading && !user){
            toast.error('Login to access this page', {id:"auth-denied", duration: 3000});
        }

    }, [user,loading]);

    if(loading) return null;

    return user ? <Outlet/> : <Navigate to="/login" replace/>
} 

export const PublicRoute = () => {
    const {user,loading} = useAuth();

    if(loading) return null;
    
    return !user ? <Outlet /> : <Navigate to="/tripForm" replace />;
}