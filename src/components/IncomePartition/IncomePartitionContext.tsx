import { useState, createContext, useEffect } from "react";

const incomePartitionContext = createContext<any>(null);

export function IncomePartitionProvider({ children }: any) {
  const [templateName, setTemplateName] = useState<any>(null);
  const [step, setStep] = useState<string>("template");
  const [partitions, setPartitions] = useState<any>([]);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [income, setIncome] = useState<any>(null);
  const [threeDPartition, setThreeDPartition] = useState<any>(null);
  const [allPartitions, setAllPartitions] = useState<any[]>([]);
  const Steps = {};
  return (
    <incomePartitionContext.Provider
      value={step}
    ></incomePartitionContext.Provider>
  );
}
