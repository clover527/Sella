"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function AIImageGenerator() {
  const [style, setStyle] = useState("");
  const [subStyle, setSubStyle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const finalPrompt = prompt || "Generate a unique image.";
    const finalStyle = style ? `${style} style: ` : "";
    const finalSubStyle = subStyle ? `${subStyle}, ` : "";
    setLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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}`,
        },
        body: JSON.stringify({
          prompt: `${finalStyle}${finalSubStyle}${finalPrompt}`,
          model: "dall-e-3",
          n: 1,
          size: "1024x1024",
        }),
      });
      const data = await response.json();
      setImage(data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <h1 className="text-2xl font-bold">AI Image Generator</h1>
      <div className="grid grid-cols-2 gap-4">
        {["Photorealistic", "Webtoon/Anime", "Logo/Design", "Fantasy/Concept Art"].map((s) => (
          <Button key={s} onClick={() => setStyle(s)} variant={style === s ? "default" : "outline"}>
            {s}
          </Button>
        ))}
      </div>
      {style && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {["Detailed", "Minimalist", "Futuristic", "Vintage"].map((sub) => (
            <Button key={sub} onClick={() => setSubStyle(sub)} variant={subStyle === sub ? "default" : "outline"}>
              {sub}
            </Button>
          ))}
        </div>
      )}
      <Input
        placeholder="Optional: Describe your image (e.g., a futuristic city at night)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </Button>
      {image && (
        <Card className="mt-4">
          <CardContent>
            <img src={image} alt="Generated AI" className="w-full h-auto" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
