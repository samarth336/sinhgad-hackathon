import Barchart from "./Barchart";
import { useState } from "react";
import React from "react";

export default function News() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please enter some text to analyze.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://fake-news-detection-fjr4.onrender.com/verify-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news_query: text }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch from the backend");
      }

      const data = await res.json();
      setResponse(data.llama_response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (responseText) => {
    if (!responseText) return null;

    const [beforeJustification, afterJustification] = responseText.split("Justification:");

    const highlightedPart = beforeJustification.replace(/\b(Real|Fake)\b/gi, (match) => {
      const colorClass = match.toLowerCase() === "real" ? "text-green-500" : "text-red-500";
      return `<span class="${colorClass} font-bold">${match}</span>`;
    });

    return (
      <span>
        <span dangerouslySetInnerHTML={{ __html: highlightedPart }}></span>
        {afterJustification ? ` Justification:${afterJustification}` : ""}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Upload text to detect
        </h1>
        <h2 className="mt-3 text-3xl font-bold text-white">
          <span className="text-red-500">Fake</span> or{" "}
          <span className="text-green-500">Real</span>
        </h2>
      </div>

      <div className="mt-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <textarea
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 bg-gray-900 p-4"
              placeholder="Enter your text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-orange-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect"}
            </button>
          </div>
        </form>
      </div>

      {response && (
        <div>{
            
        response.toString().includes("Fake")==true?<Barchart data={[  { label: "Real", score: 25 },
  { label: "Fake", score: 75 }
]}></Barchart>:<Barchart data={[  { label: "Real", score: 75 },
  { label: "Fake", score: 25 }
]}></Barchart>

}
        <div className="mt-8 bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white">Response:</h3>
          <p className="text-white text-xl">{formatResponse(response)}</p>
        </div>
        </div>
      )}
    </div>
  );
}
