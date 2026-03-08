const { UserTrips } = require('../models/userTrips.models');
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
        
        if (!userTripsRecord || userTripsRecord.trips.length === 0) {
            return res.status(400).json({ message: 'No trip data found' });
        }

        const tripData = userTripsRecord.trips[userTripsRecord.trips.length - 1];
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

        if (!apiKey) throw new Error("GOOGLE_GEMINI_API_KEY is missing");

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3-flash-preview",
            generationConfig: { 
                responseMimeType: "application/json"
            }
        });

        const prompt = `Generate a ${tripData.days}-day travel itinerary for "${tripData.place}" for a "${tripData.type}" trip with a "${tripData.cost}" budget.
        Return a JSON object with this structure:
        {
          "destination": "${tripData.place}",
          "totalDays": ${tripData.days},
          "hotels": [{"name": "string", "price": "string", "rating": "string"}],
          "destinations": ["string"],
          "itinerary": [{"day": number, "activity": "string"}]
        }`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const generatedItinerary = JSON.parse(text);
        
        userTripsRecord.trips[userTripsRecord.trips.length - 1] = generatedItinerary;
        await userTripsRecord.save();

        return res.status(200).json({
            message: "Trips stored in DB successfully", 
            itinerary: generatedItinerary
        });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getUserTrips = async (req, res) => {
    try {
        const email = req.user.email;
        const userTrips = await UserTrips.findOne({ email });
        if (!userTrips) return res.status(404).json({ message: 'No trips found for this user' });
        return res.status(200).json({trips: userTrips.trips, key: process.env.UNSPLASH_ACCESS_KEY});
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = { addTrip, generateTrip, getUserTrips };