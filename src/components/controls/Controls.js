import React from "react";
import styled from "styled-components";
import StyleConstants from "../../StyleConstants";

const Button = styled.button`
  background-color: transparent;
  border-radius: 40px;
  border: 2px solid ${StyleConstants.colors.blue.light};
  box-shadow: 0 0 5px 2px ${StyleConstants.colors.blue.shade};
  padding: 0.7rem 2rem;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
  }
`;

const ContentContainer = styled.div`
  background-color: ${StyleConstants.colors.blue.dark};
  padding: 1rem 2rem;
  border-radius: 40px;
`;

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 3fr;
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
      <Button>Visualize!</Button>
      <ContentContainer>
        <H1>
          Check out this <OrangeText>Pathfinding Visualizer!</OrangeText>
        </H1>
        <SubText>Created by Jerome De Wulf</SubText>
      </ContentContainer>
    </ControlsContainer>
  );
}
