import React, { useEffect, useState, useRef } from "react";
import { createGraph } from "../dataStructures/graph";
import styled from "styled-components";
import Node from "./Node";
import Dijkstra from "../algorithms/newDijkstra";
import * as _ from "lodash";
import Star from "../components/nodes/Star";

const GRAPH_ROWS = 20;
const GRAPH_COLS = 20;
const PLANT_SIZE = 35;
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
  const [graphData, setgraphData] = useState(new Map());
  const [startNode, setStartNode] = useState("2-2");
  const [endNode, setEndNode] = useState("7-7");
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS, startNode, endNode));
  }, []);

  const dijkstraReWrite = async () => {
    const newGraphData = _.cloneDeep(graphData);
    // Reset previous calculations
    newGraphData.forEach((node) => {
      node.isPath = false;
      node.isVisited = false;
    });
    setgraphData(newGraphData);
    // Instantiate Dijkstra
    const dijkstra = new Dijkstra(newGraphData, startNode, endNode);
    const {
      distances,
      previousNodes,
      visitedNodesInOrder,
    } = dijkstra.getDistancesAndPreviousNodes();
    const shortestPath = dijkstra.findShortestPath(previousNodes);
    // Animate the search
    await animateSearch(visitedNodesInOrder);
    animatePath(shortestPath);
  };

  const animateSearch = (visitedNodesInOrder) => {
    return new Promise((resolve, reject) => {
      const endNodeIndex = visitedNodesInOrder.findIndex(
        (val) => val === endNode
      );
      // Set each graphNode contained in visitedNodesInOrder to isVisited = true
      for (let i = 0; i < endNodeIndex; i++) {
        setTimeout(() => {
          setgraphData((graphData) => {
            const newGraphData = _.cloneDeep(graphData);
            newGraphData.get(visitedNodesInOrder[i]).isVisited = true;
            return newGraphData;
          });
          if (i === endNodeIndex - 1) {
            resolve();
          }
        }, i * ANIMATION_DELAY);
      }
    });
  };

  const animatePath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        setgraphData((graphData) => {
          const newGraphData = _.cloneDeep(graphData);
          newGraphData.get(shortestPath[i]).isPath = true;
          return newGraphData;
        });
      }, i * ANIMATION_DELAY);
    }
  };

  const setOtherStartNode = (row, col) => {
    const newGraphData = _.cloneDeep(graphData);
    const prevStartNode = newGraphData.get(startNode);
    prevStartNode.isStart = false;
    const newStartNode = newGraphData.get(`${row}-${col}`);
    newStartNode.isStart = true;
    setStartNode(`${row}-${col}`);
    setgraphData(newGraphData);
  };

  const setOtherEndNode = (row, col) => {
    const newGraphData = _.cloneDeep(graphData);
    const prevEndNode = newGraphData.get(endNode);
    prevEndNode.isFinish = false;
    const newEndNode = newGraphData.get(`${row}-${col}`);
    newEndNode.isFinish = true;
    setEndNode(`${row}-${col}`);
    setgraphData(newGraphData);
  };

  const setWall = (row, col) => {
    const newGraphData = _.cloneDeep(graphData);
    const graphWallNode = newGraphData.get(`${row}-${col}`);
    graphWallNode.isWall = !graphWallNode.isWall;
    setgraphData(newGraphData);
  };

  const renderMapNodes = () => {
    const nodes = [];
    graphData.forEach((node) => {
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
    graphData.forEach((node) => {
      nodes.push(
        <Star
          key={`${node.row}-${node.col}`}
          plantSize={PLANT_SIZE}
          animationDelay={ANIMATION_DELAY}
          nodeData={node}
          onNodeClick={(row, col) => {
            // setOtherStartNode(row, col);
            // setOtherEndNode(row, col);
            setWall(row, col);
          }}
        ></Star>
      );
    });
    return nodes;
  };
  return (
    <div style={{ background: "#111830" }}>
      <Grid>{renderStars()}</Grid>
      <button onClick={dijkstraReWrite}>log graph</button>
    </div>
  );
}
