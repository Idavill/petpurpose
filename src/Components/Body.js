import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { useEffect, useState } from "react";
import AnimalPurpose from "../Data/AnimalPurposes.json";

export default function Body() {
  const URL = "https://teachablemachine.withgoogle.com/models/K31bjxpYW/";
  const stringExample = "stringexample";
  const [webcamReady, setWebcamReady] = useState(false);
  const [model, setModel] = useState(false);
  const [labelContainer, setLabelContainer] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(false);
  const [webCam, setWebcam] = useState(null);
  const [initCalled, setInitCalled] = useState(false);
  const [randomPick, setRandomPick] = useState("");
  const [className, setClassName] = useState("");
  const [animal, setAnimal] = useState({
    animalName: "",
    attribute: "",
    manifest: "",
  });

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
    if (!webCam) {
      setInitCalled(true);
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      let m = await tmImage.load(modelURL, metadataURL);
      let mp = m.getTotalClasses();

      setMaxPredictions(mp);
      setModel(m);

      const flip = true; // whether to flip the webcam
      const newWebcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
      setWebcam(newWebcam);
    }
  }

  const appendWebCamElements = async (wc) => {
    await wc.setup(); // request access to the webcam
    await wc.play();

    console.log("wc = ", wc);
    document.getElementById("webcam-container").appendChild(wc.canvas);
    let lc = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      lc.appendChild(document.createElement("div"));
    }

    setLabelContainer(lc);
    setWebcamReady(true);
    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    if ((webCam, maxPredictions)) {
      appendWebCamElements(webCam);
    }
  }, [webCam, maxPredictions]);

  async function loop() {
    if (webCam) {
      webCam.update(); // update the webcam frame
    }
    //await predict(webCam);
    window.requestAnimationFrame(loop);
  }

  async function predict(wc) {
    const prediction = await model.predict(wc.canvas);
    return prediction;
  }

  async function snap() {
    if (webCam) {
      const predics = await predict(webCam);
      webCam.stop();

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
  }

  return (
    <div>
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
      {webCam ? (
        <button type="button" onClick={() => snap()} disabled={!webcamReady}>
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
