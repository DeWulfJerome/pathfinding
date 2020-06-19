import React from "react";
import styled from "styled-components";
import StyleConstants from "../../StyleConstants";
import Star from "../nodes/Star";

const StyledLegendContainer = styled.div`
  padding: 2rem;
  border-radius: 40px;
  background-color: ${StyleConstants.colors.blue.dark};
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  justify-content: center;
  margin-top: 1rem;
`;

const NodeContainer = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
  grid-gap: 1rem;
  align-items: center;
`;

const NodeName = styled.p`
  color: #fff;
  font-weight: 600;
`;

const NODE_TYPES = [
  {
    type: "Start Node",
    node: {
      distance: Infinity,
      isWall: false,
      col: 1,
      row: 1,
      isFinish: false,
      isStart: true,
      isPath: false,
      isVisited: false,
      previousNode: null,
    },
  },
  {
    type: "End Node",
    node: {
      distance: Infinity,
      isWall: false,
      col: 1,
      row: 1,
      isFinish: true,
      isStart: false,
      isPath: false,
      isVisited: false,
      previousNode: null,
    },
  },
  {
    type: "Path node",
    node: {
      distance: Infinity,
      isWall: false,
      col: 1,
      row: 1,
      isFinish: false,
      isStart: false,
      isPath: true,
      isVisited: false,
      previousNode: null,
    },
  },
  {
    type: "Visited node",
    node: {
      distance: Infinity,
      isWall: false,
      col: 1,
      row: 1,
      isFinish: false,
      isStart: false,
      isPath: false,
      isVisited: true,
      previousNode: null,
    },
  },
];

export default function Legend() {
  const renderNodeLegends = () => {
    return NODE_TYPES.map(({ type, node }) => {
      return (
        <NodeContainer>
          <Star
            key={`${node.row}-${node.col}`}
            plantSize={30}
            animationDelay={50}
            nodeData={node}
            onNodeClick={(row, col) => {}}
          ></Star>
          <NodeName>{type}</NodeName>
        </NodeContainer>
      );
    });
  };

  return <StyledLegendContainer>{renderNodeLegends()}</StyledLegendContainer>;
}
