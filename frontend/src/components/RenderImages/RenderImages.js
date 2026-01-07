import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';

export const RenderImages = ({ UnsplashKey, destination, count }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!destination || !UnsplashKey) return;

        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://api.unsplash.com/search/photos",
                    {
                        params: { query: destination, per_page: count },
                        headers: { Authorization: `Client-ID ${UnsplashKey.trim()}` }
                    }
                );
                setImages(response.data.results);
            } catch (error) {
                console.error("Unsplash Error Status:", error.response?.status);
            } finally {
                setLoading(false);
            }
        };

        
        const delay = Math.floor(Math.random() * 2000); 
        const timer = setTimeout(fetchImages, delay);

        return () => clearTimeout(timer);
    }, [destination, UnsplashKey, count]);

    return (
        <div className="render-images">
            {!loading && images.length > 0 ? (
                images.map((img) => (
                    <div key={img.id} className="images">
                        <img
                            src={img.urls.regular} 
                            alt={img.alt_description || "Trip Image"}
                            className="trip-image"
                        />
                        <div className="image-destination">{destination}</div>
                    </div>
                ))
            ) : (
                <Skeleton variant="rectangular" className="trip-image" height={200} width="100%" />
            )}
        </div>
    );
};