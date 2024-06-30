import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useAgentContext } from "../../../../context/agent/agent_context";

type ProjectType = {
  client: number;
  description: string;
  project_deadline: string;
  project_price: number;
  title: string;
  skills_required: string[];
};

export type AppliedProjectType = {
  proposal: string;
  applied_at: string;
  status: string;
  frelancer_id: number;
  id: number;
  project_id: ProjectType;
};

const useAgentProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<AppliedProjectType[]>([]);
  const [alldata, setAllData] = useState<AppliedProjectType[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [showReload, setShowReload] = useState(false);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const timeAgo = new TimeAgo("en-US");
  //   const navigator = useNavigate();
  const controller = new AbortController();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { sendRequest, loading } = useAxios({
    url: "/api/user/get_applied_project",
    headers: true,
    method: "GET",
  });
  const agentContext = useAgentContext();
  const getAppliedProject = () => {
    sendRequest(
      {},
      (res) => {
        const projects = res.data.serialized_data;
        setAllData(projects);
        setCurrentRows(projects?.slice(indexOfFirstRow, indexOfLastRow));
        agentContext.dispatchAgent({
          type: "setapplied",
          payload: {
            appliedProject: projects,
            detail: agentContext.agent.detail,
          },
        });
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log("Fetching project", error);
      }
    );
  };
  useEffect(() => {
    //calling get applied project
    getAppliedProject();

    return () => {
      controller.abort();
    };
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filteredData = alldata.filter(
      (item) =>
        item.proposal?.toLowerCase().includes(value.toLowerCase()) ||
        item.id?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setCurrentRows(filteredData.slice(indexOfFirstRow, indexOfLastRow));
    // Reset to first page when searching
    setCurrentPage(1);
    // setAllData(filteredData);
    if (e.target.value === "") setAllData(alldata);
  };
  const goToProjectDetail = (detail: AppliedProjectType) => {
    //setCurrentProject
    console.log(detail);
    // setCurrentProject(detail);
    // navigator(`status/${detail.id}`);
  };
  return {
    currentPage,
    setCurrentPage,
    currentRows,
    setCurrentRows,
    loading,
    setAllData,
    alldata,
    showPortal,
    setShowPortal,
    showReload,
    setShowReload,
    paginate,
    searchTerm,
    setSearchTerm,
    handleSearch,
    goToProjectDetail,
    showDeleteModal,
    setShowDeleteModal,
    timeAgo,
    rowsPerPage,
  };
};

export default useAgentProject;

export type UseAppliedProjectType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentRows: AppliedProjectType[];
  setCurrentRows: React.Dispatch<React.SetStateAction<AppliedProjectType[]>>;
  loading: boolean;
  setAllData: React.Dispatch<React.SetStateAction<AppliedProjectType[]>>;
  alldata: AppliedProjectType[];
  showPortal: boolean;
  setShowPortal: React.Dispatch<React.SetStateAction<boolean>>;
  showReload: boolean;
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
  paginate: (pageNumber: number) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goToProjectDetail: (detail: AppliedProjectType) => void;
  showDeleteModal: boolean;
  timeAgo: TimeAgo;
  rowsPerPage: number;
};
