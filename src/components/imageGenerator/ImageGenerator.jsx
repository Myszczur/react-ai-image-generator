import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import startImage from "../assets/medium.svg";

function ImageGenerator() {
  const [imageURL, setImageURL] = useState("/");
  const [loading, setLoading] = useState(false);

  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);

    const API_URL = "https://api.openai.com/v1/images/generations";
    const BEARER_TOKEN = process.env.OPENAI_API_KEY;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      const dataArray = data.data;
      if (dataArray && dataArray.length > 0) {
        setImageURL(dataArray[0].url);
      } else {
        throw new Error("No image URL found in the response data.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Błąd zapytania:", error);
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={imageURL === "/" ? startImage : imageURL}
            alt="start_image"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see..."
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
