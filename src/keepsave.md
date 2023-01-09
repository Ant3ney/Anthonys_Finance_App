```javascript
switch (step) {
  case "template":
    return (
      <div>
        <div>
          <TestHierarchy />
          <label>Template Name</label>
          <input
            onChange={(event: any) => {
              setTemplateName(event.target.value);
            }}
          ></input>

          <button
            onClick={() => {
              setStep("partitions");
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  case "partitions":
    return (
      <div>
        <h1>Partitions</h1>
        {partitions.map((partition: any, i: number) => {
          return (
            <div className="flex" key={i}>
              <p>Name: {partition.name} </p>
              {partition.percentage ? (
                <p>Percentage: {partition.percentage}</p>
              ) : (
                <p>Amount: {partition.amount}</p>
              )}
            </div>
          );
        })}
        <h2>Create New Partition</h2>
        <label>Name</label>
        <input id="por-name-input"></input>
        <label>Portion</label>
        <input type="number" id="por-input"></input>
        <label>Amount</label>
        <input type="number" id="amount-input"></input>
        <button
          onClick={() => {
            const partitionsBuffer = JSON.parse(JSON.stringify(partitions));
            const partitionBase: any = {
              id: "" + Math.random(),
              parentID: null,
              children: null,
            };

            partitionBase.percentage =
              document.querySelector < any > "#por-input"?.value;
            partitionBase.amount =
              document.querySelector < any > "#amount-input"?.value;
            partitionBase.name =
              document.querySelector < any > "#por-name-input"?.value;
            partitionsBuffer.push(partitionBase);
            setPartitions(partitionsBuffer);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setStep("template");
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            setStep("hierarchy");
          }}
        >
          Next
        </button>
      </div>
    );
  case "hierarchy":
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
            const buildPartions = build3DHierarchy(partitions);
            console.log("buildPartions:", buildPartions);
          }}
        >
          Build
        </button>
      </div>
    );
  case "child":
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
  default:
    return <div>App</div>;
}
```
