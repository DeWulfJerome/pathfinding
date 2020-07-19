import {
  diagonalEdgeDistance,
  horvertEdgeDistance
} from '../dataStructures/graph';
import * as _ from 'lodash';
import Dijkstra from './dijkstra';

export default class Astar extends Dijkstra {
  constructor(graph, startNode, finishNode) {
    super(graph, startNode, finishNode);
  }

  getPreviousNodesAndVisitedNodesInOrder() {
    const unvisitedNodes = _.cloneDeep(this.graph);
    // Set dinstance heuristic on all nodes
    for (const [key, value] of unvisitedNodes.entries()) {
      const node = value;
      node.distanceHeuristic = this.calculateDistanceHeuristic(key);
      unvisitedNodes.set(key, node);
    }
    // Set the starting node distance to 0.
    const startNode = unvisitedNodes.get(this.startNode);
    startNode.distance = 0;
    const previousNodes = new Map();
    const distanceToNodes = new Map();
    const visitedNodesInOrder = [];

    while (unvisitedNodes.size) {
      // Visit the node with the smalles f cost
      const currentNode = this.getNodeWithLowestFCost(unvisitedNodes);
      // If the distance to the closest node is still Infinity
      // all remaining nodes are unreachable and we should stop the loop.
      if (currentNode[1].distance === Infinity) {
        // Clear all remaining unvisitedNodes.
        unvisitedNodes.clear();
        break;
      }
      // Skip node if its a wall
      if (currentNode[1].isWall) {
        unvisitedNodes.delete(currentNode[0]);
        continue;
      }

      this.checkNeighbours(
        currentNode,
        unvisitedNodes,
        previousNodes,
        visitedNodesInOrder,
        distanceToNodes
      );
    }

    return {
      previousNodes,
      visitedNodesInOrder
    };
  }

  calculateDistanceHeuristic(fromNode) {
    const fromCoordNumbers = fromNode.split('-').map((str) => parseInt(str));
    const toCoordNumbers = this.finishNode
      .split('-')
      .map((str) => parseInt(str));

    let lowRow =
      fromCoordNumbers[0] < toCoordNumbers[0]
        ? fromCoordNumbers[0]
        : toCoordNumbers[0];
    let lowCol =
      fromCoordNumbers[1] < toCoordNumbers[1]
        ? fromCoordNumbers[1]
        : toCoordNumbers[1];

    let highRow =
      fromCoordNumbers[0] > toCoordNumbers[0]
        ? fromCoordNumbers[0]
        : toCoordNumbers[0];
    let highCol =
      fromCoordNumbers[1] > toCoordNumbers[1]
        ? fromCoordNumbers[1]
        : toCoordNumbers[1];

    let totalDistance = 0;

    while (lowRow !== highRow || lowCol !== highCol) {
      if (lowRow !== highRow && lowCol !== highCol) {
        // Move diagonally until we are either in the same row or the same col
        lowRow++;
        lowCol++;
        totalDistance = totalDistance + diagonalEdgeDistance;
      } else {
        // We are already in the same col or row but not both => move horizontally/vertically
        if (lowCol === highCol) {
          // In the same col
          lowRow++;
        } else {
          // In the same row
          lowCol++;
        }
        totalDistance = totalDistance + horvertEdgeDistance;
      }
    }
    return totalDistance;
  }

  getNodeWithLowestFCost(unvisitedNodes) {
    return [...unvisitedNodes.entries()]
      .sort((a, b) => {
        return (
          a[1].distance +
          a[1].distanceHeuristic -
          (b[1].distance + b[1].distanceHeuristic)
        );
      })
      .shift();
  }
}
