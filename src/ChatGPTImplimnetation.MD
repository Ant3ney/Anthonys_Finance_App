```javascript
function sortTopLevel(parent: Node, nodes: Node[]): Node[] {
  // Array of nodes will now be sorted. First will come nodes with no parents and no
  // children. Then nodes with children but no parents, then nodes with parents and
  // children and then nodes with parents but no children
  let sortedNodes: Node[] = sortNodes(nodes);
  let allChildrenAccountedOnLevel: boolean = false;
  let nodeIndex: number = 0;
  //Infinite loop here
  while (!allChildrenAccountedOnLevel) {
    let currentNode: Node = sortedNodes[nodeIndex];
    if (
      currentNode?.children &&
      currentNode.children.length &&
      typeof currentNode.children[0] === "string"
    ) {
      currentNode = getSortedParrent(currentNode, nodes);
      sortedNodes.splice(nodeIndex, 1, currentNode);
      currentNode.children.forEach((currentNodeChild) => {
        sortedNodes.forEach((sortedNodeEle) => {
          if (sortedNodeEle.id === currentNodeChild.id) {
            sortedNodes.splice(sortedNodes.indexOf(sortedNodeEle), 1);
          }
        });
      });
      nodeIndex = 0;
    }
    if (nodeIndex === sortedNodes.length - 1)
      allChildrenAccountedOnLevel = true;
  }

  return sortedNodes;
}
// Returns parent node with children nodes all sorted
function getSortedParrent(parent: Node, allNodes: Node[]): Node {
  let parentGotChildrenFlag: boolean = false;
  allNodes.forEach((node) => {
    parent.children.forEach((child) => {
      if (child.id === node.id) {
        parent.nodeChildren.push(node);
        parentGotChildrenFlag = true;
      }
    });
    // starts process over so that parents children get sorted just like how the top
    // level does
    if (parentGotChildrenFlag) {
      parent.children = sortTopLevel(parent, allNodes);
    }
  });

  return parent;
}
function sortNodes(nodes: any[]) {
  // Implement sorting of nodes here
  return nodes.sort((a, b) => {
    if (a.parent && !b.parent) {
      return 1;
    } else if (!a.parent && b.parent) {
      return -1;
    } else if (a.parent && b.parent) {
      return a.parent.localeCompare(b.parent);
    } else if (a?.children && a.children.length && !b?.children?.length) {
      return 1;
    } else if (!a?.children?.length && b?.children && b.children.length) {
      return -1;
    } else {
      return a.id.localeCompare(b.id);
    }
  });
}
```
