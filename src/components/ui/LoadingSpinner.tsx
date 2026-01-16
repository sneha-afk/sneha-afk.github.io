import React from "react";
import "@styles/components/_loading.scss";

interface LoadingSpinnerProps {
  text?: string;
  fullscreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text, fullscreen = true }) => (
  <div className={fullscreen ? "loading loading-fullscreen" : "loading"}>
    <div className="loading-spinner-wheel" />
    {text && <p className="loading-text">{text}</p>}
  </div>
);

export default LoadingSpinner;
