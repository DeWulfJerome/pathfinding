import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react';
import { createGraph } from '../dataStructures/graph';
import styled from 'styled-components';
import Dijkstra from '../algorithms/dijkstra';
import Astar from '../algorithms/astar';
import * as _ from 'lodash';
import Star from './nodes/Star';

let GRAPH_ROWS = 6;
let GRAPH_COLS = 6;
const NODE_SIZE = 35;
const ANIMATION_DELAY = 100;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${GRAPH_ROWS}, ${NODE_SIZE}px);
  grid-template-columns: repeat(${GRAPH_COLS}, ${NODE_SIZE}px);
  margin-left: auto;
  margin-right: auto;
  width: ${GRAPH_COLS * NODE_SIZE}px;
`;

const PathfindingVisualizer = forwardRef(({ alterMode, algo }, ref) => {
  useImperativeHandle(ref, () => ({
    visualizeAlgo() {
      runAlgorithm();
    }
  }));

  const [graphData, setgraphData] = useState(new Map());
  const [startNode, setStartNode] = useState('1-2');
  const [endNode, setEndNode] = useState('5-4');
  const container = useRef();
  const gridRef = useRef();

  useEffect(() => {
    window.addEventListener('resize', generateResponsiveGrid);
    generateResponsiveGrid();
    return function cleanup() {
      window.removeEventListener('resize', generateResponsiveGrid);
    };
  }, []);

  const generateResponsiveGrid = () => {
    const containerWidth = container.current.offsetWidth;
    const containerHeight = container.current.offsetHeight;
    const newColCount = Math.floor(containerWidth / NODE_SIZE);
    const newRowCount = Math.floor(containerHeight / NODE_SIZE);

    const newStartNode =
      String(Math.floor(newRowCount / 2)) +
      '-' +
      Math.floor(newColCount / 3 / 2);
    const newEndNode =
      String(Math.floor(newRowCount / 2)) +
      '-' +
      (newColCount - Math.floor(newColCount / 3 / 2));

    gridRef.current.style.gridTemplateColumns = `repeat(${newColCount}, ${NODE_SIZE}px)`;
    gridRef.current.style.gridTemplateRows = `repeat(${newRowCount}, ${NODE_SIZE}px)`;
    gridRef.current.style.width = `${newColCount * NODE_SIZE}px`;
    setgraphData(
      createGraph(newRowCount, newColCount, newStartNode, newEndNode)
    );
    setStartNode(newStartNode);
    setEndNode(newEndNode);
  };

  const runAlgorithm = () => {
    switch (algo) {
      case 'dijkstra':
        runDijkstra();
        break;
      case 'astar':
        runAstar();
        break;
      default:
        runDijkstra();
    }
  };

  const runAstar = async () => {
    const newGraphData = _.cloneDeep(graphData);
    newGraphData.forEach((node) => {
      node.isPath = false;
      node.isVisited = false;
    });
    setgraphData(newGraphData);

    const astar = new Astar(newGraphData, startNode, endNode);
    const {
      previousNodes,
      visitedNodesInOrder
    } = astar.getPreviousNodesAndVisitedNodesInOrder();

    if (previousNodes.get(endNode)) {
      const shortestPath = astar.findShortestPath(previousNodes);
      // Animate the search
      await animateSearch(visitedNodesInOrder);
      animatePath(shortestPath);
    } else {
      const newGraphData = _.cloneDeep(graphData);
      // Reset previous calculations
      newGraphData.forEach((node) => {
        node.isWall = false;
      });
      setgraphData(newGraphData);
      alert('End node is unreachable!');
    }
  };

  const runDijkstra = async () => {
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
      previousNodes,
      visitedNodesInOrder
    } = dijkstra.getDistancesAndPreviousNodes();
    if (previousNodes.get(endNode)) {
      const shortestPath = dijkstra.findShortestPath(previousNodes);
      // Animate the search
      await animateSearch(visitedNodesInOrder);
      animatePath(shortestPath);
    } else {
      const newGraphData = _.cloneDeep(graphData);
      // Reset previous calculations
      newGraphData.forEach((node) => {
        node.isWall = false;
      });
      setgraphData(newGraphData);
      alert('End node is unreachable!');
    }
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
    if (`${row}-${col}` !== startNode && `${row}-${col}` !== endNode) {
      graphWallNode.isWall = !graphWallNode.isWall;
    }
    setgraphData(newGraphData);
  };

  const changeNodeFunction = (alterMode, row, col) => {
    switch (alterMode) {
      case 'isWall':
        setWall(row, col);
        break;
      case 'isStart':
        setOtherStartNode(row, col);
        break;
      case 'isFinish':
        setOtherEndNode(row, col);
        break;
      default:
        setWall(row, col);
    }
  };

  const renderStars = () => {
    const nodes = [];
    graphData.forEach((node) => {
      nodes.push(
        <Star
          key={`${node.row}-${node.col}`}
          plantSize={NODE_SIZE}
          animationDelay={ANIMATION_DELAY}
          nodeData={node}
          onNodeClick={(row, col) => {
            changeNodeFunction(alterMode, row, col);
          }}
        ></Star>
      );
    });
    return nodes;
  };
  return (
    <div ref={container} style={{ flex: 1 }}>
      <Grid ref={gridRef}>{renderStars()}</Grid>
    </div>
  );
});

export default PathfindingVisualizer;
