import { useState, useEffect } from "react";

import build3DHierarchy, { testTestHierarchy } from "./build3DHierarchy";
import ChildStep from "./ChildStep";
import HierarchyStep from "./HierarchyStep";
import PartitionsStep from "./PartitionsStep";
import { TestHierarchy } from "./PartitionTree";
import TemplateStep from "./TemplateStep";

const DEBUG_PARTITIONS = false;
const DEBUG__SELECTED_PARENT = false;
function IncomePartition({}: any) {
  const [templateName, setTemplateName] = useState<any>(null);
  const [step, setStep] = useState<string>("template");
  const [partitions, setPartitions] = useState<any>([]);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [income, setIncome] = useState<any>(null);
  const [threeDPartition, setThreeDPartition] = useState<any>(null);
  const [allPartitions, setAllPartitions] = useState<any[]>([]);

  useEffect(() => {
    if (window?.localStorage) {
      const allPartitions = JSON.parse(
        window?.localStorage.getItem("allPartitions") || "[]"
      );
      setAllPartitions(allPartitions);
    }
  }, []);

  useEffect(() => {
    if (DEBUG_PARTITIONS) {
      console.log("--- DEBUG_PARTITIONS Report Start ---");
      console.log(partitions);
      console.log("--- DEBUG_PARTITIONS Report end ---");
    }
  }, [partitions]);
  useEffect(() => {
    if (DEBUG__SELECTED_PARENT) {
      console.log("--- DEBUG__SELECTED_PARENT Start ---");
      console.log(selectedParent);
      console.log("--- DEBUG__SELECTED_PARENT Report end ---");
    }
  }, [selectedParent]);

  useEffect(() => {
    if (!window?.localStorage) return;
    window?.localStorage.setItem(
      "allPartitions",
      JSON.stringify(allPartitions)
    );
  }, [allPartitions]);

  useEffect(() => {
    testTestHierarchy();
  }, []);

  /* return <TestHierarchy />; */

  switch (step) {
    case "template":
      return (
        <TemplateStep
          setThreeDPartition={setThreeDPartition}
          allPartitions={allPartitions}
          setTemplateName={setTemplateName}
          setStep={setStep}
        />
      );
    case "partitions":
      return (
        <PartitionsStep
          setPartitions={setPartitions}
          partitions={partitions}
          setStep={setStep}
        />
      );
    case "hierarchy":
      return (
        <HierarchyStep
          partitions={partitions}
          setStep={setStep}
          setSelectedParent={setSelectedParent}
          threeDPartition={threeDPartition}
          setThreeDPartition={setThreeDPartition}
          allPartitions={allPartitions}
          setAllPartitions={setAllPartitions}
        />
      );
    case "child":
      return (
        <ChildStep
          setStep={setStep}
          selectedParent={selectedParent}
          partitions={partitions}
          setPartitions={setPartitions}
        />
      );
    default:
      return <div>Error in income portioner</div>;
  }
}

export default IncomePartition;
