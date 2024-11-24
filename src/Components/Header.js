import { React, useState, useEffect } from "react";

export default function Headers() {
  const TEXTS = [
    "Tired of nihilism?",
    "Do you feel attached from the small things in life",
    "Try life purpose",
    "It easy!",
    "Click below to generate a tailored life purpose",
    "that fit your unique misunderstood personality",
  ];

  const texts = () => {
    return TEXTS.map((text) => {
      return <h1>{text}</h1>;
    });
  };
  return (
    <div
    // style={{
    //   display: "flex",
    //   justifyContent: "center", // Center horizontally
    //   alignItems: "center", // Center vertically
    //   height: "30vh",
    //   width: "30vh",
    // }}
    >
      {texts()}
    </div>
  );
}
