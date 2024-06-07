import { useNavigate, useParams } from "react-router-dom";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../../context/projects/project_context";
import useProjectForm, { ProjectFormType } from "./use_project_form";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import { useForm } from "react-hook-form";

const useEditProject = (id: string) => {
  const { sendRequest, loading } = useAxios({
    url: `/api/user/update_project/${id}`,
    method: "PUT",
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
    url: `/api/user/delete_project/${id}`,
    method: "DELETE",
    headers: true,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
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
    currentProject: projectContext.currentProject,
  };
};

const useProjectStatus = () => {
  //Project Status
  const { id } = useParams();
  const projectContext = useProjectContext();
  const edit = useEditProject(id || "null");
  const projectForm = useProjectForm();
  const [showPortal, setShowPoratal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
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
    if (!projectContext.currentProject.client || !id)
      navigate("/client/dashboard/projects");
    setEditFrom();
  }, []);

  const setEditFrom = () => {
    projectForm.setPersonalSkills(
      projectContext.currentProject.skills_required
    );
    projectForm.setProjectInput(projectContext.currentProject);
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
  currentProject: ClientProjectType;
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
