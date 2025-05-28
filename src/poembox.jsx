import './poembox.css';
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function PoemBox() {
  const [response, setResponse] = useState("AIzaSyAEQ1HZ_BKJNzy236d0AIKce1yNulG0D4Y");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPoem = async () => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyAEQ1HZ_BKJNzy236d0AIKce1yNulG0D4Y");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "write me a 50 word poem in the tone of milk and honey by rupi kaur.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPoem(); // Fetch a poem on initial render

    const poemIntervalId = setInterval(fetchPoem, 30000); // Fetch a new poem every 30 seconds
    const clockIntervalId = setInterval(() => setCurrentTime(new Date()), 1000); // Update clock every second

    return () => {
      clearInterval(poemIntervalId); // Cleanup poem interval on component unmount
      clearInterval(clockIntervalId); // Cleanup clock interval on component unmount
    };
  }, []);

  return (
    <div className="poem-box">
      {error ? <p>{error}</p> : <p>{response}</p>}
      
    </div>
  );

}