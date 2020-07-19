import {
  diagonalEdgeDistance,
  horvertEdgeDistance
} from '../dataStructures/graph';
export default class Astar {
  constructor(graph, startNode, finishNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.finishNode = finishNode;
  }

  calculateHeuristicDistances(fromNode) {
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
    console.log(totalDistance);
  }
}
