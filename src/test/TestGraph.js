import React, { useEffect, useState } from "react";
import { createGraph } from "../dataStructures/graph";
import styled from "styled-components";
import Node from "./Node";

const GRAPH_ROWS = 4;
const GRAPH_COLS = 4;

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(${GRAPH_ROWS}, 30px);
  width: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRAPH_COLS}, 30px);
`;

export default function TestGraph() {
  const [graphData, setgraphData] = useState();
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));
    buildGrid();
  }, []);

  const buildGrid = () => {
    const nodeHolder = [];
    for (let row = 0; row < GRAPH_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRAPH_COLS; col++) {
        const currentNode = createNode(col, row);
        if (row === GRAPH_ROWS - 1) {
          currentNode.lastRow = true;
        }
        if (col === GRAPH_COLS - 1) {
          currentNode.lastCol = true;
        }
        currentRow.push(currentNode);
      }
      nodeHolder.push(currentRow);
    }
    setGrid(nodeHolder);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: false,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      lastCol: false,
      lastRow: false,
    };
  };

  const renderNodes = () => {
    return grid.map((row, i) => {
      return (
        <Row key={i}>
          {row.map((node, i) => (
            <Node key={i} nodeData={node}></Node>
          ))}
        </Row>
      );
    });
  };

  return <Grid>{renderNodes()}</Grid>;
}
