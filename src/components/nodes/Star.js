import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StarHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.isVisited && "background: green;"}
`;

const Dot = styled.div`
  height: ${(props) => (props.isStart || props.isFinish ? "5px" : "3px")};
  width: ${(props) => (props.isStart || props.isFinish ? "5px" : "3px")};
  background: ${(props) =>
    props.isStart
      ? "#62ff00"
      : props.isFinish
      ? "#ff4700"
      : props.isPath
      ? "#fcff46"
      : "#fff"};
  opacity: ${(props) =>
    props.isStart || props.isFinish || props.isPath
      ? "1"
      : props.isWall
      ? "0"
      : "0.34"};
  filter: blur(1.3px);
  border-radius: 100%;
`;

export default function Star({ nodeData, parentRef, onNodeClick, plantSize }) {
  if (nodeData.isPath) {
    console.log(nodeData.row, nodeData.col);
  }
  return (
    <StarHolder
      ref={parentRef}
      onMouseDown={(e) => {
        e.preventDefault();
        onNodeClick(nodeData.row, nodeData.col);
      }}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          onNodeClick(nodeData.row, nodeData.col);
        }
      }}
      style={{ width: plantSize, height: plantSize }}
      isVisited={nodeData.isVisited}
    >
      <Dot
        isPath={nodeData.isPath}
        isStart={nodeData.isStart}
        isFinish={nodeData.isFinish}
        isPath={nodeData.isPath}
        isVisited={nodeData.isVisited}
        isWall={nodeData.isWall}
      ></Dot>
    </StarHolder>
  );
}
