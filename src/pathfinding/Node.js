import React from 'react';
import styled from 'styled-components';
import './Node.css';

const StyledNode = styled.div`
  height: 100%;
  width: 100%;
  outline: 1px solid grey;
  display: inline-block;
  background: #f2f2f2;
  :hover {
    cursor: pointer;
  }
`;

const StartNode = styled(StyledNode)`
  background: green;
`;

const FinishNode = styled(StyledNode)`
  background: red;
`;

const WallNode = styled(StyledNode)`
  background: rgb(12, 53, 71);
`;

export default function Node({ nodeData, onClick }) {
  const clickedNode = () => {
    onClick(nodeData.col, nodeData.row);
  };

  if (nodeData.isStart) {
    return <StartNode id={`node-${nodeData.row}-${nodeData.col}`}></StartNode>;
  } else if (nodeData.isFinish) {
    return (
      <FinishNode id={`node-${nodeData.row}-${nodeData.col}`}></FinishNode>
    );
  } else if (nodeData.isWall) {
    return (
      <WallNode
        id={`node-${nodeData.row}-${nodeData.col}`}
        onMouseDown={(e) => {
          e.preventDefault();
          clickedNode();
        }}
        onMouseEnter={(e) => {
          if (e.buttons === 1) {
            clickedNode();
          }
        }}
      ></WallNode>
    );
  } else {
    return (
      <StyledNode
        id={`node-${nodeData.row}-${nodeData.col}`}
        onMouseDown={(e) => {
          e.preventDefault();
          clickedNode();
        }}
        onMouseEnter={(e) => {
          if (e.buttons === 1) {
            clickedNode();
          }
        }}
      ></StyledNode>
    );
  }
}
