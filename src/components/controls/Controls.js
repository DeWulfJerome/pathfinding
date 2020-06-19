import React from "react";
import styled from "styled-components";
import StyleConstants from "../../StyleConstants";

const ContentContainer = styled.div`
  background-color: ${StyleConstants.colors.blue.dark};
  padding: 1rem 2rem;
  border-radius: 40px;
`;

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  align-items: center;
  grid-gap: 1rem;
`;

const H1 = styled.h1`
  color: #fff;
  font-size: 1.3rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const OrangeText = styled.span`
  color: ${StyleConstants.colors.yellow.medium};
`;
const SubText = styled.p`
  color: ${StyleConstants.colors.blue.font};
  margin: 0;
`;

export default function Controls() {
  return (
    <ControlsContainer>
      <div>controls</div>

      <ContentContainer>
        <H1>
          Check out this <OrangeText>Pathfinding Visualizer!</OrangeText>
        </H1>
        <SubText>Created by Jerome De Wulf</SubText>
      </ContentContainer>
    </ControlsContainer>
  );
}
