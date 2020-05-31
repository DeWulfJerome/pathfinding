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
    border-top: 3px solid #c7c7c7;
    border-left: 3px solid #c7c7c7;
    top: 50%;
    z-index: -1;
    background-color: transparent;
    border-top: ${(props) => (props.lastCol ? "none" : "3px solid #c7c7c7")};
    border-left: ${(props) => (props.lastRow ? "none" : "3px solid #c7c7c7")};
  }

  :after {
    position: absolute;
    content: "";
    content: ${(props) => (props.lastRow || props.lastCol ? "normal" : "")};
    display: block;
    height: 3px;
    width: 28.3px;
    transform: rotate(45deg);
    bottom: -10px;
    right: -20px;

    background-color: #c7c7c7;
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

export default function Node({ nodeData }) {
  return (
    <StyledNode
      lastCol={nodeData.lastCol}
      lastRow={nodeData.lastRow}
    ></StyledNode>
  );
}
