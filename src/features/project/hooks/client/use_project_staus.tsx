import { useNavigate, useParams } from "react-router-dom";
import {
  ClientProjectType,
  PostedProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import useProjectForm, { ProjectFormType } from "./use_project_form";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { useGetProjectById } from "../../../../hooks/use_get_project_id";
import TimeAgo from "javascript-time-ago";

const useEditProject = (id: number) => {
  const { sendRequest, loading } = useAxios({
    url: `/api/project/update/${id}/`,
    method: "PATCH",
    headers: true,
  });

  return {
    loading,
    sendRequest,
  };
};

export const useDeleteProject = () => {
  const navigate = useNavigate();
  const projectContext = useProjectContext();
  const id = projectContext.currentProject.id;
  const { sendRequest, loading } = useAxios({
    url: `/api/project/delete/${id}`,
    method: "DELETE",
    headers: true,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const deleteProject = () => {
    sendRequest(
      {},
      () => {
        customToast({
          message: "Project Deleted!",
          type: "success",
        });
        navigate(-1);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        console.log(message);
        customToast({
          message: `${JSON.stringify(message)}`,
          type: "error",
        });
      }
    );
  };
  return {
    deleteProject,
    loading,
    register,
    handleSubmit,
    errors,
    reset,
    currentProject: projectContext.currentProject,
  };
};

const useProjectStatus = () => {
  //Project Status
  const { id } = useParams();
  const projectContext = useProjectContext();
  const edit = useEditProject(Number(id));
  const projectForm = useProjectForm();
  const [showPortal, setShowPoratal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  const getProjectById = useGetProjectById();
  const timeAgo = new TimeAgo("en-US");
  const [projectStatus, setProjectStatus] = useState([
    {
      name: "Project Assigned",
      state: false,
    },
    {
      name: "50% complete",
      state: false,
    },
    {
      name: "Half Payment",
      state: false,
    },
    {
      name: "Project Completed",
      state: false,
    },
    {
      name: "Full Payment",
      state: false,
    },
  ]);

  useEffect(() => {
    //Get project by Id
    if (!id) navigate("/client/dashboard/projects");
    else if (projectContext.currentProject.id === -1)
      getProjectById.getProject(id!, (res) => {
        const data = res.data.serialized_data;
        data.created_at = timeAgo.format(new Date(data.created_at));
        projectContext.setCurrentProject(data);
        setEditFrom(data);
      });
    else setEditFrom(projectContext.currentProject as ClientProjectType);
  }, []);

  const setEditFrom = (project: ClientProjectType) => {
    projectForm.setPersonalSkills(project.skills_required);
    projectForm.setProjectInput({
      description: project.description,
      project_category: project.project_category,
      project_deadline: project.project_deadline,
      project_price: project.project_price,
      skills_required: project.skills_required,
      title: project.title,
    }); //making mistake here don't set project here directly
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate project detail
    const valid = projectForm.validateProjectInput();
    if (!valid) return;
    const projectData = projectForm.projectInput;
    projectForm.setProjectInput((prev) => {
      return { ...prev, skills_required: projectForm.personalSkills };
    });
    projectData.skills_required = projectForm.personalSkills;
    //let's edit client project in database
    console.log(projectData);
    edit.sendRequest(
      projectData,
      () => {
        customToast({
          message: "Project Edited Successfuly!",
          type: "success",
        });
        setShowPoratal(false);
        projectContext.setCurrentProject((prev) => {
          return { ...prev, ...projectData };
        });
        //   setAllData((prev) => [...prev, details]);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        console.log(message);
        customToast({
          message: `${JSON.stringify(message)}`,
          type: "error",
        });
      },
      true
    );
  };
  return {
    loading: getProjectById.loading,
    handleEdit,
    projectForm,
    currentProject: projectContext.currentProject,
    projectStatus,
    showPortal,
    setShowPoratal,
    editLoading: edit.loading,
    setProjectStatus,
    showDelete,
    setShowDelete,
  };
};

export default useProjectStatus;

export type ProjectStatusType = {
  handleEdit: (event: React.FormEvent<HTMLFormElement>) => void;
  projectForm: ProjectFormType;
  currentProject: ClientProjectType | PostedProjectType;
  projectStatus: {
    name: string;
    state: boolean;
  }[];
  showPortal: boolean;
  setShowPoratal: React.Dispatch<React.SetStateAction<boolean>>;
  editLoading: boolean;
  showDelete: boolean;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
};
