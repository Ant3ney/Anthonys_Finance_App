export default function build3DHierarchy(twoDHierarchy: any[]) {
  const idMapping = twoDHierarchy.reduce((acc: any, el: any, i: any) => {
    acc[el.id] = i;
    return acc;
  }, {});

  let root;
  twoDHierarchy.forEach((el: any) => {
    // Handle the root element
    if (el.parentID === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = twoDHierarchy[idMapping[el.parentID]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });

  return twoDHierarchy;
}
