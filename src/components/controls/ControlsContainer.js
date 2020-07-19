import React from 'react';
import styled from 'styled-components';
import Controls from './Controls';
import Legend from './Legend';
import StyleConstants from '../../StyleConstants';

const StyledControlsContainer = styled.div`
  background-color: ${StyleConstants.colors.blue.medium};
  padding: 1rem;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
  &:focus {
    outline: 0;
    box-shadow: 0 0 15px 2px ${StyleConstants.colors.blue.shade};
  }
  margin-top: 1rem;
`;

export default function ControlsContainer({
  visualize,
  onChangeAlterMode,
  onChangeAlgo
}) {
  return (
    <StyledControlsContainer>
      <Controls
        onChangeAlterMode={onChangeAlterMode}
        onChangeAlgo={onChangeAlgo}
      ></Controls>
      <Legend></Legend>
      <ButtonContainer>
        <Button
          onClick={() => {
            visualize('dijkstra');
          }}
        >
          Visualize!
        </Button>
      </ButtonContainer>
    </StyledControlsContainer>
  );
}
