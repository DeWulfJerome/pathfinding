import React, { useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import ControlsContainer from './components/controls/ControlsContainer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  const visualizer = useRef();
  const [alterMode, setAlterMode] = useState('isWall');
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
      <PathfindingVisualizer
        ref={visualizer}
        alterMode={alterMode}
      ></PathfindingVisualizer>
    </AppContainer>
  );
}

export default App;
