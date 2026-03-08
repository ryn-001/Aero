import { useAuth } from "../../contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { RenderImages } from "../RenderImages/RenderImages";
import 'swiper/css';
import 'swiper/css/navigation';
import './Trip.css';
import { useState, useEffect } from "react";

 
export default function Trip() {
    const { trips, UnsplashKey, initializeTrips } = useAuth();
    const [latestTrip, setLatestTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [expandedDays, setExpandedDays] = useState(new Set([0]));

    useEffect(() => {
        const loadTrips = async () => {
            if (hasInitialized) return; 

            setLoading(true);
            try {
                await initializeTrips();
                setHasInitialized(true);

                setTimeout(() => {
                    if (trips && trips.length > 0) {
                        setLatestTrip(trips[trips.length - 1]);
                    }
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error loading trips:", error);
                setLoading(false);
            }
        };

        loadTrips();
    }, [hasInitialized,initializeTrips,trips]); 

    if (loading) {
        return (
            <div className='user-trips loading-container'>
                <div className="loading-content">
                    <div className="loading-animation">
                        <div className="plane-container">
                            <div className="plane">✈️</div>
                            <div className="plane-trail"></div>
                        </div>
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="loading-text">
                        <h1 className="loading-title">Planning your adventure</h1>
                        <p className="loading-subtitle">Discovering amazing destinations...</p>
                    </div>
                    <div className="loading-progress">
                        <div className="progress-bar">
                            <div className="progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!latestTrip || !trips || trips.length === 0) {
        return (
            <div className='user-trips no-trips'>
                <div className="no-trips-content">
                    <div className="no-trips-icon">🗺️</div>
                    <h1 className="no-trips-title">No trips found</h1>
                    <p className="no-trips-subtitle">Start your journey by creating your first trip!</p>
                    <button
                        className="create-trip-btn"
                        onClick={() => window.location.href = '/tripForm'}
                    >
                        Create Trip
                    </button>
                </div>
            </div>
        );
    }

    const startDate = new Date().toDateString().split(" ").slice(1, 3).join(" ");

    const end = new Date(startDate);
    end.setDate(end.getDate() + (latestTrip.totalDays || 1));

    const endDate = end.toDateString().split(" ").slice(1, 3).join(" ");

    const toggleDayExpansion = (dayIndex) => {
        const newExpanded = new Set(expandedDays);
        if (newExpanded.has(dayIndex)) {
            newExpanded.delete(dayIndex);
        } else {
            newExpanded.add(dayIndex);
        }
        setExpandedDays(newExpanded);
    }; 

    return (
        <div className='user-trips'>
            <div className="trip-header">
                <h1 className="heading">{latestTrip.destination}</h1>
                <div className="time">{startDate} - {endDate}</div>
            </div>

            <div className="header-image">
                <RenderImages UnsplashKey={UnsplashKey} destination={latestTrip.destination} count={1} />
            </div>

            <div className="trip-destinations">
                <h3>Destinations</h3>
                {latestTrip.destinations && latestTrip.destinations.length > 0 ? (
                    <Swiper
                        className="destinations-list"
                        modules={[Navigation]}
                        loop={false}
                        navigation={latestTrip.destinations.length > 1}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            576: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                        }}
                    >
                        {latestTrip.destinations.map((place, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='destination-card'>
                                    <RenderImages UnsplashKey={UnsplashKey} destination={place} count={1} />
                                    <div className="card-overlay">
                                        <div className="card-content">
                                            <h4 className="card-title">{place}</h4>
                                            <div className="card-icon">📍</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="no-data-message">
                        <p>No destinations available for this trip</p>
                    </div>
                )}
            </div>

            <div className="trip-hotels">
                <h3>Hotels</h3>
                {latestTrip.hotels && latestTrip.hotels.length > 0 ? (
                    <Swiper
                        className="hotels-list"
                        modules={[Navigation]}
                        loop={false}
                        navigation={latestTrip.hotels.length > 1}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            576: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                        }}
                    >
                        {latestTrip.hotels.map((hotel, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='hotel-card'>
                                    <RenderImages UnsplashKey={UnsplashKey} destination={hotel?.name || hotel} count={1} />
                                    <div className="card-overlay">
                                        <div className="card-content">
                                            <h4 className="card-title">{hotel?.name || hotel}</h4>
                                            {hotel?.price && <p className="card-subtitle">{hotel.price}</p>}
                                            {hotel?.rating && <div className="card-rating">⭐ {hotel.rating}</div>}
                                            <div className="card-icon">🏨</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="no-data-message">
                        <p>No hotels available for this trip</p>
                    </div>
                )}
            </div>

            <div className="trip-itinerary">
                <h3>Day-to-Day Itinerary</h3>
                <div className="itinerary-list">
                    {latestTrip.itinerary && latestTrip.itinerary.length > 0 ? (
                        latestTrip.itinerary.map((day, idx) => {
                            const isExpanded = expandedDays.has(idx);
                            const dayNumber = day.day || (idx + 1);
                            const activity = day.activity || day.description || 'No description available';

                            return (
                                <div key={idx} className={`itinerary-card ${isExpanded ? 'expanded' : ''}`}>
                                    <div
                                        className="itinerary-header"
                                        onClick={() => toggleDayExpansion(idx)}
                                    >
                                        <div className="itinerary-title-section">
                                            <div className="day-badge">Day {dayNumber}</div>
                                            <h4 className="itinerary-title">
                                                {activity.length > 80 ? `${activity.substring(0, 80)}...` : activity}
                                            </h4>
                                        </div>
                                        <div className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                                            ▼
                                        </div>
                                    </div>
                                    <div className={`itinerary-content ${isExpanded ? 'visible' : ''}`}>
                                        <div className="itinerary-details">
                                            <p className="activity-description">{activity}</p>
                                            <div className="day-highlights">
                                                <div className="highlight-item">
                                                    <span className="highlight-icon">📅</span>
                                                    <span>Day {dayNumber} of {latestTrip.totalDays}</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <span className="highlight-icon">🎯</span>
                                                    <span>Adventure awaits!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-data-message">
                            <p>No itinerary available for this trip</p>
                        </div>
                    )}
                </div>
            </div>

            
        </div>
    );
}