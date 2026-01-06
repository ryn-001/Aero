import { useAuth } from "../../contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { RenderImages } from "../RenderImages/RenderImages";
import 'swiper/css';
import 'swiper/css/navigation';
import './Trip.css';
import { useState, useEffect } from "react";

 
 export default function Trip() {
    const { trips, UnsplashKey } = useAuth();
    const [latestTrip,setLatestTrip] = useState(trips[trips.length - 1]);

    useEffect(() => {
        setLatestTrip(trips[trips.length - 1]);
    }, [trips]);

    const startDate = new Date().toDateString().split(" ").slice(1, 3).join(" ");
    
    const end = new Date(startDate);
    end.setDate(end.getDate() + latestTrip.totalDays);

    const endDate = end.toDateString().split(" ").slice(1, 3).join(" ");
    
    console.log(latestTrip); 

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
                <Swiper
                    className="destinations-list"
                    modules={[Navigation]}
                    loop={true}
                    navigation
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                    }}

                >
                    {latestTrip.destinations.map((place, idx) => (
                        <SwiperSlide key={idx} className='destination-card'>
                            <RenderImages UnsplashKey={UnsplashKey} destination={place} count={1} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="trip-hotels">
                <h3>Hotels</h3>
                <Swiper
                    className="hotels-list"
                    modules={[Navigation]}
                    loop={true}
                    navigation
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                    }}

                >
                    {latestTrip.hotels.map((hotel, idx) => (
                        <SwiperSlide key={idx} className='hotel-card'>
                            <RenderImages UnsplashKey={UnsplashKey} destination={hotel.name} count={1} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            
        </div>
    );
}