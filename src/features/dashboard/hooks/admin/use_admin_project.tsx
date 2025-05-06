import { useEffect, useState } from "react";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { projectUnAssignedApi } from "../../../../util/api";

const useGetAllProject = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "api/manager/project/all",
  });
  const getAllProject = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
      }
    );
  };
  return {
    loading,
    getAllProject,
  };
};
const useGetAssingedProject = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: "api/manager/project/assigned",
  });
  const getAssignedProject = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
      }
    );
  };
  return {
    loading,
    getAssignedProject,
  };
};

const useAdminBoard = () => {
  //load project with status
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<ClientProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchProject, setFetchProject] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");
  const [applicatFilter, setApplicantFilter] = useState("");
  const [activeNav, setActiveNav] = useState<string>("");
  const [projectCount, setProjectCount] = useState(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const rowsPerPage = 10;
  const getAllProjects = useGetAllProject();
  const getAssignedProjects = useGetAssingedProject();
  const { setCurrentProject } = useProjectContext();
  const timeAgo = new TimeAgo("en-US");
  const navigate = useNavigate();
  // const controller = new AbortController();
  const priceFilterList = ["500-1000", "1K-2K", "2k-5K", ">5k"];
  const applicatFilterList = ["0-5", "5-10", ">10"];
  const { sendRequest, loading } = useAxios({
    url: projectUnAssignedApi,
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
  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    params.set("load", "true");
    navigate(`?${params.toString()}`);
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
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("project");
    if (!status || status == "all") setActiveNav("all");
    else if (status === "unassigned") setActiveNav("unassigned");
    else if (status === "assigned") setActiveNav("assigned");
  }, []);
  const loadProject = (project?: string, pageNumber: number = 1) => {
    const query = new URL(window.location.href).searchParams;
    const param = project ? project : query.get("project")?.trim();
    setActiveNav(param ? param : "unassigned");
    if (!param || param === "unassigned") getUnAssignedProject();
    else if (param === "assigned") {
      getAssignedProjects.getAssignedProject((res) => {
        const data = res.data.serialized_data;
        setCurrentRows(data.results);
        setProjectCount(data.count);
        setCurrentPage(pageNumber);
        //function to make pagination list
        makePageList(data.count, pageNumber);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      });
    } else if (param === "all") {
      getAllProjects.getAllProject((res) => {
        const data = res.data.serialized_data;
        setCurrentRows(data.results);
        setProjectCount(data.count);
        setCurrentPage(pageNumber);
        //function to make pagination list
        makePageList(data.count, pageNumber);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      });
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    // 'description'
    // 'min_price'
    // 'title'
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getUnAssignedProject();
      return;
    }
    searchProject.searchProject(
      `title=${encodeURIComponent(
        searchTerm.trim()
      )}&description=${encodeURIComponent(searchTerm.trim())}`,
      (res) => {
        console.log(res);
        const data = res.data.serialized_data;
        console.log(data);
        const params = new URLSearchParams(window.location.search);
        params.set("search", encodeURIComponent(searchTerm));
        params.set("load", "false");
        navigate(`?${params.toString()}`);
        setCurrentRows(data.results);
        setProjectCount(data.count);
        setCurrentPage(1);
        makePageList(data.count, 1);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      }
    );
  };

  const checkOutProject = (project: ClientProjectType) => {
    //setCurrentProject
    setCurrentProject(project);
    if (project.project_assigned_status) {
      navigate(`/admin/dashboard/project/status/${project.id}`);
    } else {
      navigate(`assign/${project.id}`);
    }
  };

  return {
    searchLoading: searchProject.loading,
    loading: getAllProjects.loading || getAssignedProjects.loading || loading,
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
    showFilter,
    setShowFilter,
    setFetchProject,
    loadProject,
    activeNav,
    goToPage,
    projectCount,
    fetchProject,
    pageList,
  };
};
export type useAdminBoardType = {
  searchLoading: boolean;
  loading: boolean;
  getUnAssignedProject: () => void;
  searchTerm: string;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  checkOutProject: (detail: ClientProjectType) => void;
  priceFilterList: string[];
  applicatFilterList: string[];
  priceFilter: string;
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
  applicatFilter: string;
  setApplicantFilter: React.Dispatch<React.SetStateAction<string>>;
  timeAgo: TimeAgo;
  rowsPerPage: number;
  currentPage: number;
  currentRows: ClientProjectType[];
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchProject: React.Dispatch<React.SetStateAction<boolean>>;
  loadProject: () => void;
  activeNav: string;
  goToPage: (pageNumber: number) => void;
  pageList: number[];
};
export default useAdminBoard;

const useSearchProject = () => {
  // 'description'
  // 'min_price'
  // 'title'
  const searchApi = "/api/project/search/?min_applicants=0";
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: searchApi,
  });

  const searchProject = (search: string, cb: (res: AxiosResponse) => void) => {
    const newApi = `/api/project/search/?${search}`;

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
