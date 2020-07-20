import React from 'react';
import styled from 'styled-components';
import Controls from './Controls';
import Legend from './Legend';
import StyleConstants from '../../StyleConstants';

const StyledControlsContainer = styled.div`
  background-color: ${StyleConstants.colors.blue.medium};
  padding: 1rem;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export default function ControlsContainer({ onChangeAlterMode, onChangeAlgo }) {
  return (
    <StyledControlsContainer>
      <Controls
        onChangeAlterMode={onChangeAlterMode}
        onChangeAlgo={onChangeAlgo}
      ></Controls>
      <Legend></Legend>
    </StyledControlsContainer>
  );
}
