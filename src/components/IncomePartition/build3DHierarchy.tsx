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
  const preReturnedSorted = sortTopLevel(null as any, twoDHierarchy);
  console.log("preReturnedSorted:", preReturnedSorted);
  return preReturnedSorted;
}

const twoDHierarchyTest = [
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
  let new2D = JSON.parse(JSON.stringify(twoDHierarchyTest));
  console.log("Transformed hierarchy: ", build3DHierarchy(new2D));
};
