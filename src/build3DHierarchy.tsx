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

export const testTestHierarchy = () => {
  let new2D = JSON.parse(JSON.stringify(twoDHierarchy));
  console.log("Transformed hierarchy: ", build3DHierarchy(new2D));
};

export default function build3DHierarchy(twoDHierarchy: any[]) {
  interface Node {
    id: string;
    children: (Node | string)[];
    nodeChildren: Node[];
  }
  function sortTopLevel(parent: Node, nodes: Node[]): Node[] {
    let sortedNodes = getSortedNodes(nodes);
    let nodeI = 0;
    while (true) {
      let node = sortedNodes[nodeI];
      if (
        node.children &&
        node.children.length &&
        typeof node.children[0] === "string"
      ) {
        const inValidChildren = makeAllInvalidChildrenStrings(node.children);
        const replacementNode = getParentWithChildren(node, twoDHierarchy);
        sortedNodes = getSortedNodeButReplace(node, replacementNode);

        sortedNodes = getSortedNodesWithoutChildren(
          sortedNodes,
          inValidChildren
        );
      }
      if (nodeI >= sortedNodes.length - 1) break;
      nodeI++;
    }
    return sortedNodes;
  }
  function getParentWithChildren(parent: Node, allNodes: Node[]): Node {
    let newParentsChildren: any = [];
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      for (let j = 0; j < parent.children.length; j++) {
        const childID = parent.children[j];
        if (childID === node.id) newParentsChildren.push(node);
      }
    }
    newParentsChildren = sortTopLevel(null as any, newParentsChildren);
    parent.children = newParentsChildren;
    return parent;
  }
  function getSortedNodes(nodes: any[]) {
    const arr = nodes;
    // Sort the array in place so that elements with null children and parentID come first
    arr.sort((a, b) => {
      if (a.children === null && a.parentID === null) return -1;
      if (b.children === null && b.parentID === null) return 1;
      return 0;
    });

    // Find the index of the first element with defined children
    let index = arr.findIndex((el) => el.children !== null);

    // Sort the subarray of elements with defined children in place so that elements with parentID equal to null come first
    arr.slice(index).sort((a, b) => {
      if (a.parentID === null) return -1;
      if (b.parentID === null) return 1;
      return 0;
    });

    // Find the index of the first element with defined parentID
    index = arr.findIndex((el) => el.parentID !== null);

    // Sort the subarray of elements with defined parentID in place so that elements with defined children come first
    arr.slice(index).sort((a, b) => {
      if (a.children !== null) return -1;
      if (b.children !== null) return 1;
      return 0;
    });
    return arr;
  }
  function getSortedNodeButReplace(oldNode: Node, newNode: Node) {
    return twoDHierarchy.map((existingNode: Node) => {
      if (existingNode.id === oldNode.id) return newNode;
      else return existingNode;
    });
  }
  function makeAllInvalidChildrenStrings(invalidChildren: any) {
    const correctInvalidChild = [];
    for (let i = 0; i < invalidChildren.length; i++) {
      const inValidChild = invalidChildren[i];
      if (typeof inValidChild === "string")
        correctInvalidChild.push(inValidChild);
    }
    return correctInvalidChild;
  }
  function getSortedNodesWithoutChildren(nodes: Node[], children: string[]) {
    let noChildrenNodes = [];

    for (let i = 0; i < nodes.length; i++) {
      let nodeIsChild = false;
      const node = nodes[i];
      for (let j = 0; j < children.length; j++) {
        const childID = children[j];
        if (childID === node.id) {
          nodeIsChild = true;
        }
      }
      if (!nodeIsChild) noChildrenNodes.push(node);
    }
    return noChildrenNodes;
  }
  return sortTopLevel(null as any, twoDHierarchy);
}

export function TestHierarchy({}) {
  let new2DHier = JSON.parse(JSON.stringify(twoDHierarchy));
  let hier = build3DHierarchy(new2DHier);
  const income: number = 600;
  return <ul>{<TestBuildHierarchy hier={hier} income={income} />}</ul>;
}

export function TestBuildHierarchy({ hier, newRanKey, income }: any) {
  const ranKey = newRanKey || Math.round(Math.random() * 100);
  console.log("hier:", hier);
  const totalAmount =
    hier[0].amount !== ""
      ? (() => {
          let total = 0;
          for (let i = 0; i < hier.length; i++) {
            const node = hier[i];
            total += +node.amount;
          }
          return total;
        })()
      : null;
  console.log("totalAmount:", totalAmount);
  return (
    <>
      {hier.map((node: any, i: number) => {
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
                <TestBuildHierarchy
                  newRanKey={ranKey + 1}
                  hier={node.children}
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
