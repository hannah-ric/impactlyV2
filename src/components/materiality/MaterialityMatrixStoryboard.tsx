import React from "react";
import MaterialityMatrix from "./MaterialityMatrix";

export default function MaterialityMatrixStoryboard() {
  const handleTopicSelect = (topic: any) => {
    console.log("Selected topic:", topic);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Materiality Matrix</h2>
      <div className="h-[600px]">
        <MaterialityMatrix onTopicSelect={handleTopicSelect} />
      </div>
    </div>
  );
}
