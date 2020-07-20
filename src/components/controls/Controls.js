import React from 'react';
import styled from 'styled-components';
import StyleConstants from '../../StyleConstants';

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  align-items: center;
  grid-gap: 1rem;
  max-width: 1000px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContentContainer = styled.div`
  background-color: ${StyleConstants.colors.blue.dark};
  padding: 1rem 2rem;
  border-radius: 40px;
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

const WhiteText = styled.p`
  color: #fff;
`;

const Select = styled.select`
  background: transparent;
  color: white;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
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

export default function Controls({ onChangeAlterMode, onChangeAlgo }) {
  return (
    <ControlsContainer>
      <ContentContainer>
        <H1>
          Welcome to my <OrangeText>Pathfinding Visualizer!</OrangeText>
        </H1>
        <SubText>Created by Jerome De Wulf</SubText>
        <WhiteText>
          I built this application to get a better understanding of the most
          common pathfinding algorithms. Being a visual learner, this seemed to
          be the best way to really understand what is going on. I'll be adding
          more algorithms and improving the controls in the future, so please
          check back to follow my progress.
        </WhiteText>
        <WhiteText>
          You can switch algorithms and alter what clicking a node does in the
          settings box.
        </WhiteText>
      </ContentContainer>
      <ContentContainer>
        <H1>
          Update your <RedText>settings</RedText>
        </H1>
        <WhiteText>
          Change the start and endNodes, remove nodes or change the algorithm.
        </WhiteText>
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
        <Select
          name="alterAlgo"
          onChange={(e) => {
            onChangeAlgo(e.target.value);
          }}
        >
          <Options value="dijkstra">Dijkstra</Options>
          <Options value="astar">A*</Options>
        </Select>
      </ContentContainer>
    </ControlsContainer>
  );
}
