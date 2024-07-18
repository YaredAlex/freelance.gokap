import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosResponse } from "axios";

const useAdminBoard = () => {
  //load project with status
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<ClientProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchProject, setFetchProject] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");
  const [applicatFilter, setApplicantFilter] = useState("");
  const [postedProject, setPostedProject] = useState<ClientProjectType[]>([]);
  const [projectHolder, setProjectHolder] = useState<ClientProjectType[]>([]);
  const { setCurrentProject } = useProjectContext();
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const timeAgo = new TimeAgo("en-US");
  const navigator = useNavigate();
  // const controller = new AbortController();
  const priceFilterList = ["500-1000", "1K-2K", "2k-5K", ">5k"];
  const applicatFilterList = ["0-5", "5-10", ">10"];
  const { sendRequest, loading } = useAxios({
    url: "/api/user/get_unassigned_project",
    headers: true,
    method: "GET",
  });
  const searchProject = useSearchProject();
  const getUnAssignedProject = () => {
    sendRequest(
      {},
      (res) => {
        setPostedProject(res.data.data);
        setProjectHolder(res.data.data);
        setCurrentRows(res.data.data.slice(indexOfFirstRow, indexOfLastRow));
        paginate(1);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  //paginate
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCurrentRows(projectHolder.slice(indexOfFirstRow, indexOfLastRow));
  }, [currentPage]);
  useEffect(() => {
    getUnAssignedProject();
  }, [fetchProject]);

  const handleSearch = () => {
    // 'description'
    // 'min_price'
    // 'title'
    if (searchTerm.trim() == "") {
      setProjectHolder(postedProject);
      return;
    }
    searchProject.searchProject(`title=${searchTerm}`, (res) => {
      console.log(res);
      // const searchResult = res.data.serialized_data;
      // setCurrentRows(searchResult.slice(indexOfFirstRow, indexOfLastRow));
      // // Reset to first page when searching
      // setCurrentPage(1);
      // setProjectHolder(searchResult);
    });
    // const filteredData = postedProject.filter(
    //   (item) =>
    //     item.title?.toLowerCase().includes(value.toLowerCase()) ||
    //     item.project_price
    //       ?.toString()
    //       .toLowerCase()
    //       .includes(value.toLowerCase())
    // );
  };

  const checkOutProject = (project: ClientProjectType) => {
    //setCurrentProject
    setCurrentProject(project);
    navigator(`assign/${project.id}`);
  };

  return {
    searchLoading: searchProject.loading,
    loading,
    getUnAssignedProject,
    searchTerm,
    handleSearch,
    setSearchTerm,
    postedProject,
    checkOutProject,
    priceFilterList,
    applicatFilterList,
    priceFilter,
    setPriceFilter,
    applicatFilter,
    setApplicantFilter,
    timeAgo,
    rowsPerPage,
    projectHolder,
    currentPage,
    currentRows,
    paginate,
    showFilter,
    setShowFilter,
    setFetchProject,
  };
};
export type useAdminBoardType = {
  searchLoading: boolean;
  loading: boolean;
  getUnAssignedProject: () => void;
  searchTerm: string;
  handleSearch: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  postedProject: ClientProjectType[];
  checkOutProject: (detail: ClientProjectType) => void;
  priceFilterList: string[];
  applicatFilterList: string[];
  priceFilter: string;
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
  applicatFilter: string;
  setApplicantFilter: React.Dispatch<React.SetStateAction<string>>;
  timeAgo: TimeAgo;
  rowsPerPage: number;
  projectHolder: ClientProjectType[];
  currentPage: number;
  currentRows: ClientProjectType[];
  paginate: (pageNumber: number) => void;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchProject: React.Dispatch<React.SetStateAction<boolean>>;
};
export default useAdminBoard;
const useSearchProject = () => {
  // 'description'
  // 'min_price'
  // 'title'
  const searchApi = "/api/user/search_project/?min_applicants=0";
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: searchApi,
  });

  const searchProject = (search: string, cb: (res: AxiosResponse) => void) => {
    const newApi = `/api/user/search_project/?${search}`;

    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        console.log(error);
      },
      true,
      newApi
    );
  };

  return {
    loading,
    searchProject,
  };
};
