import React, { useState } from "react";

export default function ProgressBar() {
  const [percentage, setPercentage] = useState(30);

  return (
    <div style={{ width: "300px" }}>
      <h1>Progress bar</h1>
      <div
        style={{
          backgroundColor: "#333333",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#bab30f",
            width: `${percentage == "" ? 0 : percentage}%`,
            transition: "width 1.5s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {percentage == "" ? 0 : percentage}%
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <span style={{ fontWeight: 600, marginRight: "10px" }}>
          Input Percentage:{" "}
        </span>
        <input
          value={percentage}
          onChange={(e) => {
            setPercentage(e.target.value);
          }}
          type="number"
        />
      </div>
    </div>
  );
}
