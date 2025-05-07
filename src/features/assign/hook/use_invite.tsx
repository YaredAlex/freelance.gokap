import { useEffect, useState } from "react";
import { ClientProjectType } from "../../../context/projects/project_context";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useAxios } from "../../../hooks/useAxios";
import { AxiosResponse } from "axios";
import customToast from "../../../components/custom_toast/custom_toast";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import { useSearchUser } from "../../users/hooks/use_get_user";

export const useInviteFreelancer = () => {
  const url = "/api/freelancer/all/";
  const [searchTerm, setSearchTerm] = useState("");
  const sendInvitaionEmail = useSendInvitationEmail();
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: url,
  });
  const [userCount, setUserCount] = useState(0);
  const [pageList, setPageList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRows, setCurrentRows] = useState<UserAuthType[]>([]);
  const [fetchClient, setFetchClient] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const rowsPerPage = 15;
  const searchUser = useSearchUser();
  const timeAgo = new TimeAgo("en");
  const navigate = useNavigate();
  const getFreelancer = (pageNumber: number = 1) => {
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
    getFreelancer();
  }, []);

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    params.set("load", "true");
    navigate(`?${params.toString()}`);
    getFreelancer(pageNumber);
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
    getFreelancer(Number(page));
  }, [window.location.search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      getFreelancer();
      return;
    }
    const role = "freelancer";
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
        // navigate(`?${params.toString()}`);
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
        customToast({ message: "No Freelancer found", type: "warning" });
      }
    );
  };

  const invite = (project: ClientProjectType, freelancer: UserAuthType) => {
    sendInvitaionEmail.sendInvitationEmail(
      () => {
        customToast({ message: "Invitation sent", type: "success" });
      },
      { email: freelancer.email!, project_id: project.id }
    );
  };

  return {
    invite,
    loading: loading || sendInvitaionEmail.loading || searchUser.loading,
    searchTerm,
    handleSearch,
    setSearchTerm,
    timeAgo,
    userCount,
    pageList,
    currentPage,
    currentRows,
    fetchClient,
    setFetchClient,
    showFilter,
    setShowFilter,
    goToPage,
    searchLoading: searchUser.loading,
  };
};

const useSendInvitationEmail = () => {
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "POST",
    url: "api/manager/invite/freelancer/",
  });
  const sendInvitationEmail = (
    cb: (res: AxiosResponse) => void,
    data: { email: string; project_id: number }
  ) => {
    sendRequest(
      data,
      (res) => {
        cb(res);
      },
      (error) => {
        console.log(error);
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  return {
    sendInvitationEmail,
    loading,
  };
};
