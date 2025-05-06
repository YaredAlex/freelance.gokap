import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { PostedProjectType } from "../../../context/projects/project_context";
import customToast from "../../../components/custom_toast/custom_toast";
import { AxiosResponse } from "axios";
import { useGetProfileById } from "../../../hooks/use_getprofile";
import { UserAuthType } from "../../../context/auth/auth_context";

const useManageUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postedProject, setPostedProject] = useState<PostedProjectType[]>([]);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [user, setUser] = useState<UserAuthType>({
    email: "",
    firstname: "",
    lastname: "",
    id: "",
    role: undefined,
    created_at: "",
    is_verified: undefined,
    user_type: "",
  });
  const [summary, setSummary] = useState({
    projectCreated: 0,
    projectCompeleted: 0,
    investment: 0,
  });
  const getClientProjects = useGetProjectByClientId();
  const getUserProfile = useGetProfileById(id || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!id) {
      navigate("/admin/dashboard/clients");
    } else {
      getProjects();
      getProfile();
    }
  }, []);
  const getProfile = () => {
    getUserProfile.getProfile((res) => {
      setUser(res.data.serialized_data);
    });
  };
  const getProjects = () => {
    getClientProjects.getProject((res) => {
      const data = res.data.serialized_data;
      setPostedProject(data);
      const compeleted = 0;
      // data.forEach(project => {
      //   project.status
      // });
      setSummary({
        investment: 0,
        projectCompeleted: compeleted,
        projectCreated: data.length,
      });
    });
    //check how many projects are there and how many project are assined
  };

  return {
    loading: getClientProjects.loading,
    getProjects,
    postedProject,
    getProfile,
    user,
    summary,
    showDeleteUser,
    setShowDeleteUser,
    showSendEmail,
    setShowSendEmail,
    showSuspend,
    setShowSuspend,
  };
};

export default useManageUser;

export type UseManageUserProps = {
  loading: boolean;
  getProjects: () => void;
  postedProject: PostedProjectType[];
  getProfile: () => void;
  user: UserAuthType;
  summary: {
    projectCreated: number;
    projectCompeleted: number;
    investment: number;
  };
  showDeleteUser: boolean;
  setShowDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
  showSendEmail: boolean;
  setShowSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
  showSuspend: boolean;
  setShowSuspend: React.Dispatch<React.SetStateAction<boolean>>;
};

const useGetProjectByClientId = () => {
  const { id } = useParams();
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: `/api/client/projects/${id}/`,
  });

  const getProject = (cb: (res: AxiosResponse) => void) => {
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
    getProject,
    loading,
  };
};
