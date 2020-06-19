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

const RedText = styled.span`
  color: ${StyleConstants.colors.red.medium};
`;
const SubText = styled.p`
  color: ${StyleConstants.colors.blue.font};
  margin: 0;
`;

const Select = styled.select`
  background: transparent;
  color: white;
  margin-top: 0.5rem;
  font-weight: 600;
  border-radius: 40px;
  padding: 0.7rem 2rem;
  border: 2px solid ${StyleConstants.colors.blue.light};
  box-shadow: 0 0 5px 2px ${StyleConstants.colors.blue.shade};
  &:focus {
    outline: 0;
    box-shadow: 0 0 15px 2px ${StyleConstants.colors.blue.shade};
  }
`;

const Options = styled.option`
  background: ${StyleConstants.colors.blue.dark};
`;

export default function Controls({ onChangeAlterMode }) {
  return (
    <ControlsContainer>
      <ContentContainer>
        <H1>
          Update your <RedText>settings</RedText>
        </H1>
        <Select
          name="alterMode"
          onChange={(e) => {
            onChangeAlterMode(e.target.value);
          }}
        >
          <Options value="isWall">Destroy nodes</Options>
          <Options value="isStart">Change StartNode</Options>
          <Options value="isFinish">Change FinishNode</Options>
        </Select>
      </ContentContainer>
      <ContentContainer>
        <H1>
          Check out this <OrangeText>Pathfinding Visualizer!</OrangeText>
        </H1>
        <SubText>Created by Jerome De Wulf</SubText>
      </ContentContainer>
    </ControlsContainer>
  );
}
