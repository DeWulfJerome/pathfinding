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
    console.log(unvisitedNodes);
    return { previousNodes: 'test', visitedNodesInOrder: 'test' };
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
}
