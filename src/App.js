import React from "react";
import "./App.css";
import PathfindingVisualizer from "./pathfinding/PathfindingVisualizer";
import TestGraph from "./test/TestGraph";

function App() {
  return (
    <div className="App">
      {/* <PathfindingVisualizer></PathfindingVisualizer> */}
      <TestGraph></TestGraph>
    </div>
  );
}

export default App;
