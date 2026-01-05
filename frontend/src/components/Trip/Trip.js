import { useAuth } from "../../contexts/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './Trip.css';
import 'swiper/css';
import 'swiper/css/navigation';

 
 export default function Trip() {
    const { trips } = useAuth();
    const latestTrip = trips[trips.length - 1];

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
                            <span>{place}</span>
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
                            <div>{hotel.area}</div>
                            <div>{hotel.estimatedPricePerNight}</div>
                            <div>{hotel.name}</div>
                            <div>{hotel.notes}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}