import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { PostedProjectType } from "../../../context/projects/project_context";
import customToast from "../../../components/custom_toast/custom_toast";
import { UserAuthType } from "../../../context/auth/auth_context";
import { useGetProfileById } from "../../../hooks/use_getprofile";
import { AxiosResponse } from "axios";

const useManageFreelance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignedProjects, setAssignedProjects] = useState<PostedProjectType[]>(
    []
  );
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [user, setUser] = useState<UserAuthType>({
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    id: undefined,
    role: undefined,
    created_at: undefined,
    is_verified: undefined,
  });
  const [summary, setSummary] = useState({
    projectCreated: 0,
    projectCompeleted: 0,
    investment: 0,
  });
  const getFreelancerProjects = useGetAssignedProjectByFreelancerId();
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
    getFreelancerProjects.getProject((res) => {
      const data = res.data.serialized_data;
      setAssignedProjects(data);
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
    loading: getUserProfile.loading || getFreelancerProjects.loading,
    assignedProjects,
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
export default useManageFreelance;

export type UseManageFreelancerProps = {
  loading: boolean;
  assignedProjects: PostedProjectType[];
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

const useGetAssignedProjectByFreelancerId = () => {
  const { id } = useParams();
  const { sendRequest, loading } = useAxios({
    headers: true,
    method: "GET",
    url: `/api/manager/assigned/projects/${id}`,
  });

  const getProject = (cb: (res: AxiosResponse) => void) => {
    sendRequest(
      {},
      (res) => {
        cb(res);
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };
  return {
    getProject,
    loading,
  };
};
