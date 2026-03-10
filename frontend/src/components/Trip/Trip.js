import { useAuth } from "../../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { RenderImages } from "../RenderImages/RenderImages";
import "swiper/css";
import "swiper/css/navigation";
import "./Trip.css";
import { useState, useEffect } from "react";

export default function Trip() {
  const { trips, UnsplashKey, initializeTrips } = useAuth();
  const [latestTrip, setLatestTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const loadTrips = async () => {
      await initializeTrips();
      setLoading(false);
    };
    loadTrips();
  }, [initializeTrips]);

  useEffect(() => {
    if (trips && trips.length > 0) {
      setLatestTrip(trips[trips.length - 1]);
    }
  }, [trips]);

  const toggleDayExpansion = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  if (loading) {
    return (
      <div className="user-trips loading-container">
        <div className="loading-content">
          <h1>Planning your adventure...</h1>
        </div>
      </div>
    );
  }

  if (!latestTrip) {
    return (
      <div className="user-trips no-trips">
        <h1>No trips found</h1>
        <button onClick={() => (window.location.href = "/tripForm")}>
          Create Trip
        </button>
      </div>
    );
  }

  const startDate = new Date().toDateString().split(" ").slice(1, 3).join(" ");
  const end = new Date();
  end.setDate(end.getDate() + (latestTrip.totalDays || 1));
  const endDate = end.toDateString().split(" ").slice(1, 3).join(" ");

  return (
    <div className="user-trips">
      <div className="trip-header">
        <h1 className="heading">{latestTrip.destination}</h1>
        <div className="time">
          {startDate} - {endDate}
        </div>
      </div>

      <div className="header-image">
        <RenderImages
          UnsplashKey={UnsplashKey}
          destination={latestTrip.destination}
          count={1}
        />
      </div>

      <div className="trip-destinations">
        <h3>Destinations</h3>
        {latestTrip.destinations?.length > 0 && (
          <Swiper modules={[Navigation]} navigation spaceBetween={16}>
            {latestTrip.destinations.map((place, idx) => (
              <SwiperSlide key={idx}>
                <div className="destination-card">
                  <RenderImages
                    UnsplashKey={UnsplashKey}
                    destination={place}
                    count={1}
                  />
                  <div className="card-overlay">
                    <div className="card-content">
                      <h4 className="card-title">{place}</h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="trip-hotels">
        <h3>Hotels</h3>
        {latestTrip.hotels?.length > 0 && (
          <Swiper modules={[Navigation]} navigation spaceBetween={16}>
            {latestTrip.hotels.map((hotel, idx) => (
              <SwiperSlide key={idx}>
                <div className="hotel-card">
                  <RenderImages
                    UnsplashKey={UnsplashKey}
                    destination={hotel.name}
                    count={1}
                  />
                  <div className="card-overlay">
                    <div className="card-content">
                      <h4 className="card-title">{hotel.name}</h4>
                      <p className="card-subtitle">{hotel.price}</p>
                      <span className="card-rating">⭐ {hotel.rating}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="trip-itinerary">
        <h3>Day-to-Day Itinerary</h3>

        {latestTrip.itinerary?.length > 0 ? (
          <div className="itinerary-list">
            {latestTrip.itinerary.map((day, idx) => {
              const isExpanded = expandedDay === idx;

              return (
                <div
                  key={idx}
                  className={`itinerary-card ${isExpanded ? "expanded" : ""}`}
                >
                  <div
                    className="itinerary-header"
                    onClick={() => toggleDayExpansion(idx)}
                  >
                    <div className="itinerary-title-section">
                      <div className="day-badge">Day {day.day}</div>

                      <h4 className="itinerary-title">
                        {day.activity.substring(0, 60)}...
                      </h4>
                    </div>

                    <span
                      className={`expand-icon ${isExpanded ? "rotated" : ""}`}
                    >
                      ▼
                    </span>
                  </div>

                  <div
                    className={`itinerary-content ${
                      isExpanded ? "visible" : ""
                    }`}
                  >
                    <div className="itinerary-details">
                      <p className="activity-description">{day.activity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-data-message">
            <p>No itinerary available</p>
          </div>
        )}
      </div>
    </div>
  );
}