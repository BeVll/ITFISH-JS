import React from "react";
import CarListItem from "./CarListItem";

export default function List() {
  const cars = [
    "Audi",
    "Mercedes-Benz",
    "BMW",
    "Tesla",
    "Volvo",
    "Honda",
    "Renault",
    "Suzuki",
  ];

  return (
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      {cars.map((value, index) => (
        <CarListItem key={index} carName={value} carIndex={index} />
      ))}
    </div>
  );
}
