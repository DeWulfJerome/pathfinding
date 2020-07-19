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
  const [algo, setAlgo] = useState('dijkstra');
  const visualize = (algoType) => {
    visualizer.current.visualizeAlgo();
  };
  const onChangeAlterMode = (mode) => {
    setAlterMode(mode);
  };
  const onChangeAlgo = (newAlgo) => {
    setAlgo(newAlgo);
  };
  return (
    <AppContainer>
      <ControlsContainer
        visualize={visualize}
        onChangeAlterMode={onChangeAlterMode}
        onChangeAlgo={onChangeAlgo}
      ></ControlsContainer>
      <PathfindingVisualizer
        ref={visualizer}
        alterMode={alterMode}
        algo={algo}
      ></PathfindingVisualizer>
    </AppContainer>
  );
}

export default App;
