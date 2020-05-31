import React from "react";
import styled from "styled-components";

const StyledNode = styled.div`
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border-radius: 100%;
  display: inline-block;
  background: grey;
  position: relative;
  :hover {
    cursor: pointer;
  }

  :before {
    position: absolute;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    right: -10px;
    border-top: 3px solid red;
    border-left: 3px solid red;
    top: 50%;
    z-index: -1;
    background-color: transparent;
    border-top: ${(props) => (props.lastCol ? "none" : "3px solid red")};
    border-left: ${(props) => (props.lastRow ? "none" : "3px solid red")};
  }
`;

/**
 * :after {
    position: absolute;
    content: "";
    content: ${({ lastRow }) => (lastRow ? "normal" : "")};
    display: block;
    height: 10px;
    width: 3px;
    bottom: -10px;
    left: calc(50% - 2px);
    background-color: red;
  }
 */

const StartNode = styled(StyledNode)`
  background: green;
`;

const FinishNode = styled(StyledNode)`
  background: red;
`;

const WallNode = styled(StyledNode)`
  background: rgb(12, 53, 71);
`;

export default function Node({ nodeData }) {
  return (
    <StyledNode
      lastCol={nodeData.lastCol}
      lastRow={nodeData.lastRow}
    ></StyledNode>
  );
}
