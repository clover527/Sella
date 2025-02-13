"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Sidebar } from "../components/ui/sidebar";

export default function AIImageGenerator() {
  const [style, setStyle] = useState("");
  const [subStyle, setSubStyle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleGenerate = async () => {
    const finalPrompt = prompt || "Generate a unique image.";
    const finalStyle = style ? `${style} style: ` : "";
    const finalSubStyle = subStyle ? `${subStyle}, ` : "";
    setLoading(true);
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
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-16 flex-shrink-0 bg-gray-100 min-h-screen p-4 flex flex-col">
        <Button onClick={() => setShowSidebar(!showSidebar)}>☰</Button>
        {showSidebar && <Sidebar setStyle={setStyle} setSubStyle={setSubStyle} />}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-grow space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-800">AI Image Generator</h1>
        <div className="relative w-3/4">
          <Input
            placeholder="Describe what you want to generate"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 border rounded-full shadow-md text-lg"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            {loading ? "Generating..." : "🔍"}
          </Button>
        </div>
        {loading && <p className="text-gray-500">⏳ Generating image, please wait...</p>}
        {image && (
          <Card className="mt-4 w-3/4">
            <CardContent>
              <img src={image} alt="Generated AI" className="w-full h-auto rounded-lg" />
              <Button className="mt-2 w-full bg-green-500 text-white" onClick={() => window.open(image, "_blank")}>
                Download Image
              </Button>
            </CardContent>
          </Card>
        )}
        {imageHistory.length > 0 && (
          <div className="mt-6 w-3/4">
            <h2 className="text-xl font-semibold">Previous Images</h2>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {imageHistory.slice(1, 4).map((img, index) => (
                <img key={index} src={img} alt="Generated AI" className="w-full h-auto rounded-lg border" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
