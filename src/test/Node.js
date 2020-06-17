import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Lottie from 'react-lottie';
import plant1 from '../assets/plant1.json';
import plant2 from '../assets/plant2.json';
import plant3 from '../assets/plant3.json';

import './Node.css';

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
  return props.isStart || props.isFinish || props.isPath
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
    background: ${(props) =>
      props.isStart
        ? `radial-gradient(
      rgba(56, 239, 125, 0.35),
      rgba(17, 153, 142, 0.35)
    );`
        : props.isFinish
        ? `radial-gradient(
          rgba(206,22,22, 0.35),
          rgba(142,33,33, 0.35)
    );`
        : `radial-gradient(
      rgba(214,214,214, 0.2),
      rgba(17, 153, 142, 0.2)
    );`}
    border-radius: 100%;
    animation: ${complexAnim};
  }
`;

export default function Node({ nodeData, parentRef, onNodeClick, plantSize }) {
  const [animData, setAnimData] = useState(plant1);

  useEffect(() => {
    if (!nodeData.isPath) {
      setAnimData(plant1);
    }
  }, [nodeData.isPath]);

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
      isPath={nodeData.isPath}
      isStart={nodeData.isStart}
      isFinish={nodeData.isFinish}
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
        isStopped={!nodeData.isPath}
        isPaused={!nodeData.isPath}
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
