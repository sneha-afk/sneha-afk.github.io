import { useState } from "react";
import { PageLayout } from "@components";

function NotFoundPage() {
  const [emoji, setEmoji] = useState("🛸");
  const emojis = [
    "🛸",
    "👾",
    "🚀",
    "🤖",
    "🌌",
    "🪐",
    "⭐",
    "🌠",
    "🛰️",
    "☄️",
    "👽",
    "🧑‍🚀",
    "🪐",
    "🛸",
    "🌟",
    "✨",
    "💫",
  ];

  const randomEmoji = () => {
    let next = emojis[Math.floor(Math.random() * emojis.length)];
    while (next === emoji) {
      next = emojis[Math.floor(Math.random() * emojis.length)];
    }
    setEmoji(next);
  };

  return (
    <PageLayout>
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
        }}
      >
        <h1 style={{ marginBottom: "1.5rem" }}>oops, that doesn't exist :(</h1>

        <div
          onClick={randomEmoji}
          style={{
            fontSize: "5rem",
            cursor: "pointer",
            display: "inline-block",
            margin: "0 10px",
            userSelect: "none",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {emoji}
        </div>

        <div style={{ marginTop: "0.5rem", fontSize: "1rem", color: "#666" }}>
          you can click that
        </div>

        <p style={{ marginTop: "0.5rem", fontSize: "1.25rem" }}>
          let's <a href="/">head back home</a>
        </p>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          `}
        </style>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;
