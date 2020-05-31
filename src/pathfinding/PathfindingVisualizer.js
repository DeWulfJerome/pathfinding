import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const colCount = 50;
const rowCount = 15;

let START_NODE_ROW = 2;
let START_NODE_COL = 5;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(${rowCount}, 20px);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${colCount}, 20px);
`;

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [clickMode, setClickMode] = useState("start");

  useEffect(() => {
    getInitialGrid();
  }, []);

  const getInitialGrid = () => {
    const nodeHolder = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        const currentNode = createNode(col, row);
        currentRow.push(currentNode);
      }
      nodeHolder.push(currentRow);
    }
    setGrid(nodeHolder);
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 30 * i);
    }
  };

  const renderNodes = () => {
    return grid.map((row, i) => {
      return (
        <Row key={i}>
          {row.map((node, i) => (
            <Node key={i} nodeData={node} onClick={alterGrid}></Node>
          ))}
        </Row>
      );
    });
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const alterGrid = (col, row) => {
    switch (clickMode) {
      case "wall":
        setWall(col, row);
        break;
      case "start":
        setEndpoints(col, row, "isStart");
        break;
      case "finish":
        setEndpoints(col, row, "isFinish");
        break;
    }
  };

  const setWall = (col, row) => {
    let newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      if (i === row) {
        for (let j = 0; j < newGrid[i].length; j++) {
          if (newGrid[i][j].col === col) {
            newGrid[i][j].isWall = !newGrid[i][j].isWall;
          } else if (newGrid[i][j].col > col) {
            break;
          }
        }
      } else if (i > row) {
        break;
      }
    }
    setGrid(newGrid);
  };

  const setEndpoints = (col, row, endpoint) => {
    let newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j][endpoint]) {
          newGrid[i][j][endpoint] = false;
        }
        if (newGrid[i][j].col === col && i === row) {
          newGrid[i][j][endpoint] = true;
          if (endpoint === "isStart") {
            START_NODE_ROW = row;
            START_NODE_COL = col;
          } else {
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
          }
        }
      }
    }
    setGrid(newGrid);
  };

  return (
    <div>
      <button onClick={() => setClickMode("start")}>Set Start</button>
      <button onClick={() => setClickMode("finish")}>Set Finish</button>
      <button onClick={() => setClickMode("wall")}>Set Wall</button>
      <Grid>{renderNodes()}</Grid>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
    </div>
  );
}
