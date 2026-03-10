import { useEffect, useState } from "react";
import { RenderImages } from "../RenderImages/RenderImages";
import { useAuth } from "../../contexts/AuthContext";
import "./AllTrips.css";

export default function AllTrips() {
    const { initializeTrips, trips, UnsplashKey } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(trips);

    useEffect(() => {
        const loadTrips = async () => {
            try {
                await initializeTrips();
            } catch (error) {
                console.error("Error loading trips:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTrips();
    }, [initializeTrips]);

    if (loading) {
        return (
            <div className="user-all-trips loading">
                <div className="loading-content">
                    <div className="plane">✈️</div>
                    <p>Loading your trips...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-all-trips">
            {!trips || trips.length === 0 ? (
                <div className="no-trips-message">
                    <h2>No trips found</h2>
                    <p>Start creating your first trip today!</p>
                </div>
            ) : (
                trips.map((trip, i) => (
                    <div className="user-trip" key={i}>
                        <div className="user-trip-details">
                            <h3 className="user-trip-heading">
                                {trip.destination || "No Destination"}
                            </h3>

                            <div className="trip-info">
                                <span>📅 {trip.totalDays || 0} days</span>
                            </div>
                        </div>

                        <div className="trip-image">
                            <RenderImages
                                UnsplashKey={UnsplashKey}
                                destination={trip.destination}
                                count={1}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}