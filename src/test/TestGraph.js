import React, { useEffect, useState, useRef } from 'react';
import { createGraph } from '../dataStructures/graph';
import styled from 'styled-components';
import Node from './Node';
import Dijkstra from '../algorithms/newDijkstra';

const GRAPH_ROWS = 7;
const GRAPH_COLS = 8;

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
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS));
    buildGrid();
  }, []);

  const testDijkstra = () => {
    const dijkstra = new Dijkstra(graphData, '1-1', '7-3');
    const shortestPath = dijkstra.findShortestPath();
    shortestPath.forEach((node) => {
      nodeRefs.current.get(node).style.background = 'orange';
    });
  };

  const buildGrid = () => {
    const nodeHolder = [];
    for (let row = 0; row < GRAPH_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRAPH_COLS; col++) {
        const currentNode = createNode(col + 1, row + 1);
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
      lastRow: false
    };
  };

  const renderNodes = () => {
    return grid.map((row, i) => {
      return (
        <Row key={i}>
          {row.map((node, i) => (
            <Node
              key={i}
              nodeData={node}
              parentRef={(el) =>
                nodeRefs.current.set(`${node.row}-${node.col}`, el)
              }
            ></Node>
          ))}
        </Row>
      );
    });
  };

  return (
    <div>
      <Grid>{renderNodes()}</Grid>
      <button onClick={testDijkstra}>log graph</button>
    </div>
  );
}
