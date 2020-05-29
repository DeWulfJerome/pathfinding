import React from "react";
import { styled } from "styled-components";

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

export default function Node() {
  return (
    <div>
      <StyledNode></StyledNode>
    </div>
  );
}
