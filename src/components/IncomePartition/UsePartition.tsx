import { useState, useEffect } from "react";
import { TestHierarchy, BuildHierarchy } from "./PartitionTree";

function UseReactComponent({ currentPartition, setStep }: any) {
  const [income, setIncome] = useState<any>(5);
  console.log(income);
  return (
    <div>
      <label>
        Income: <br />
        <input
          defaultValue={income}
          type="number"
          onChange={(e: any) => {
            setIncome(e.target.value);
          }}
        ></input>
      </label>
      <ul>
        {
          <BuildHierarchy
            threeDHierarchy={currentPartition.threeDPartition}
            income={income}
          />
        }
      </ul>
      <button
        onClick={() => {
          setStep("template");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default UseReactComponent;
