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
    { title: "Jan", value: 0, label: "Spending" },
    { title: "Feb", value: 0, label: "Spending" },
    { title: "Mar", value: 0 },
    { title: "Apr", value: 0 },
    { title: "May", value: 100 },
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
  //   const getClientProject = useGetClientProject();
  useEffect(() => {
    // getClientProject.getClientProject((res) => {
    //   const [min, max] = getMinMaxBudget(res.data || []);
    //   setBudget({
    //     maxBudget: max,
    //     minBudget: min,
    //   });
    //   setCardState({
    //     projectCreated: res.data.length,
    //     projectCompeleted: res.data.filter(
    //       (item: { project_status: number }) => item?.project_status === 2
    //     ).length,
    //     investment: 0,
    //   });
    // });
    // console.log(projectData);
  }, []);

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
