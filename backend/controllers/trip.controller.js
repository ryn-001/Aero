const { UserTrips } = require('../models/userTrips.models');
const { GoogleGenAI } = require("@google/genai");

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
        const tripData = userTripsRecord?.trips[userTripsRecord.trips.length - 1];

        if (!tripData) return res.status(400).json({ message: 'No trip data found' });

        const ai = new GoogleGenAI({ 
            apiKey: process.env.GOOGLE_GEMINI_API_KEY,
            apiVersion: 'v1' 
        });

        const prompt = `Generate a ${tripData.days}-day travel itinerary for "${tripData.place}" for a "${tripData.type}" trip with a "${tripData.cost}" budget.
        Return ONLY valid JSON in this schema:
        {
          "destination": "${tripData.place}",
          "totalDays": ${tripData.days},
          "hotels": [],
          "destinations": [],
          "itinerary": []
        }`;

        const response = await ai.models.generateContent({
            model: "models/gemini-2.5-flash", 
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });
        
        const text = typeof response.text === 'function' ? response.text() : 
                     (response.text || response.candidates?.[0]?.content?.parts?.[0]?.text);
        
        if (!text) throw new Error("AI returned no content");

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const generatedItinerary = JSON.parse(jsonMatch[0]);
            cohnsole.log(generatedItinerary);
            userTripsRecord.trips[userTripsRecord.trips.length - 1] = generatedItinerary;
            await userTripsRecord.save();
            return res.status(200).json({message: "Trips stored in DB successfully"});
        } else {
            throw new Error("Invalid JSON structure from AI");
        }

    } catch (e) {
        console.error("Error generating trip:", e);
        return res.status(500).json({ message: e.message });
    }

}

const getUserTrips = async (req, res) => {
    try{

        const email = req.user.email;
        const userTrips = await UserTrips.findOne({ email });
        if (!userTrips) return res.status(404).json({ message: 'No trips found for this user' });
        return res.status(200).json({trips: userTrips.trips, key: process.env.UNSPLASH_ACCESS_KEY});
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

module.exports = { addTrip, generateTrip, getUserTrips};