import logo from "./logo.svg";
import "./App.css";
import Body from "./Components/Body.js";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";
import { React, useState, useEffect } from "react";

function App() {
  const [textDone, setTextDone] = useState(false);

  useEffect(() => {
    if (textDone) {
      console.log("text is done");
    }
  }, [textDone]);

  return (
    <div
      style={{
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically

        display: "flex",
        background: "beige",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {textDone == false ? (
        <Header setTextDone={setTextDone} textDone={textDone} />
      ) : null}
      <Body />

      <Footer />
    </div>
  );
}

export default App;
