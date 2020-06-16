import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import plant1 from "../assets/plant1.json";
import plant2 from "../assets/plant2.json";
import plant3 from "../assets/plant3.json";

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

export default function Node({ nodeData, parentRef, onNodeClick }) {
  const [animData, setAnimData] = useState(plant1);

  const plant1Options = {
    loop: false,
    autoplay: false,
    animationData: animData,
    rendererSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };

  useEffect(() => {
    console.log("mount?");
  }, []);

  return (
    <div
      ref={parentRef}
      onClick={() => {
        onNodeClick(nodeData.row, nodeData.col);
      }}
      style={{ width: 80, height: 80 }}
    >
      <Lottie
        options={plant1Options}
        height={80}
        width={80}
        speed={2.5}
        isStopped={!nodeData.isVisited}
        isPaused={!nodeData.isVisited}
        eventListeners={[
          {
            eventName: "complete",
            callback: () => {
              if (animData === plant1) {
                setAnimData(plant2);
              } else {
                setAnimData(plant3);
              }
            },
          },
        ]}
      ></Lottie>
    </div>
  );
}
