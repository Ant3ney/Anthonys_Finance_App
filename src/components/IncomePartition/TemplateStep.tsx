function TemplateStep({
  setThreeDPartition,
  setTemplateName,
  setStep,
  allPartitions,
}: any) {
  return (
    <div>
      <div>
        <h1>Load Template</h1>
        {allPartitions.map((partition: any, i: number) => {
          return (
            <div>
              <p>
                {partition.name}{" "}
                <button
                  onClick={() => {
                    setThreeDPartition(partition);
                    setStep("show");
                  }}
                >
                  Load
                </button>
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Create Template</h1>
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
}

export default TemplateStep;
