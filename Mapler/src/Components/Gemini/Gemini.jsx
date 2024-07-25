import React, { useState, useEffect } from "react";
import './Gemini.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCity } from "../hook/useCity";
import loading from '../../assets/loading.gif';

export function Gemini() {
    const apiKey = '';
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const { city } = useCity();
    const [responseData, setResponseData] = useState(null);

    async function run(prompt) {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const response = result.response;
        console.log(response.text());
        setResponseData(formatData(response.text()));
    }

    //formatted using ChatGPT
    function formatData(data) {
        // Split data into lines
        const lines = data.split('\n');

        // Map over lines to replace **text** with <strong>text</strong> 
        const formattedLines = lines.map((line, index) => {
            const parts = line.split(/\*\*(.*?)\*\*/g); // Split by **text**
            return (
                <p key={index} style={{ margin: '0.5em 0' }}>
                    {parts.map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                </p>
            );
        });

        return formattedLines;
    }

    useEffect(() => {
        if (city) {
            setResponseData(null); // Reset responseData to null when city changes
            run(`Get the complete detail of ${city}, where is it situated, then detail of the country in which it is located.`);
        }
    }, [city]);

    return (
        <>
            {!city ? ( <div>
                <p className="click">👋 Click on a city name to get its details</p> <span>Click only city name</span>
                </div> ) : (
                <div className="gemini-container">
                    <h2>{city}</h2>
                    {responseData ? (
                        responseData
                    ) : (
                        <img src={loading} alt="Loading..." />
                    )}
                </div>
            )}
        </>
    );
}
