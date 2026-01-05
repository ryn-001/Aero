import { useState, useEffect, use } from "react";
import { useAuth } from "../../contexts/AuthContext";
 
 export default function Trip() {
    const { trips } = useAuth();

    const [userTrips, setUserTrips] = useState([]);
    console.log(userTrips);
    useEffect(() => {
        setUserTrips(trips[trips.length - 1]);
    },[])

    return (
        <div className='user-trips'>
            
        </div>
    );
}