import React, { useEffect, useState, useRef } from "react";
import { createGraph } from "../dataStructures/graph";
import styled from "styled-components";
import Node from "./Node";
import Dijkstra from "../algorithms/newDijkstra";
import * as _ from "lodash";

const GRAPH_ROWS = 10;
const GRAPH_COLS = 10;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${GRAPH_ROWS}, 80px);
  grid-template-columns: repeat(${GRAPH_COLS}, 80px);
`;

export default function TestGraph() {
  const [graphData, setgraphData] = useState();
  const [startNode, setStartNode] = useState("1-1");
  const [endNode, setEndNode] = useState("10-10");
  const [newGrid, setNewGrid] = useState(new Map());
  const [prevShortesPath, setPrevShortestPath] = useState([]);
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));

    buildMapGrid();
  }, []);

  const testDijkstra = () => {
    const newMapGrid = _.cloneDeep(newGrid);
    prevShortesPath.forEach((node) => {
      // nodeRefs.current.get(node).style.background = "transparent";
      const visitedNode = newMapGrid.get(node);
      visitedNode.isVisited = false;
    });
    const dijkstra = new Dijkstra(graphData, startNode, endNode);
    const shortestPath = dijkstra.findShortestPath();
    shortestPath.forEach((node) => {
      // nodeRefs.current.get(node).style.background = "orange";
      const visitedNode = newMapGrid.get(node);
      visitedNode.isVisited = true;
    });
    setNewGrid(newMapGrid);
    setPrevShortestPath(shortestPath);
  };

  const buildMapGrid = () => {
    const mapGrid = new Map();
    for (let row = 0; row < GRAPH_ROWS; row++) {
      for (let col = 0; col < GRAPH_COLS; col++) {
        const currentNode = createNode(col + 1, row + 1);
        if (row === GRAPH_ROWS - 1) {
          currentNode.lastRow = true;
        }
        if (col === GRAPH_COLS - 1) {
          currentNode.lastCol = true;
        }
        mapGrid.set(`${row + 1}-${col + 1}`, currentNode);
      }
    }
    setNewGrid(mapGrid);
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

  const renderMapNodes = () => {
    const nodes = [];
    newGrid.forEach((node) => {
      nodes.push(
        <Node
          key={`${node.row}-${node.col}`}
          nodeData={node}
          onNodeClick={(row, col) => {
            setStartNode(`${row}-${col}`);
          }}
          parentRef={(el) =>
            nodeRefs.current.set(`${node.row}-${node.col}`, el)
          }
        ></Node>
      );
    });
    return nodes;
  };
  return (
    <div>
      <Grid>{renderMapNodes()}</Grid>
      <button onClick={testDijkstra}>log graph</button>
    </div>
  );
}
