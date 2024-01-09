import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import startImage from "../assets/medium.svg";

function ImageGenerator() {
  const [imageURL, setImageURL] = useState("/");

  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Barer ...",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    let data = await response.json();
    let dataArray = data.data;
    setImageURL(dataArray[0].url);
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
          <div className="loading-bar"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see..."
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
