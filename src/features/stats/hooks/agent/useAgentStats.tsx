import TimeAgo from "javascript-time-ago";
import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import { detailConvert } from "../../../../hooks/detail_convert";

const useAgentStats = () => {
  const timeAgo = new TimeAgo("en-US");
  const [budgetChar, setBudgetChart] = useState([
    { title: "Jan", value: 0, label: "Revenue" },
    { title: "Feb", value: 0, label: "Revenue" },
    { title: "Mar", value: 0, label: "Revenue" },
    { title: "Apr", value: 0, label: "Revenue" },
    { title: "May", value: 0, label: "Revenue" },
    // ...
  ]);
  const projectContext = useProjectContext();

  const [cardState, setCardState] = useState({
    projectCreated: projectContext?.projectData.data.length,
    projectCompeleted: projectContext?.projectData.data.filter(
      (item) => item?.project_status === 2
    ).length,
    investment: 0,
  });
  //For budget card
  const [budget, setBudget] = useState({
    maxBudget: 0,
    minBudget: 0,
  });

  //converting projectDetail ti useable format
  const projectDetailConvert = (
    details: ClientProjectType[]
  ): ClientProjectType[] | undefined => {
    const converted = detailConvert(details) || [];
    if (converted?.length > 5) return converted?.slice(0, 5);
    return converted;
  };

  useEffect(() => {}, []);

  return {
    timeAgo,
    cardState,
    projectDetailConvert,
    budgetChar,
    budget,
    setBudget,
    setBudgetChart,
    setCardState,
  };
};

export default useAgentStats;
