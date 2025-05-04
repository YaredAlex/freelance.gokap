import { useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import {
  PostedProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import TimeAgo from "javascript-time-ago";
import { AxiosResponse } from "axios";
const useAgentBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<PostedProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchProject, setFetchProject] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");
  const [applicatFilter, setApplicantFilter] = useState("");
  const [projectCount, setProjectCount] = useState(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const { setCurrentProject } = useProjectContext();
  const rowsPerPage = 10;

  const timeAgo = new TimeAgo("en-US");
  const navigator = useNavigate();
  // const controller = new AbortController();
  const priceFilterList = ["500-1000", "1K-2K", "2k-5K", ">5k"];
  const applicatFilterList = ["0-5", "5-10", ">10"];
  const { sendRequest, loading } = useAxios({
    url: "/api/project/unassigned/",
    headers: true,
    method: "GET",
  });
  const searchProject = useSearchProject();
  const getUnAssignedProject = (pageNumber: number = 1) => {
    sendRequest(
      {},
      (res) => {
        const data = res.data.serialized_data;
        setCurrentRows(data.results);
        setProjectCount(data.count);
        setCurrentPage(pageNumber);
        //function to make pagination list
        makePageList(data.count, pageNumber);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      },
      (error) => {
        console.log(error);
      },
      true,
      `/api/project/unassigned/?page=${pageNumber}`
    );
  };
  //paginate
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    params.set("load", "true");
    navigator(`?${params.toString()}`);
    getUnAssignedProject(pageNumber);
  };
  const makePageList = (totalProject: number, currentPage: number) => {
    const pageLimit = 5;
    const totalPage = Math.ceil(totalProject / rowsPerPage);
    const pages = [];
    if (totalPage <= pageLimit) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
      setPageList(pages);
    } else {
      const iter = 0;
      while (iter < 5 && iter + currentPage <= totalPage) {
        pages.push(currentPage + iter);
      }
      setPageList(pages);
    }
  };
  useEffect(() => {
    //get current page form url
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") ?? 1;
    const load = params.get("load");
    if (load && load == "false") return;
    getUnAssignedProject(Number(page));
  }, [window.location.search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 'description'
    // 'min_price'
    // 'title'
    if (searchTerm.trim() == "") {
      // getUnAssignedProject();
      return;
    }
    searchProject.searchProject(
      `title=${searchTerm}&description=${searchTerm}`,
      (res) => {
        console.log(res);
        const data = res.data.serialized_data;
        console.log(data);
        const params = new URLSearchParams(window.location.search);
        params.set("search", encodeURIComponent(searchTerm));
        params.set("load", "false");
        navigator(`?${params.toString()}`);
        setCurrentRows(data.results);
        setProjectCount(data.count);
        setCurrentPage(1);
        makePageList(data.count, 1);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      }
    );
    // const filteredData = postedProject.filter(
    //   (item) =>
    //     item.title?.toLowerCase().includes(value.toLowerCase()) ||
    //     item.project_price
    //       ?.toString()
    //       .toLowerCase()
    //       .includes(value.toLowerCase())
    // );
  };

  const checkOutProject = (detail: PostedProjectType) => {
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
    checkOutProject,
    priceFilterList,
    applicatFilterList,
    priceFilter,
    setPriceFilter,
    applicatFilter,
    setApplicantFilter,
    timeAgo,
    rowsPerPage,
    currentPage,
    currentRows,
    fetchProject,
    showFilter,
    setShowFilter,
    setFetchProject,
    goToPage,
    pageList,
    projectCount,
  };
};

export default useAgentBoard;
export type UseAgentBoardType = {
  loading: boolean;
  getUnAssignedProject: () => void;
  searchTerm: string;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  checkOutProject: (detail: PostedProjectType) => void;
  priceFilterList: string[];
  applicatFilterList: string[];
  priceFilter: string;
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
  applicatFilter: string;
  setApplicantFilter: React.Dispatch<React.SetStateAction<string>>;
  timeAgo: TimeAgo;
  rowsPerPage: number;
  currentPage: number;
  currentRows: PostedProjectType[];
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  goToPage: (pageNumber: number) => void;
};

const useSearchProject = () => {
  // 'description'
  // 'min_price'
  // 'title'
  const searchApi = "/api/project/search?min_applicants=0";
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: searchApi,
  });

  const searchProject = (search: string, cb: (res: AxiosResponse) => void) => {
    const newApi = `/api/project/search?${search}`;

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
