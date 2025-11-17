function ChildStep({
  selectedParent,
  partitions,
  setPartitions,
  setStep,
}: any) {
  return (
    <div>
      <h1>Select Child Partition to Parent {selectedParent.name}</h1>
      {partitions.map((childPartition: any, i: number) => {
        return (
          <div
            className="flex"
            key={i}
            onClick={() => {
              const selectedParentBuffer: any = JSON.parse(
                JSON.stringify(selectedParent)
              );
              let partitionsBuffer = JSON.parse(JSON.stringify(partitions));

              if (!selectedParent.children)
                selectedParentBuffer.children = [childPartition.id];
              else selectedParentBuffer.children.push(childPartition.id);

              childPartition.parentID = selectedParent.id;

              /* Updating the parentID of the childPartition and the children of the
          selectedParent. */
              partitionsBuffer = partitionsBuffer.map(
                (partitionsBufferPartition: any) => {
                  if (partitionsBufferPartition?.id === childPartition.id)
                    partitionsBufferPartition.parentID =
                      selectedParentBuffer.id;
                  else if (
                    partitionsBufferPartition?.id === selectedParentBuffer?.id
                  )
                    partitionsBufferPartition = selectedParentBuffer;

                  return partitionsBufferPartition;
                }
              );

              console.log(partitionsBuffer);

              setPartitions(partitionsBuffer);
              setStep("hierarchy");
            }}
          >
            <p>Name: {childPartition.name} </p>
            <p>Portion: </p>
            {childPartition.percentage ? (
              <p>Percentage: {childPartition.percentage}</p>
            ) : (
              <p>Amount: {childPartition.amount}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChildStep;
