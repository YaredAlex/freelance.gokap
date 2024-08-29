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
  const [postedProject, setPostedProject] = useState<ClientProjectType[]>([]);
  const [projectHolder, setProjectHolder] = useState<ClientProjectType[]>([]);
  const [activeNav, setActiveNav] = useState<string>("");
  const getAllProjects = useGetAllProject();
  const getAssignedProjects = useGetAssingedProject();
  const { setCurrentProject } = useProjectContext();
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
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
  const getUnAssignedProject = () => {
    sendRequest(
      {},
      (res) => {
        const data = res.data.serialized_data;
        setPostedProject(data);
        setProjectHolder(data);
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
        paginate(1);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
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
    loadProject();
  }, [fetchProject]);

  const loadProject = (project?: string) => {
    const query = new URL(window.location.href).searchParams;
    const param = project ? project : query.get("project")?.trim();
    setActiveNav(param ? param : "unassigned");
    if (!param || param === "unassigned") getUnAssignedProject();
    else if (param === "assigned") {
      getAssignedProjects.getAssignedProject((res) => {
        const data = res.data.serialized_data;
        setPostedProject(data);
        setProjectHolder(data);
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
        paginate(1);
      });
    } else if (param === "all") {
      getAllProjects.getAllProject((res) => {
        const data = res.data.serialized_data;
        setPostedProject(data);
        setProjectHolder(data);
        setCurrentRows(data.slice(indexOfFirstRow, indexOfLastRow));
        paginate(1);
      });
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    // 'description'
    // 'min_price'
    // 'title'
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setProjectHolder(postedProject);
      setCurrentRows(postedProject.slice(indexOfFirstRow, indexOfLastRow));
      // Reset to first page when searching
      setCurrentPage(1);
      return;
    }
    searchProject.searchProject(`title=${searchTerm}`, (res) => {
      console.log(res);
      const searchResult = res.data.serialized_data;
      setCurrentRows(searchResult.slice(indexOfFirstRow, indexOfLastRow));
      // Reset to first page when searching
      setCurrentPage(1);
      setProjectHolder(searchResult);
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
    loadProject,
    activeNav,
  };
};
export type useAdminBoardType = {
  searchLoading: boolean;
  loading: boolean;
  getUnAssignedProject: () => void;
  searchTerm: string;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
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
  loadProject: () => void;
  activeNav: string;
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
