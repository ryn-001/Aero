import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { TextField, Button, CircularProgress } from '@mui/material';
import { BsBackpack2 } from "react-icons/bs";
import { LuPartyPopper } from "react-icons/lu";
import { FaGlassCheers } from "react-icons/fa";
import { PiMountainsFill } from "react-icons/pi";
import { IoSparklesSharp } from "react-icons/io5";
import { LuSunMedium } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import {config} from "../../config";
import {useAuth} from "../../contexts/AuthContext";
import axios from "axios";
import "./TripForm.css";

export default function Trip() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [tripLoad, setTripLoad] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {user} = useAuth();

    const [data, setData] = useState({
        place: '',
        days: '',
        type: '',
        cost: ''
    });

      const fetchPlaces = useCallback(async (value) => {
          if (!value) {
              setResults([]);
              return;
          }
          try {
              const res = await axios.get("https://nominatim.openstreetmap.org/search", {
                  params: { format: "json", q: value },
                  headers: { "Accept-Language": "en" }
              });
              setResults(res.data);
          } catch (error) {
              console.error("Error fetching places:", error);
          }
      }, []); 

   
      const debouncedFetch = useMemo(
          () => debounce((val) => fetchPlaces(val), 500),
          [fetchPlaces]
      );

    const validate = () => {
        return data.place.trim() !== '' && data.days !== '' && data.type !== '' && data.cost !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!validate()) return;

        try {
            setTripLoad(true);
            const postRes = await axios.post(
                `${config.endpoint}/trip/createTrip`,
                { trip: data },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            if (postRes.status === 201) {
                const generateRes = await axios.get(`${config.endpoint}/trip/generateTrip`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                if(generateRes) toast.success("Trip generated successfully!");

                console.log("FINAL DATA:", generateRes.data);
            }

        } catch (e) {
            console.error("Error:", e);
            toast.error("Failed to get itinerary");
        } finally {
            setTripLoad(false);
        }
    };

    const inputStyle = (hasError) => ({
        width: "100%",
        margin: "0.5rem 0",
        "& .MuiOutlinedInput-root": {
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            borderRadius: "1rem",
            fontSize: "small",
            "& fieldset": {
                border: hasError ? "2px solid #d32f2f" : "2px solid rgba(0, 0, 0, 0.2)",
            },
            "&:hover fieldset": {
                borderColor: hasError ? "#d32f2f" : "rgba(0, 0, 0, 0.4)",
            },
            "&.Mui-focused fieldset": {
                borderColor: hasError ? "#d32f2f" : "#ff880060",
                borderWidth: "2px",
            },
        },
        "& .MuiOutlinedInput-input": { padding: "10px 1rem" },
        "& .MuiFormHelperText-root": { color: "#d32f2f", marginLeft: "1rem" }
    });

    const buttonStyles = (field, value) => {
        const isSelected = data[field] === value;
        const hasError = submitted && !data[field];
        return {
            textTransform: "none",
            borderRadius: "0.75rem",
            padding: "0.5rem 1.25rem",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            border: "2px solid",
            transition: "all 0.2s ease",
            borderColor: isSelected ? "rgba(255, 165, 0, 0.5)" : (hasError ? "#d32f2f" : "rgba(0, 0, 0, 0.3)"),
            backgroundColor: isSelected ? "rgba(255, 165, 0, 0.6)" : "white",
            color: isSelected ? "#000" : (hasError ? "#d32f2f" : "rgba(0, 0, 0, 0.8)"),
            "&:hover": {
                backgroundColor: isSelected ? "rgba(255, 165, 0, 0.7)" : "rgba(0, 0, 0, 0.05)",
                borderColor: isSelected ? "rgba(255, 165, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
            },
        };
    };

    return (
        <div className="trip">
            <form className="trip-form" onSubmit={handleSubmit}>
                <h2>One place, Endless possibilities</h2>

                <div className="search-places">
                    <p style={{ color: submitted && !data.place ? '#d32f2f' : 'inherit' }}>Enter a destination to explore travel options</p>
                    <TextField
                        placeholder="Search place..."
                        sx={inputStyle(submitted && !data.place)}
                        value={query}
                        helperText={submitted && !data.place ? "Destination is required" : ""}
                        onChange={(e) => {
                            setData(prev => ({ ...prev, place: e.target.value }));
                            setQuery(e.target.value);
                            debouncedFetch(e.target.value);
                        }}
                    />
                    <ul className="suggestions">
                        {results.map((place) => (
                            <li key={place.place_id} onClick={() => {
                                setQuery(place.display_name);
                                setData(prev => ({ ...prev, place: place.display_name }));
                                setResults([]);
                            }}>
                                {place.display_name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="no-of-days">
                    <p style={{ color: submitted && !data.days ? '#d32f2f' : 'inherit' }}>Enter total number of days</p>
                    <TextField
                        type="number"
                        placeholder="Enter number of days..."
                        sx={inputStyle(submitted && !data.days)}
                        value={data.days}
                        helperText={submitted && !data.days ? "Days are required" : ""}
                        onChange={(e) => setData(prev => ({ ...prev, days: e.target.value }))}
                    />
                </div>

                <div className="trip-type">
                    <p style={{ color: submitted && !data.type ? '#d32f2f' : 'inherit' }}>Select trip type</p>
                    <div className='types'>
                        <Button sx={buttonStyles("type", "solo")} onClick={() => setData(p => ({ ...p, type: 'solo' }))}>
                            <p className='trip-type-icon'><BsBackpack2 /></p> Solo Trip
                        </Button>
                        <Button sx={buttonStyles("type", "couple")} onClick={() => setData(p => ({ ...p, type: 'couple' }))}>
                            <p className='trip-type-icon'><FaGlassCheers /></p> Couple Trip
                        </Button>
                        <Button sx={buttonStyles("type", "family")} onClick={() => setData(p => ({ ...p, type: 'family' }))}>
                            <p className='trip-type-icon'><PiMountainsFill /></p> Family Trip
                        </Button>
                        <Button sx={buttonStyles("type", "friends")} onClick={() => setData(p => ({ ...p, type: 'friends' }))}>
                            <p className='trip-type-icon'><LuPartyPopper /></p> Friends Trip
                        </Button>
                    </div>
                </div>

                <div className="trip-cost">
                    <p style={{ color: submitted && !data.cost ? '#d32f2f' : 'inherit' }}>Select your budget</p>
                    <div className='types'>
                        <Button sx={buttonStyles("cost", "low")} onClick={() => setData(p => ({ ...p, cost: 'low' }))}>
                            <p className='trip-price-icon'><IoSparklesSharp /></p> Low
                        </Button>
                        <Button sx={buttonStyles("cost", "medium")} onClick={() => setData(p => ({ ...p, cost: 'medium' }))}>
                            <p className='trip-price-icon'><LuSunMedium /></p> Medium
                        </Button>
                        <Button sx={buttonStyles("cost", "high")} onClick={() => setData(p => ({ ...p, cost: 'high' }))}>
                            <p className='trip-price-icon'><FaMoneyBill /></p> High
                        </Button>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#FF8C00",
                        width: tripLoad ? "200px" : "150px",
                        marginLeft: "auto",
                        borderRadius: "0.5rem",
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        "&:hover": { backgroundColor: "#e36003ff" }
                    }}>
                    {tripLoad ? (<><CircularProgress size='20px' sx={{ color: 'white', mr: 1 }}/> Generating</>) : ('Submit')}
                </Button>
            </form>
        </div>
    );
}