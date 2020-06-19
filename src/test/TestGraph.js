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
  const [graphData, setgraphData] = useState(new Map());
  const [startNode, setStartNode] = useState("2-2");
  const [endNode, setEndNode] = useState("7-7");
  const [prevShortesPath, setPrevShortestPath] = useState([]);
  const nodeRefs = useRef(new Map());

  useEffect(() => {
    setgraphData(createGraph(GRAPH_ROWS, GRAPH_COLS, startNode, endNode));
  }, []);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  const dijkstraReWrite = () => {
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
    animateSearch(visitedNodesInOrder).then(() => {
      console.log("Finished");
    });
  };

  const animateSearch = (visitedNodesInOrder) => {
    return new Promise((resolve, reject) => {
      const endNodeIndex = visitedNodesInOrder.findIndex(
        (val) => val === endNode
      );
      const animationFullDuration = endNodeIndex * ANIMATION_DELAY;
      // Set each graphNode contained in visitedNodesInOrder to isVisited = true
      for (let i = 0; i < endNodeIndex; i++) {
        setTimeout(() => {
          setgraphData((graphData) => {
            const newGraphData = _.cloneDeep(graphData);
            newGraphData.get(visitedNodesInOrder[i]).isVisited = true;
            return newGraphData;
          });
        }, i * ANIMATION_DELAY);
      }
      setTimeout(() => {
        resolve();
      }, animationFullDuration);
    });
  };

  const testDijkstra = () => {
    const newMapGrid = _.cloneDeep(graphData);
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
        setgraphData(newMapGrid);
        setPrevShortestPath(shortestPath);
      }, timeOut);
    } else {
      alert("you are stuck");
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
      <button onClick={dijkstraReWrite}>log graph</button>
    </div>
  );
}
