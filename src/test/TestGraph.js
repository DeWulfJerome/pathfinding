import React, { useEffect, useState } from "react";
import { createGraph } from "../dataStructures/graph";

export default function TestGraph() {
  const [linkedGraph, setLinkedGraph] = useState();

  useEffect(() => {
    // console.log(linkedGraph);
  }, [linkedGraph]);

  const renderGrid = () => {
    linkedGraph.forEach((val) => {
      console.log(val);
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setLinkedGraph(createGraph(4, 4));
        }}
      >
        Generate Graph
      </button>
      {linkedGraph && renderGrid()}
    </div>
  );
}
