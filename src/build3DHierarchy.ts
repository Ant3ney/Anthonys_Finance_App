export const testTestHierarchy = () => {
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

  console.log("Transformed hierarchy: ", build3DHierarchy(twoDHierarchy));
};

export default function build3DHierarchy(twoDHierarchy: any[]) {
  function sortTopLevel(parrent: any, nodes: any) {}
  function getSortedParrent(parrent: any, allNodes: any) {}
  function getSortedNodes(node: any) {}
}
