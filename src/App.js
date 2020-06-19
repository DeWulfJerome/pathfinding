import React, { useRef, useState } from "react";
import "./App.css";
import TestGraph from "./test/TestGraph";
import ControlsContainer from "./components/controls/ControlsContainer";

function App() {
  const visualizer = useRef();
  const [alterMode, setAlterMode] = useState("isWall");
  const visualize = (algoType) => {
    visualizer.current.visualizeAlgo();
  };
  const onChangeAlterMode = (mode) => {
    setAlterMode(mode);
  };
  return (
    <>
      <ControlsContainer
        visualize={visualize}
        onChangeAlterMode={onChangeAlterMode}
      ></ControlsContainer>
      <TestGraph ref={visualizer} alterMode={alterMode}></TestGraph>
    </>
  );
}

export default App;
