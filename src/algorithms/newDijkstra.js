import * as _ from 'lodash';

export default class Dijkstra {
  constructor(graph, startNode, finishNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.finishNode = finishNode;
  }

  getDistancesAndPreviousNodes() {
    const unvisitedNodes = _.cloneDeep(this.graph);
    // Set the starting node distance to 0.
    const startNode = unvisitedNodes.get(this.startNode);
    startNode.distance = 0;
    const previousNodes = new Map();
    const distanceToNodes = new Map();
    const visitedNodesInOrder = [];
    while (unvisitedNodes.size) {
      // Visit the node with the smallest known distance from the start node
      const currentNode = this.getClosestNode(unvisitedNodes);
      // Skip node if its a wall
      if (currentNode[1].isWall) {
        unvisitedNodes.delete(currentNode[0]);
        continue;
      }

      // If no nodes with distance smaller than infinity can be found, we must be stuck.
      if (currentNode[1].distance === Infinity) {
        return false;
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
      distances: distanceToNodes,
      previousNodes,
      visitedNodesInOrder
    };
  }

  getClosestNode(unvisitedNodes) {
    return [...unvisitedNodes.entries()]
      .sort((a, b) => a[1].distance - b[1].distance)
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
