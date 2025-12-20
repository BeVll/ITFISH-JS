import React from "react";

export default function Button(props) {
  return (
    <button style={{ padding: "10px", backgroundColor: "red" }}>
      {props.text}
    </button>
  );
}
