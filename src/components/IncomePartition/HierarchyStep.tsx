import build3DHierarchy from "./build3DHierarchy";

function HierarchyStep({
  partitions,
  setSelectedParent,
  setStep,
  setThreeDPartition,
  allPartitions,
  setAllPartitions,
  threeDPartition,
}: any) {
  return (
    <div>
      <h1>Create Hierarchy</h1>
      <h2>Select Parent</h2>
      {partitions.map((partition: any, i: number) => {
        return (
          <div
            className="flex"
            key={i}
            onClick={() => {
              setSelectedParent(partition);
              setStep("child");
            }}
          >
            <p>Name: {partition.name} </p>
            {partition.percentage ? (
              <p>Percentage: {partition.percentage}</p>
            ) : (
              <p>Amount: {partition.amount}</p>
            )}
          </div>
        );
      })}
      <button
        onClick={() => {
          const buildPartitions = build3DHierarchy(partitions);
          console.log("buildPartitions:", buildPartitions);
          setThreeDPartition(buildPartitions);
        }}
      >
        Build
      </button>
      <button
        onClick={() => {
          const allPartitionsBuffer = JSON.parse(JSON.stringify(allPartitions));
          allPartitionsBuffer.push(threeDPartition);
          setAllPartitions(allPartitionsBuffer);
        }}
      >
        Save Template
      </button>
    </div>
  );
}

export default HierarchyStep;
