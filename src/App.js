import logo from "./logo.svg";
import "./App.css";
import Body from "./Components/Body.js";
import Footer from "./Components/Footer.js";
import Header from "./Components/Header.js";

function App() {
  return (
    <div
      style={{
        justifyContent: "center", // Center horizontally
        display: "flex",
        background: "pink",
        height: "100vh",
      }}
    >
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
