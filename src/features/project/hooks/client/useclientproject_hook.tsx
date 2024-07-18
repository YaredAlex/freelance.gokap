import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import useGetClientProject from "../../../dashboard/hooks/client/usegetproject_hook";
import { detailConvert } from "../../../../hooks/detail_convert";

const useClientProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<ClientProjectType[]>([]);
  const [alldata, setAllData] = useState<ClientProjectType[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [showReload, setShowReload] = useState(false);
  const { setCurrentProject, projectData, projectDispatch } =
    useProjectContext();
  const getClientProject = useGetClientProject();
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const timeAgo = new TimeAgo("en-US");
  const navigator = useNavigate();
  const controller = new AbortController();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //UseEffect=>
  useEffect(() => {
    getClientProject.getClientProject((res) => {
      projectDispatch({
        type: "saveproject",
        payload: res.data,
      });
      setAllData(res.data);
      const projects = detailConvert(res.data) || [];
      setCurrentRows(projects?.slice(indexOfFirstRow, indexOfLastRow));
    });
    return () => {
      controller.abort();
    };
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filteredData = projectData.data.filter(
      (item) =>
        item.title?.toLowerCase().includes(value.toLowerCase()) ||
        item.project_price
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase())
    ) as ClientProjectType[];
    setCurrentRows(filteredData.slice(indexOfFirstRow, indexOfLastRow));
    // Reset to first page when searching
    setCurrentPage(1);
    setAllData(filteredData);
    if (e.target.value === "")
      setAllData(projectData.data as ClientProjectType[]);
  };
  const goToProjectDetail = (detail: ClientProjectType) => {
    //setCurrentProject
    setCurrentProject(detail);
    navigator(`status/${detail.id}`);
  };
  return {
    currentPage,
    setCurrentPage,
    currentRows,
    setCurrentRows,
    loading: getClientProject.loading,
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

export default useClientProject;

export type UseClientProjectType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentRows: ClientProjectType[];
  setCurrentRows: React.Dispatch<React.SetStateAction<ClientProjectType[]>>;
  loading: boolean;
  setAllData: React.Dispatch<React.SetStateAction<ClientProjectType[]>>;
  alldata: ClientProjectType[];
  showPortal: boolean;
  setShowPortal: React.Dispatch<React.SetStateAction<boolean>>;
  showReload: boolean;
  setShowReload: React.Dispatch<React.SetStateAction<boolean>>;
  paginate: (pageNumber: number) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goToProjectDetail: (detail: ClientProjectType) => void;
  showDeleteModal: boolean;
  timeAgo: TimeAgo;
  rowsPerPage: number;
};
