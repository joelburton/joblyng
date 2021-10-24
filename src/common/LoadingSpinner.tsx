import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API user. */

function LoadingSpinner() {
  console.info("* LoadingSpinner");

  return (
      <div className="LoadingSpinner">Loading ...</div>
  );
}

export default LoadingSpinner;