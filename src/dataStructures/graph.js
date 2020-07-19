export const horvertEdgeDistance = 1;
export const diagonalEdgeDistance = Math.sqrt(
  horvertEdgeDistance * horvertEdgeDistance +
    horvertEdgeDistance * horvertEdgeDistance
);

export const createGraph = (rows, cols, startNode, endNode) => {
  const graph = new Map();
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (i !== 1 && i !== rows) {
        // Node is not in the first or last row.
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Nodes have edges in all 8 directions.
          addLinkedCenterNodes(i, j, graph, startNode, endNode);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its left side (j - 1)
          addLinkedFirstColNodes(i, j, graph, startNode, endNode);
        } else {
          // Node is in the last column
          // Node has no edges on its right side (j + 1)
          addLinkedLastColNodes(i, j, graph, startNode, endNode);
        }
      } else if (i === 1) {
        //Node is in the first row
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Node has no edges on its top side (i - 1);
          addLinkedFirstRowNodes(i, j, graph, startNode, endNode);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its top and left side (i - 1)(j - 1);
          addLinkedFirstRowFirstColNode(i, j, graph, startNode, endNode);
        } else {
          // Node is in the last column
          // Node has no edges on its top and right side (i - 1)(j + 1)
          addLinkedFirstRowLastColNode(i, j, graph, startNode, endNode);
        }
      } else {
        //Node is in the last row
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Node has no edges on its bottom side (i + 1);
          addLinkedLastRowNodes(i, j, graph, startNode, endNode);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its bottom and left sides (i + 1)(j - 1)
          addLinkedLastRowFirstColNode(i, j, graph, startNode, endNode);
        } else {
          // Node is in the last column
          // Node has no edges on its bottom and right sides (i + 1)(j + 1)
          addLinkedLastRowLastColNode(i, j, graph, startNode, endNode);
        }
      }
    }
  }
  return graph;
};

export const getNodeEdges = (row, col, graph) => {
  return graph.get(`${row}-${col}`);
};

const addLinkedCenterNodes = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedFirstColNodes = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedLastColNodes = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedFirstRowNodes = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedFirstRowFirstColNode = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedFirstRowLastColNode = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedLastRowNodes = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedLastRowFirstColNode = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};

const addLinkedLastRowLastColNode = (i, j, graph, startNode, endNode) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity,
    isWall: false,
    col: j,
    row: i,
    isFinish: endNode === `${i}-${j}` ? true : false,
    isStart: startNode === `${i}-${j}` ? true : false,
    isPath: false,
    isVisited: false,
    previousNode: null
  });
};
