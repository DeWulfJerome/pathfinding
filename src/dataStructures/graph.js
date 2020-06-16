const horvertEdgeDistance = 1;
const diagonalEdgeDistance = parseFloat(
  Math.sqrt(
    horvertEdgeDistance * horvertEdgeDistance +
      horvertEdgeDistance * horvertEdgeDistance
  ).toFixed(5)
);

export const createGraph = (rows, cols) => {
  const graph = new Map();
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (i !== 1 && i !== rows) {
        // Node is not in the first or last row.
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Nodes have edges in all 8 directions.
          addLinkedCenterNodes(i, j, graph);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its left side (j - 1)
          addLinkedFirstColNodes(i, j, graph);
        } else {
          // Node is in the last column
          // Node has no edges on its right side (j + 1)
          addLinkedLastColNodes(i, j, graph);
        }
      } else if (i === 1) {
        //Node is in the first row
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Node has no edges on its top side (i - 1);
          addLinkedFirstRowNodes(i, j, graph);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its top and left side (i - 1)(j - 1);
          addLinkedFirstRowFirstColNode(i, j, graph);
        } else {
          // Node is in the last column
          // Node has no edges on its top and right side (i - 1)(j + 1)
          addLinkedFirstRowLastColNode(i, j, graph);
        }
      } else {
        //Node is in the last row
        if (j !== 1 && j !== cols) {
          // Node is not in the first or last column.
          // Node has no edges on its bottom side (i + 1);
          addLinkedLastRowNodes(i, j, graph);
        } else if (j === 1) {
          // Node is in the first column.
          // Node has no edges on its bottom and left sides (i + 1)(j - 1)
          addLinkedLastRowFirstColNode(i, j, graph);
        } else {
          // Node is in the last column
          // Node has no edges on its bottom and right sides (i + 1)(j + 1)
          addLinkedLastRowLastColNode(i, j, graph);
        }
      }
    }
  }
  return graph;
};

export const getNodeEdges = (row, col, graph) => {
  return graph.get(`${row}-${col}`);
};

const addLinkedCenterNodes = (i, j, graph) => {
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
    distance: Infinity
  });
};

const addLinkedFirstColNodes = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedLastColNodes = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedFirstRowNodes = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedFirstRowFirstColNode = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedFirstRowLastColNode = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i + 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i + 1}-${j}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedLastRowNodes = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedLastRowFirstColNode = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i - 1}-${j + 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i}-${j + 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity
  });
};

const addLinkedLastRowLastColNode = (i, j, graph) => {
  graph.set(`${i}-${j}`, {
    neighbours: new Set([
      { name: `${i - 1}-${j - 1}`, distanceToNeighbour: diagonalEdgeDistance },
      { name: `${i - 1}-${j}`, distanceToNeighbour: horvertEdgeDistance },
      { name: `${i}-${j - 1}`, distanceToNeighbour: horvertEdgeDistance }
    ]),
    distance: Infinity
  });
};
