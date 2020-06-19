import React, { useRef } from "react";
import "./App.css";
import TestGraph from "./test/TestGraph";
import ControlsContainer from "./components/controls/ControlsContainer";

function App() {
  const visualizer = useRef();
  const visualize = (algoType) => {
    visualizer.current.visualizeAlgo();
  };
  return (
    <>
      <ControlsContainer visualize={visualize}></ControlsContainer>
      <TestGraph ref={visualizer}></TestGraph>
    </>
  );
}

export default App;
