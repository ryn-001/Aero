import {useState,useEffect} from "react";
import {RenderImages} from "../RenderImages/RenderImages";
import { useAuth } from "../../contexts/AuthContext";
import "./AllTrips.css"

export default function AllTrips (){
    const {initializeTrips, trips, setTrips, UnsplashKey} = useAuth();
    
    useEffect(() => {
        initializeTrips();
        setTrips(trips);
    }, [trips]);

    return (<div className="user-all-trips">
        {trips.length == 0 ? (<div>No trips found, add some !</div>) : (
            trips.map((trip,i) => (
                <div className="user-trip" key={i}>
                    <div className="user-trip-details">
                        <h3 className="user-trip-heading">{trip.destination ? trip.destination : "No Destination"}</h3>
                        <div>Time : {trip.totalDays ? trip.totalDays : 0} days</div>
                    </div>
                    <RenderImages UnsplashKey={UnsplashKey} destination={trip.destination} count={1}/>
                </div>
            ))
        )}
    </div>)
}