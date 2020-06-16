import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Lottie from 'react-lottie';
import plant1 from '../assets/plant1.json';
import plant2 from '../assets/plant2.json';
import plant3 from '../assets/plant3.json';

const FadeIn = keyframes`
  0% {
    height: 0%;
    width: 0%;
  }

  80% {
    height: 70%;
    width: 70%;
  }

  100% {
    height: 60%;
    width: 60%;
  }
`;

const complexAnim = (props) => {
  return props.isVisited
    ? css`
        ${FadeIn} 0.9s cubic-bezier(1,.31,.52,1.69) forwards
      `
    : css`none`;
};

const PlantPot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    position: absolute;
    content: '';
    display: block;
    height: 0%;
    width: 0%;
    background: radial-gradient(
      rgba(56, 239, 125, 0.25),
      rgba(17, 153, 142, 0.25)
    );
    border-radius: 100%;
    animation: ${complexAnim};
  }
`;

export default function Node({ nodeData, parentRef, onNodeClick, plantSize }) {
  const [animData, setAnimData] = useState(plant1);

  const plant1Options = {
    loop: false,
    autoplay: false,
    animationData: animData,
    rendererSettings: {
      preserveAspectRation: 'xMidYMid slice'
    }
  };

  return (
    <PlantPot
      ref={parentRef}
      isVisited={nodeData.isVisited}
      onClick={() => {
        onNodeClick(nodeData.row, nodeData.col);
      }}
      style={{ width: plantSize, height: plantSize }}
    >
      <Lottie
        options={plant1Options}
        height={plantSize}
        width={plantSize}
        speed={2.5}
        isStopped={!nodeData.isVisited}
        isPaused={!nodeData.isVisited}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => {
              if (animData === plant1) {
                setAnimData(plant2);
              } else {
                setAnimData(plant3);
              }
            }
          }
        ]}
      ></Lottie>
    </PlantPot>
  );
}
