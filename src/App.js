import React from "react";
import "./App.css";
import TestGraph from "./test/TestGraph";
import ControlsContainer from "./components/controls/ControlsContainer";

function App() {
  return (
    <div className="App">
      <ControlsContainer></ControlsContainer>
      <TestGraph></TestGraph>
    </div>
  );
}

export default App;
