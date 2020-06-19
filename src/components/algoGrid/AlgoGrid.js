import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GRAPH_ROWS = 8;
const GRAPH_COLS = 8;
const PLANT_SIZE = 60;
const ANIMATION_DELAY = 50;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${GRAPH_ROWS}, ${PLANT_SIZE}px);
  grid-template-columns: repeat(${GRAPH_COLS}, ${PLANT_SIZE}px);
  margin-left: auto;
  margin-right: auto;
  width: ${GRAPH_ROWS * PLANT_SIZE}px;
`;

export default function AlgoGrid() {
  const [graphData, setgraphData] = useState();
  const [newGrid, setNewGrid] = useState(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));
    setNewGrid(buildMapGrid(GRAPH_ROWS, GRAPH_COLS));
  }, []);

  const renderStars = () => {
    const nodes = [];
    newGrid.forEach((node) => {
      nodes.push(
        <Star
          key={`${node.row}-${node.col}`}
          plantsize={PLANT_SIZE}
          nodeData={node}
          onNodeClick={(row, col) => {
            // setOtherStartNode(row, col);
            // setOtherEndNode(row, col);
            setWall(row, col);
          }}
          parentRef={(el) =>
            nodeRefs.current.set(`${node.row}-${node.col}`, el)
          }
        ></Star>
      );
    });
    return nodes;
  };

  return (
    <div style={{ background: "#111830" }}>
      <Grid>{renderStars()}</Grid>
    </div>
  );
}
