"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Sidebar } from "../components/ui/sidebar";

export default function Sella() {
  const [style, setStyle] = useState("");
  const [subStyle, setSubStyle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatMode, setChatMode] = useState(false);

  const handleGenerate = async () => {
    const finalPrompt = prompt || "Generate a unique image.";
    const finalStyle = style ? `${style} style: ` : "";
    const finalSubStyle = subStyle ? `${subStyle}, ` : "";
    setLoading(true);
    setChatMode(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `${finalStyle}${finalSubStyle}${finalPrompt}`,
          model: "dall-e-3",
          n: 1,
          size: "1024x1024",
        }),
      });
      const data = await response.json();
      const newImage = data.data[0].url;
      setImage(newImage);
      setImageHistory((prev) => [newImage, ...prev]);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex bg-white min-h-screen font-sans flex-col items-center justify-center">
      {/* Header */}
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Sella</h1>
      
      {/* Main Content */}
      {!chatMode ? (
        <div className="relative w-1/2">
          <Input
            placeholder="Describe what you want to generate"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 border rounded-full shadow-md text-lg text-center"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="absolute right-2 top-2 px-6 py-2 bg-blue-500 text-white rounded-full"
          >
            {loading ? "Generating..." : "🔍"}
          </Button>
        </div>
      ) : (
        <div className="w-1/2 p-6 border rounded-lg shadow-md bg-gray-50 text-center">
          <p className="text-gray-700 text-lg font-semibold">{prompt}</p>
          {loading && <p className="text-gray-500">⏳ Generating image, please wait...</p>}
          {image && (
            <Card className="mt-4">
              <CardContent>
                <img src={image} alt="Generated AI" className="w-full h-auto rounded-lg" />
                <Button className="mt-2 w-full bg-green-500 text-white" onClick={() => window.open(image, "_blank")}>
                  Download Image
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
