import React, { useEffect, useState, useRef } from "react";
import { createGraph } from "../dataStructures/graph";
import styled from "styled-components";
import Node from "./Node";
import Dijkstra from "../algorithms/newDijkstra";
import * as _ from "lodash";
import Star from "../components/nodes/Star";

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

export default function TestGraph() {
  const [graphData, setgraphData] = useState();
  const [newGrid, setNewGrid] = useState(new Map());
  const [startNode, setStartNode] = useState("2-2");
  const [endNode, setEndNode] = useState("7-7");
  const [prevShortesPath, setPrevShortestPath] = useState([]);
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));
    setNewGrid(buildMapGrid(GRAPH_ROWS, GRAPH_COLS));
  }, []);

  const testDijkstra = () => {
    const newMapGrid = _.cloneDeep(newGrid);
    prevShortesPath.forEach((node) => {
      const visitedNode = newMapGrid.get(node);
      visitedNode.isPath = false;
      visitedNode.isVisited = false;
    });

    nodeRefs.current.forEach((node) => {
      node.classList.remove("visited");
    });
    const dijkstra = new Dijkstra(graphData, startNode, endNode);
    const {
      distances,
      previousNodes,
      visitedNodesInOrder,
    } = dijkstra.getDistancesAndPreviousNodes();
    if (distances) {
      const shortestPath = dijkstra.findShortestPath(previousNodes);

      const endNodeIndex = visitedNodesInOrder.findIndex(
        (val) => val === endNode
      );

      const timeOut = endNodeIndex * ANIMATION_DELAY;
      for (let i = 0; i < endNodeIndex; i++) {
        setTimeout(() => {
          nodeRefs.current.get(visitedNodesInOrder[i]).classList.add("visited");
        }, i * ANIMATION_DELAY);

        if (visitedNodesInOrder[i] === endNode) {
          break;
        }
      }
      setTimeout(() => {
        shortestPath.forEach((node) => {
          const visitedNode = newMapGrid.get(node);
          visitedNode.isPath = true;
          visitedNode.isVisited = true;
        });
        setNewGrid(newMapGrid);
        setPrevShortestPath(shortestPath);
      }, timeOut);
    } else {
      alert("you are stuck");
    }
  };

  const buildMapGrid = (GRAPH_ROWS, GRAPH_COLS) => {
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
    return mapGrid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: startNode === `${row}-${col}` ? true : false,
      isFinish: endNode === `${row}-${col}` ? true : false,
      distance: Infinity,
      isVisited: false,
      isPath: false,
      isWall: false,
      previousNode: null,
      lastCol: false,
      lastRow: false,
    };
  };

  const setOtherStartNode = (row, col) => {
    const newMapGrid = _.cloneDeep(newGrid);
    const prevStartNode = newMapGrid.get(startNode);
    prevStartNode.isStart = false;
    const newStartNode = newMapGrid.get(`${row}-${col}`);
    newStartNode.isStart = true;
    setStartNode(`${row}-${col}`);
    setNewGrid(newMapGrid);
  };

  const setOtherEndNode = (row, col) => {
    const newMapGrid = _.cloneDeep(newGrid);
    const prevEndNode = newMapGrid.get(endNode);
    prevEndNode.isFinish = false;
    const newEndNode = newMapGrid.get(`${row}-${col}`);
    newEndNode.isFinish = true;
    setEndNode(`${row}-${col}`);
    setNewGrid(newMapGrid);
  };

  const setWall = (row, col) => {
    const newGraphData = _.cloneDeep(graphData);
    const newMapGrid = _.cloneDeep(newGrid);
    const graphWallNode = newGraphData.get(`${row}-${col}`);
    const gridWallNode = newMapGrid.get(`${row}-${col}`);
    graphWallNode.isWall = !graphWallNode.isWall;
    gridWallNode.isWall = !gridWallNode.isWall;
    setgraphData(newGraphData);
    setNewGrid(newMapGrid);
  };

  const renderMapNodes = () => {
    const nodes = [];
    newGrid.forEach((node) => {
      nodes.push(
        <Node
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
        ></Node>
      );
    });
    return nodes;
  };

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
      <button onClick={testDijkstra}>log graph</button>
    </div>
  );
}
