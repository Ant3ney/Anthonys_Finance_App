import build3DHierarchy from "./build3DHierarchy";
import { post400 } from "./partitionTrees";

const HARD_INCOME = 425;

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
  const twoDHierarchy = post400;
  let new2DHier = JSON.parse(JSON.stringify(twoDHierarchy));
  let hier = build3DHierarchy(new2DHier);
  const income: number = HARD_INCOME;
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
