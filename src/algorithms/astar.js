import {
  diagonalEdgeDistance,
  horvertEdgeDistance
} from '../dataStructures/graph';
import * as _ from 'lodash';

export default class Astar {
  constructor(graph, startNode, finishNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.finishNode = finishNode;
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

      // For this node, check its unvisited neighbours
      currentNode[1].neighbours.forEach((neighbour) => {
        // For this node, calculate distance of each neighbour from the start node
        if (unvisitedNodes.has(neighbour.name)) {
          const tempNode = unvisitedNodes.get(neighbour.name);
          if (distanceToNodes.has(currentNode[0])) {
            tempNode.distance =
              distanceToNodes.get(currentNode[0]) +
              neighbour.distanceToNeighbour;
          } else {
            // Is startnode
            tempNode.distance = neighbour.distanceToNeighbour;
          }
          unvisitedNodes.get(neighbour.name);
          if (distanceToNodes.has(neighbour.name)) {
            if (distanceToNodes.get(neighbour.name) > tempNode.distance) {
              // If the calc distance is less than the known distance, update the shortest path
              distanceToNodes.set(neighbour.name, tempNode.distance);
              // Update the previous node for each of the updated distances
              previousNodes.set(neighbour.name, currentNode[0]);
            } else {
              // Reset the distance in the unvisited node to the closest known distance
              tempNode.distance = distanceToNodes.get(neighbour.name);
            }
          } else {
            distanceToNodes.set(neighbour.name, tempNode.distance);
            // Update the previous node for each of the updated distances
            previousNodes.set(neighbour.name, currentNode[0]);
          }
        }
      });
      // Push the current node name into visitedNodesInOrder to be able to show the algorithm working
      visitedNodesInOrder.push(currentNode[0]);
      // Add the current node to the list of visited nodes / remove from unvisited nodes
      unvisitedNodes.delete(currentNode[0]);
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

  findShortestPath(previousNodes) {
    const nodesInReverseOrder = [this.finishNode];
    let lookupNode = this.finishNode;
    while (true) {
      nodesInReverseOrder.push(previousNodes.get(lookupNode));
      lookupNode = previousNodes.get(lookupNode);
      if (lookupNode === this.startNode) {
        break;
      }
    }
    return nodesInReverseOrder.reverse();
  }
}
