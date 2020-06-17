import React, { useEffect, useState, useRef, ReactDOM } from 'react';
import { createGraph } from '../dataStructures/graph';
import styled from 'styled-components';
import Node from './Node';
import Dijkstra from '../algorithms/newDijkstra';
import * as _ from 'lodash';

const GRAPH_ROWS = 10;
const GRAPH_COLS = 10;
const PLANT_SIZE = 40;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${GRAPH_ROWS}, ${PLANT_SIZE}px);
  grid-template-columns: repeat(${GRAPH_COLS}, ${PLANT_SIZE}px);
`;

export default function TestGraph() {
  const [graphData, setgraphData] = useState();
  const [startNode, setStartNode] = useState('1-2');
  const [endNode, setEndNode] = useState('8-9');
  const [newGrid, setNewGrid] = useState(new Map());
  const [prevShortesPath, setPrevShortestPath] = useState([]);
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));
    buildMapGrid();
  }, []);

  const testDijkstra = () => {
    nodeRefs.current.forEach((node) => {
      node.classList.remove('visited');
    });
    const dijkstra = new Dijkstra(graphData, startNode, endNode);
    const {
      distances,
      previousNodes,
      visitedNodesInOrder
    } = dijkstra.getDistancesAndPreviousNodes();
    const shortestPath = dijkstra.findShortestPath(previousNodes);
    const timeOut = visitedNodesInOrder.length * 20;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        nodeRefs.current.get(visitedNodesInOrder[i]).classList.add('visited');
      }, i * 20);

      if (visitedNodesInOrder[i] === endNode) {
        break;
      }
    }
    setTimeout(() => {
      const newMapGrid = _.cloneDeep(newGrid);
      prevShortesPath.forEach((node) => {
        // nodeRefs.current.get(node).style.background = "transparent";
        const visitedNode = newMapGrid.get(node);
        visitedNode.isPath = false;
      });
      shortestPath.forEach((node) => {
        // nodeRefs.current.get(node).style.background = "orange";
        const visitedNode = newMapGrid.get(node);
        visitedNode.isPath = true;
      });
      setNewGrid(newMapGrid);
      setPrevShortestPath(shortestPath);
    }, timeOut);
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
      isStart: startNode === `${row}-${col}` ? true : false,
      isFinish: endNode === `${row}-${col}` ? true : false,
      distance: Infinity,
      isVisited: false,
      isPath: false,
      isWall: false,
      previousNode: null,
      lastCol: false,
      lastRow: false
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

  const renderMapNodes = () => {
    const nodes = [];
    newGrid.forEach((node) => {
      nodes.push(
        <Node
          key={`${node.row}-${node.col}`}
          plantsize={PLANT_SIZE}
          nodeData={node}
          onNodeClick={(row, col) => {
            setOtherStartNode(row, col);
            // setOtherEndNode(row, col);
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
