import { useState } from "react";
// Import the new SDK
import { GoogleGenAI } from "@google/genai";

// Initialize with the new Client structure
const ai = new GoogleGenAI({ apiKey: "AIzaSyAOG8ETbRLH2fTvtqoIlOwzrN_swfGDrEw" });

export default function Trip() {
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState(null);

  const generateTrip = async () => {
    setLoading(true);
    try {
      // 1. Use the 2026 model ID: "gemini-3-flash-preview"
      // 2. Note: generateContent is now called on ai.models
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a 7-day trip plan for Finland in JSON format...",
        config: {
          // Gemini 3 uses thinking levels. MINIMAL is best for simple JSON tasks
          thinkingConfig: { thinkingLevel: "MINIMAL" }
        }
      });

      const text = response.text; // Note: new SDK uses .text directly, not .text()
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setTripData(JSON.parse(jsonMatch[0]));
      }
    } catch (error) {
      console.error("Error Status:", error.status); // 404, 403, etc.
      console.error("Error Message:", error.message);
    } finally {
      setLoading(false);
      console.log(tripData);
    }
  };

  return (
    <div style={{marginTop:"4rem"}}>
       <button onClick={generateTrip} disabled={loading}>
         {loading ? "Planning..." : "Plan Trip"}
       </button>
    </div>
  );
}