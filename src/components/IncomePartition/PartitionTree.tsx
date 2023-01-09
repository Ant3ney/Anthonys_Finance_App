import build3DHierarchy from "./build3DHierarchy";
function PartitionTree({ income, twoDHierarchy }: any) {
  const deepCopy2DHierarchy = JSON.parse(JSON.stringify(twoDHierarchy));
  let threeDHierachy = build3DHierarchy(deepCopy2DHierarchy);
  return (
    <ul>
      {<BuildHierarchy threeDHierachy={threeDHierachy} income={income} />}
    </ul>
  );
}

export function TestHierarchy({}) {
  const twoDHierarchy = [
    {
      id: "0.792254105018136",
      parentID: null,
      children: null,
      percentage: "10",
      amount: "",
      name: "Self",
    },
    {
      id: "0.20313799996162119",
      parentID: null,
      children: null,
      percentage: "10",
      amount: "",
      name: "Buffer",
    },
    {
      id: "0.08307110312610577",
      parentID: null,
      children: null,
      percentage: "10",
      amount: "",
      name: "Subscriptions",
    },
    {
      id: "0.40633586480055306",
      parentID: null,
      children: [
        "0.8237164838331994",
        "0.526509193739279",
        {
          id: "0.8237164838331994",
          parentID: "0.40633586480055306",
          children: null,
          percentage: "",
          amount: "57",
          name: "Debt to Self",
        },
        {
          id: "0.526509193739279",
          parentID: "0.40633586480055306",
          children: null,
          percentage: "",
          amount: "678",
          name: "Credit Card",
        },
      ],
      percentage: "20",
      amount: "",
      name: "Debt",
    },
    {
      id: "0.8237164838331994",
      parentID: "0.40633586480055306",
      children: null,
      percentage: "",
      amount: "57",
      name: "Debt to Self",
    },
    {
      id: "0.526509193739279",
      parentID: "0.40633586480055306",
      children: null,
      percentage: "",
      amount: "678",
      name: "Credit Card",
    },
  ];
  let new2DHier = JSON.parse(JSON.stringify(twoDHierarchy));
  let hier = build3DHierarchy(new2DHier);
  const income: number = 600;
  if (!hier) return <div>Error hier is {hier}</div>;
  return <ul>{<BuildHierarchy threeDHierarchy={hier} income={income} />}</ul>;
}

export function BuildHierarchy({ threeDHierarchy, newRanKey, income }: any) {
  const ranKey = newRanKey || Math.round(Math.random() * 100);
  console.log("hier:", threeDHierarchy);
  const totalAmount =
    threeDHierarchy[0].amount !== ""
      ? (() => {
          let total = 0;
          for (let i = 0; i < threeDHierarchy.length; i++) {
            const node = threeDHierarchy[i];
            total += +node.amount;
          }
          return total;
        })()
      : null;
  console.log("totalAmount:", totalAmount);
  return (
    <>
      {threeDHierarchy.map((node: any, i: number) => {
        let amount = null;
        if (node.percentage !== "")
          amount = Math.ceil(income * (+node.percentage / 100));
        console.log("amount", amount, "node.percentage:", node.percentage);
        let partionedAmountFromAmount = null;
        if (totalAmount) {
          let percentageAmount = node.amount / totalAmount;
          console.log("percentageAmount:", percentageAmount);
          partionedAmountFromAmount = Math.ceil(income * percentageAmount);
        }

        if (node.children) {
          return (
            <li key={ranKey + i}>
              name: {node.name}
              {amount ? ` $${amount}` : " error"}
              <ul key={ranKey}>
                <BuildHierarchy
                  newRanKey={ranKey + 1}
                  threeDHierarchy={node.children}
                  income={amount}
                />
              </ul>
            </li>
          );
        }
        return (
          <li key={ranKey + i}>
            name: {node.name}{" "}
            {amount ? ` $${amount}` : ` $${partionedAmountFromAmount}`}
          </li>
        );
      })}
    </>
  );
}

export default PartitionTree;
