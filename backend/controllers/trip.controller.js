const { UserTrips } = require('../models/userTrips.models');
const { GoogleGenAI } = require("@google/genai");

const getUserTripByEmail = async (req, res) => {
    try {
        const email = req.user.email;
        const userTrips = await UserTrips.findOne({ email });
        if (!userTrips) return res.status(404).json({ message: 'User trips not found' });
        return res.status(200).json(userTrips);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const addTrip = async (req, res) => {
    try {
        const { trip } = req.body;
        const email = req.user.email;
        if (!email || !trip) return res.status(400).json({ message: 'Email and trip data required' });

        let userTrips = await UserTrips.findOne({ email });
        if (!userTrips) {
            userTrips = await UserTrips.create({ email, trips: [trip] });
        } else {
            userTrips.trips.push(trip);
            await userTrips.save();
        }
        return res.status(201).json({ message: 'Trip added successfully', userTrips });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const generateTrip = async (req, res) => {
    try {
        const email = req.user.email;
        const userTripsRecord = await UserTrips.findOne({ email });
        const tripData = userTripsRecord ? userTripsRecord.trips[userTripsRecord.trips.length - 1] : null;

        if (!tripData) return res.status(400).json({ message: 'No trip data found' });

        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

        const prompt = `Generate a ${tripData.days}-day travel itinerary for "${tripData.place}" for a "${tripData.type}" trip with a "${tripData.cost}" budget. 
        Return strictly JSON format following this exact schema:
        {
        "destination": "${tripData.place}",
        "totalDays": ${tripData.days},
        "heroImage": "Descriptive prompt for a high-res landscape image of ${tripData.place}",
        "hotels": [
            { "name": "Hotel Name", "description": "Short description", "imageUrl": "Image prompt" }
        ],
        "destinations": [
            { "place": "Landmark", "description": "Why visit", "imageUrl": "Image prompt" }
        ],
        "itinerary": [
            {
            "day": 1,
            "title": "Theme",
            "activities": ["Activity 1", "Activity 2"],
            "imageUrl": "Image prompt",
            "budget": "${tripData.cost}",
            "type": "${tripData.type}"
            }
        ]
        }`;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                thinkingConfig: { thinkingLevel: "MINIMAL" }
            }
        });
        
        const text = response.text || (response.generatedContents && response.generatedContents[0]?.text);
        
        if (!text) {
            return res.status(500).json({ message: "AI returned an empty response" });
        }

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        
        if (jsonMatch && jsonMatch[0]) {
            try {
                const generatedItinerary = JSON.parse(jsonMatch[0]);
                userTripsRecord.trips[userTripsRecord.trips.length - 1] = generatedItinerary;
                await userTripsRecord.save();
                return res.status(200).json(generatedItinerary);
            } catch (parseError) {
                return res.status(500).json({ message: "AI response was not valid JSON", raw: text });
            }
        } else {
            return res.status(500).json({ message: "No JSON found in AI response", raw: text });
        }

    } catch (e) {
        console.error("AI Generation Error:", e);
        return res.status(e.status || 500).json({ 
            message: e.message || "Internal Server Error",
            error: e.stack 
        });
    }
}

module.exports = { getUserTripByEmail, addTrip, generateTrip };