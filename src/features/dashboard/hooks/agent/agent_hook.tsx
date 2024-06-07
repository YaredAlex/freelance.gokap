import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

const useAgentHome = () => {
  const [budgetChar, setBudgetChart] = useState([
    { title: "Jan", value: 0, label: "Spending" },
    { title: "Feb", value: 0, label: "Spending" },
    { title: "Mar", value: 0 },
    { title: "Apr", value: 0 },
    { title: "May", value: 100 },
    // ...
  ]);
  const [cardState, setCardState] = useState({
    projectCreated: 0,
    projectCompeleted: 0,
    investment: 0,
  });
  const [budget, setBudget] = useState({
    maxBudget: 0,
    minBudget: 0,
  });
  const navigate = useNavigate();
  const { sendRequest, loading } = useAxios({
    method: "POST",
    url: "/api/user/freelancer/",
    headers: true,
  });
  useEffect(() => {
    sendRequest(
      {},
      (res) => {
        console.log("freelancer data");
        console.log(res.data);
        //prompt then to enter there detail
        if (res.data.data.length == 0) {
          //show onboarding for freelancer
          navigate("/onboard");
        }
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
      }
    );
  }, []);

  return {
    loading,
    budgetChar,
    cardState,
    budget,
    setBudget,
    setCardState,
    setBudgetChart,
  };
};

export default useAgentHome;
