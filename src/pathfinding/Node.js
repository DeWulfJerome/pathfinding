import React from "react";
import styled from "styled-components";
import "./Node.css";

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

export default function Node({ nodeData }) {
  const extraClassName = nodeData.isFinish
    ? "node-finish"
    : nodeData.isStart
    ? "node-start"
    : nodeData.isWall
    ? "node-wall"
    : "";

  if (nodeData.isStart) {
    return (
      <StartNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
      ></StartNode>
    );
  } else if (nodeData.isFinish) {
    return (
      <FinishNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
      ></FinishNode>
    );
  } else {
    return (
      <StyledNode
        className={`node ${extraClassName}`}
        id={`node-${nodeData.row}-${nodeData.col}`}
      ></StyledNode>
    );
  }
}
