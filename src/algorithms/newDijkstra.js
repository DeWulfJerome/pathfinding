export default class Dijkstra {
  constructor(graph, startNode, finishNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.finishNode = finishNode;
  }

  findShortestPath() {
    const unvisitedNodes = new Map(this.graph);
    // Set the starting node distance to 0.
    unvisitedNodes.get(this.startNode).distance = 0;
    const visitedNodesInOrder = new Map();
    const visitedNodes = new Map();
    while (unvisitedNodes.size) {
      // Visit the node with the smallest known distance from the start node
      const closestNode = this.getClosestNode(unvisitedNodes);
      // For this node, check its unvisited neighbours
      closestNode[1].neighbours.forEach((neighbour) => {
        console.log(unvisitedNodes.get(neighbour));
      });
      // For this node, calculate distance of each neighbour from the start node
      // If the calc distance is less than the known distance, update the shortest path
      // Update the previous node for each of the updated distances
      // Add the current node to the list of visited nodes / remove from unvisited nodes
      break;
    }
  }

  getClosestNode(unvisitedNodes) {
    return [...unvisitedNodes.entries()]
      .sort((a, b) => a[1].distance - b[1].distance)
      .shift();
  }
}
