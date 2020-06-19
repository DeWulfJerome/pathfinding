export const buildMapGrid = (GRAPH_ROWS, GRAPH_COLS) => {
  const mapGrid = new Map();
  for (let row = 0; row < GRAPH_ROWS; row++) {
    for (let col = 0; col < GRAPH_COLS; col++) {
      const currentNode = createNode(col + 1, row + 1);
      if (row === GRAPH_ROWS - 1) {
        currentNode.lastRow = true;
      }
      if (col === GRAPH_COLS - 1) {
        currentNode.lastCol = true;
      }
      mapGrid.set(`${row + 1}-${col + 1}`, currentNode);
    }
  }
  return mapGrid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: startNode === `${row}-${col}` ? true : false,
    isFinish: endNode === `${row}-${col}` ? true : false,
    distance: Infinity,
    isVisited: false,
    isPath: false,
    isWall: false,
    previousNode: null,
    lastCol: false,
    lastRow: false,
  };
};
