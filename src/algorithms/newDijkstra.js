export default class Dijkstra {
  constructor(graph, startNode, finishNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.finishNode = finishNode;
  }

  getDistancesAndPreviousNodes() {
    const unvisitedNodes = new Map(this.graph);
    // Set the starting node distance to 0.
    unvisitedNodes.get(this.startNode).distance = 0;
    const previousNodes = new Map();
    const distanceToNodes = new Map();
    let edgeDistance = 0;

    while (unvisitedNodes.size) {
      edgeDistance++;
      // Visit the node with the smallest known distance from the start node
      const closestNode = this.getClosestNode(unvisitedNodes);
      // For this node, check its unvisited neighbours
      closestNode[1].neighbours.forEach((neighbour) => {
        // For this node, calculate distance of each neighbour from the start node
        if (unvisitedNodes.has(neighbour)) {
          const tempNode = unvisitedNodes.get(neighbour);
          tempNode.distance = edgeDistance;
          if (distanceToNodes.has(neighbour)) {
            if (distanceToNodes.get(neighbour).distance > tempNode.distance) {
              // If the calc distance is less than the known distance, update the shortest path
              distanceToNodes.set(neighbour, tempNode);
              // Update the previous node for each of the updated distances
              previousNodes.set(neighbour, closestNode[0]);
            }
          } else {
            distanceToNodes.set(neighbour, tempNode);
            // Update the previous node for each of the updated distances
            previousNodes.set(neighbour, closestNode[0]);
          }
        }
      });
      // Add the current node to the list of visited nodes / remove from unvisited nodes
      unvisitedNodes.delete(closestNode[0]);
    }
    return { distances: distanceToNodes, previousNodes };
  }

  getClosestNode(unvisitedNodes) {
    return [...unvisitedNodes.entries()]
      .sort((a, b) => a[1].distance - b[1].distance)
      .shift();
  }

  findShortestPath() {
    const nodesInReverseOrder = [this.finishNode];
    let lookupNode = this.finishNode;
    const { distances, previousNodes } = this.getDistancesAndPreviousNodes();
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
