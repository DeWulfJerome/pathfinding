import React, { useRef, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TestGraph from "./test/TestGraph";
import ControlsContainer from "./components/controls/ControlsContainer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

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
    <AppContainer>
      <ControlsContainer
        visualize={visualize}
        onChangeAlterMode={onChangeAlterMode}
      ></ControlsContainer>
      <TestGraph ref={visualizer} alterMode={alterMode}></TestGraph>
    </AppContainer>
  );
}

export default App;
