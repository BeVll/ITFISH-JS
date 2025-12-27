import React from "react";

export default function CarListItem(props) {
  function getNumberColor(position) {
    if (position == 1) return "#bf9800";
    else if (position == 2) return "#92877f";
    else if (position == 3) return "#cf8d4b";
    else return "#bab30f";
  }

  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "start",
        borderBottom: "1px solid #242424 ",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: getNumberColor(props.carIndex + 1),
          height: "40px",
          width: "40px",
          alignItems: "center",
        }}
      >
        {props.carIndex + 1}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0px 10px",
          alignItems: "center",
        }}
      >
        {props.carName}
      </div>
    </div>
  );
}
