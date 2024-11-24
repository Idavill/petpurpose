import { React, useState, useEffect } from "react";
import "./Components.css";

export default function Headers(props) {
  const TEXTS = [
    "Tired of nihilism?",
    "Do you feel attached from the small things in life",
    "Try life purpose",
    "It easy!",
    "Click below to generate a tailored life purpose",
    "that fit your unique misunderstood personality",
  ];
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("text ", text);
  }, [text]);

  useEffect(() => {
    if (counter > TEXTS.length - 1) {
      props.setTextDone(true);
    }
    setText(TEXTS[counter]);
    console.log("Counter ", counter);
  }, [counter]);

  const nextText = () => {
    setCounter(counter + 1);
  };

  //   const texts = () => {
  //     return TEXTS.map((text) => {
  //       return <h1 className="fadeintext">{text}</h1>;
  //     });
  //   };

  function hover(element) {
    element.setAttribute("src", require("../Assets/Magenta arrow.png"));
  }

  function unhover(element) {
    element.setAttribute("src", require("../Assets/Black arrow.png"));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
        <h1 className="fadeintext">{text}</h1>
      </div>
      <div style={{ position: "absolute", bottom: "300px" }}>
        {/* <button className="fadebutton" onClick={() => nextText()}>
          YES!
        </button> */}
        {/* <button style="background: url('../Assets/Black arrow.png')" /> */}
        <input
          type="image"
          src={require("../Assets/Black arrow.png")}
          onClick={() => nextText()}
          //   onmouseover={() => hover(this)}
          //   onmouseout={() => unhover(this)}
        />
      </div>
    </div>
  );
}
