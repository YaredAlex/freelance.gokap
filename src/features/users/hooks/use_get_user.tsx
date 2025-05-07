import customToast from "../../../components/custom_toast/custom_toast";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const useGetUser = ({ role }: { role: "freelancer" | "client" }) => {
  const apiGetClient = "/api/client/all/";
  const apiGetFreelancer = "/api/freelancer/all/";
  const url = role === "client" ? apiGetClient : apiGetFreelancer;
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: url,
  });
  const [users, setUsers] = useState<UserAuthType[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<UserAuthType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchClient, setFetchClient] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const rowsPerPage = 15;
  const searchUser = useSearchUser();
  const timeAgo = new TimeAgo("en");
  const navigate = useNavigate();
  const getUsers = (pageNumber: number = 1) => {
    sendRequest(
      {},
      (res) => {
        const data = res.data.serialized_data;
        console.log(data);
        setCurrentRows(data.results);
        setUserCount(data.count);
        setCurrentPage(pageNumber);
        makePageList(data.count, pageNumber);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      },
      (error) => {
        const message = error.response?.request.message;
        customToast({ message: message, type: "error" });
      },
      true,
      `${url}?page=${pageNumber}`
    );
  };

  useEffect(() => {
    getUsers();
  }, [role]);

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    params.set("load", "true");
    navigate(`?${params.toString()}`);
    getUsers(pageNumber);
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
    getUsers(Number(page));
  }, [window.location.search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getUsers();
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchTerm.trim());
    const query = isEmail
      ? `email=${encodeURIComponent(searchTerm.trim())}&role=${role}`
      : `name=${encodeURIComponent(searchTerm.trim())}&role=${role}`;

    searchUser.searchUser(
      query,
      (res) => {
        const data = res.data.serialized_data;
        const params = new URLSearchParams(window.location.search);
        params.set("search", encodeURIComponent(searchTerm));
        params.set("load", "false");
        params.set("role", encodeURIComponent(role));
        navigate(`?${params.toString()}`);
        setCurrentRows(data.results);
        setUserCount(data.count);
        setCurrentPage(1);
        makePageList(data.count, 1);
        document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
      },
      () => {
        setCurrentRows([]);
        setUserCount(0);
        setCurrentPage(1);
        makePageList(0, 1);
        customToast({ message: "No client found", type: "warning" });
      }
    );
  };

  return {
    getUsers,
    loading,
    users,
    setUsers,
    timeAgo,
    userCount,
    pageList,
    currentPage,
    currentRows,
    searchTerm,
    setSearchTerm,
    fetchClient,
    setFetchClient,
    showFilter,
    setShowFilter,
    goToPage,
    handleSearch,
    searchLoading: searchUser.loading,
  };
};

export default useGetUser;

export type useGetUser = {
  getClients: () => void;
  loading: boolean;
};

const useSearchUser = () => {
  // name
  // email
  // id
  const searchApi = "/api/manager/user/search/";
  const { loading, sendRequest } = useAxios({
    headers: true,
    method: "GET",
    url: searchApi,
  });

  const searchUser = (
    search: string,
    onSuccess: (res: AxiosResponse) => void,
    onError: (error: AxiosError) => void
  ) => {
    const newApi = `${searchApi}?${search}`;
    sendRequest(
      {},
      (res) => {
        onSuccess(res);
      },
      (error) => {
        onError(error);
      },
      true,
      newApi
    );
  };

  return {
    loading,
    searchUser,
  };
};
