import React from 'react';
import styled from 'styled-components';
import './Node.css';

const StyledNode = styled.div`
  height: 100%;
  width: 100%;
  outline: 1px solid grey;
  display: inline-block;
  background: #f2f2f2;
`;

const StartNode = styled.div`
  height: 100%;
  width: 100%;
  outline: 1px solid grey;
  display: inline-block;
  background: green;
`;

const FinishNode = styled.div`
  height: 100%;
  width: 100%;
  outline: 1px solid grey;
  display: inline-block;
  background: red;
`;

export default function Node({ nodeData, onClick }) {
  const extraClassName = nodeData.isFinish
    ? 'node-finish'
    : nodeData.isStart
    ? 'node-start'
    : nodeData.isWall
    ? 'node-wall'
    : '';

  const clickedNode = () => {
    onClick(nodeData.col, nodeData.row);
  };

  if (nodeData.isStart) {
    return (
      <StartNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
        onClick={clickedNode}
      ></StartNode>
    );
  } else if (nodeData.isFinish) {
    return (
      <FinishNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
        onClick={clickedNode}
      ></FinishNode>
    );
  } else {
    return (
      <StyledNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
        // onClick={clickedNode}
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
