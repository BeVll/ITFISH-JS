import React from "react";

export default function InputComponent(props) {
  return (
    <input
      style={{
        border: "2px solid black",
        padding: "10px",
        borderRadius: "10px",
        fontSize: "28px",
      }}
      placeholder={props.ph2}
    />
  );
}
