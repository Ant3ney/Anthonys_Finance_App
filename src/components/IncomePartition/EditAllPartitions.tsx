function EditAllPartitions({ allPartitions, setStep }: any) {
  const allPartitionsString = JSON.stringify(allPartitions);

  const PartitionCards = allPartitions.map((partition: any, i: any) => {
    return <div key={i}></div>;
  });

  return (
    <div>
      <div>Hello. In EditAllPartitions component</div>
      {/* <code>{allPartitionsString}</code> */}
      {PartitionCards}
      <button
        onClick={() => {
          setStep("template");
        }}
      >
        Create New Partition
      </button>
    </div>
  );
}

export default EditAllPartitions;
