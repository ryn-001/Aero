import { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import './RenderImages.css';

export const RenderImages = ({ UnsplashKey, destination, count }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!destination) return;

        const fetchImages = async (place, count) => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://api.unsplash.com/search/photos",
                    {
                        params: {
                            query: place,
                            per_page: count,
                        },
                        headers: {
                            Authorization: `Client-ID ${UnsplashKey}`,
                        },
                    }
                );

                setImages(response.data.results);
            } catch (error) {
                console.error("Unsplash error:", error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchImages(destination, count);
    }, [destination, UnsplashKey]);

    return(
        <div className="render-images">
            {!loading ? images.map((img,i) => (
            <div key={i} className="images">
                <img
                    key={img.id}
                    src={img.urls.raw}
                    alt={img.alt_description || "Trip Image"}
                    className="trip-image"
                />
                <div className="image-destination">{destination}</div>
            </div>
        )) : <Skeleton variant="rounded trip-image"/>}
        </div>
    )   
}