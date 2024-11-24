import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { useEffect, useState } from "react";
import AnimalPurpose from "../Data/AnimalPurposes.json";

export default function Body() {
  const URL = "https://teachablemachine.withgoogle.com/models/K31bjxpYW/";
  let model, webcam, labelContainer, maxPredictions;
  let requestId;
  const stringExample = "stringexample";
  const [initCalled, setInitCalled] = useState(false);
  const [randomPick, setRandomPick] = useState("");
  const [className, setClassName] = useState("");
  const [animal, setAnimal] = useState({
    animalName: "",
    attribute: "",
    manifest: "",
  });

  useEffect(() => {
    console.log("WEBBBBBBBBBB changed", webcam);
  }, [webcam]);

  useEffect(() => {
    if (className != "") {
      const cleanClassName = className.trim();
      console.log("classname is =", stringExample);

      const animalAttributesAndManifests = AnimalPurpose[cleanClassName];

      if (animalAttributesAndManifests) {
        const rp = animalAttributesAndManifests[Math.floor(Math.random() * 10)];
        console.log(rp);
        setRandomPick(rp);
      } else {
        console.error("miaw");
      }
    }
  }, [className]);

  async function init() {
    setInitCalled(true);
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  // async function init() {
  //   setInitCalled(true);
  //   const modelURL = URL + "model.json";
  //   const metadataURL = URL + "metadata.json";
  //   model = await tmImage.load(modelURL, metadataURL);
  //   maxPredictions = model.getTotalClasses();

  //   const flip = true; // whether to flip the webcam
  //   webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  //   await webcam.setup(); // request access to the webcam
  //   await webcam.play();
  //   window.requestAnimationFrame(loop);
  //   requestId = window.requestAnimationFrame(loop);

  //   document.getElementById("webcam-container").appendChild(webcam.canvas);
  //   labelContainer = document.getElementById("label-container");
  //   for (let i = 0; i < maxPredictions; i++) {
  //     labelContainer.appendChild(document.createElement("div"));
  //   }
  // }

  async function loop() {
    webcam.update(); // update the webcam frame
    console.log(webcam, "is updating <3 ");
    await predict();
    window.requestAnimationFrame(loop);
  }

  // async function predict() {
  //   const prediction = await model.predict(webcam.canvas);
  //   for (let i = 0; i < maxPredictions; i++) {
  //     const classPrediction =
  //       prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //     labelContainer.childNodes[i].innerHTML = classPrediction;
  //   }

  //   return prediction;
  // }

  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    return prediction;
  }

  async function snap() {
    try {
      if (webcam) {
        webcam.stop();
        const predics = await predict();

        let maxProb = -1;
        let maxClass = "";
        predics.forEach((element, i) => {
          const currentProb = element.probability.toLocaleString("fullwide", {
            useGrouping: false,
          });
          if (i - 1 >= 0) {
            if (currentProb > maxProb) {
              maxProb = currentProb; // Update max probability
              maxClass = element.className;
            }
            console.log(element);
          } else {
            maxProb = currentProb; // Update max probability
            maxClass = element.className;
          }
        });
        console.log(maxClass, " ", maxProb);

        setClassName(maxClass);
      } else {
        console.log("no webbiedebbie");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {" "}
      <button className="startButton" type="button" onClick={() => init()}>
        FIND YOUR DESTINY
      </button>
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={() => init()}
        style={{
          fontFamily: "'Rubik',sans-serif",
          fontSize: "30px",
          backgroundColor: "black",
        }}
      >
        FIND YOUR DESTINY
      </button> */}
      {initCalled ? (
        <button type="button" onClick={() => snap()}>
          SNAP
        </button>
      ) : null}
      <div id="webcam-container"></div>
      <div id="label-container"></div>
      {className != "" ? (
        <h1>You found your lifes purpose in {className}</h1>
      ) : null}
      {randomPick.attribute && randomPick.manifest ? (
        <div>
          <h1>Your reason to live is to : {randomPick.attribute}</h1>{" "}
          <h2> {randomPick.manifest}</h2>
        </div>
      ) : null}
    </div>
  );
}
