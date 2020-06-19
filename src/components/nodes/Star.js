import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const StarHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const pulse = keyframes`
    0%{
      transform: scale(1);
      opacity: 0.34;
    }
    66%{
      transform: scale(2);
      opacity: 1;
    }
    100%{
      transform: scale(1.5);
      opacity: .85;
    }
`;
// filter: blur(1.3px);

const complexPulse = (props) => {
  return (
    props.isVisited &&
    !props.isPath &&
    !props.isStart &&
    !props.isFinish &&
    css`
      animation: ${pulse} ${props.animationDelay * 10}ms ease-in-out forwards;
    `
  );
};

const Dot = styled.div`
  height: ${(props) => (props.isStart || props.isFinish ? "6px" : "3px")};
  width: ${(props) => (props.isStart || props.isFinish ? "6px" : "3px")};
  transition: all 0.3s ease;
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
  ${complexPulse}
`;

export default function Star({
  nodeData,
  parentRef,
  onNodeClick,
  animationDelay,
  plantSize,
}) {
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
        animationDelay={animationDelay}
        isPath={nodeData.isPath}
        isVisited={nodeData.isVisited}
        isWall={nodeData.isWall}
      ></Dot>
    </StarHolder>
  );
}
