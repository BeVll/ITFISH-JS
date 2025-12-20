import React from "react";
import InputComponent from "./ui/InputComponent";
import Button from "./ui/Button";

export default function FirstComponent() {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h1>Login </h1>
        <InputComponent ph2="Email" />
        <InputComponent ph2="Password" />
        <Button text="Log in2" />
      </div>
    </div>
  );
}
