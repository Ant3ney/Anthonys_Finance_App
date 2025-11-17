function PartitionsStep({ partitions, setPartitions, setStep }: any) {
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
            document.querySelector<any>("#por-input")?.value;
          partitionBase.amount =
            document.querySelector<any>("#amount-input")?.value;
          partitionBase.name =
            document.querySelector<any>("#por-name-input")?.value;
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
}

export default PartitionsStep;
