import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../../hooks/useAxios";

const useAdminProject = () => {
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

  const checkOutProject = (detail: ClientProjectType) => {
    //setCurrentProject
    setCurrentProject(detail);
    navigator(`apply/${detail.id}`);
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

export default useAdminProject;
