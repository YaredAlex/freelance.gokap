import customToast from "../../../../components/custom_toast/custom_toast";
import { useAxios } from "../../../../hooks/useAxios";
import useProjectForm from "./use_project_form";

const useCreateProject = () => {
  const projectForm = useProjectForm();
  const { sendRequest, loading } = useAxios({
    url: "/api/user/create_project/",
    method: "POST",
    headers: true,
  });
  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = projectForm.validateProjectInput();
    const projectData = projectForm.projectInput;
    projectForm.setProjectInput((prev) => {
      return { ...prev, skills_required: projectForm.personalSkills };
    });
    projectData.skills_required = projectForm.personalSkills;
    if (!valid) return;

    //let's save client project in database
    sendRequest(
      projectData,
      () => {
        customToast({
          message: "Project created Successfuly!",
          type: "success",
        });
        projectForm.resetInput();
        //   setAllData((prev) => [...prev, details]);
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        console.log(message);
        customToast({
          message: `${JSON.stringify(message.errors)}`,
          type: "error",
        });
      },
      true
    );
  };

  return {
    loading,
    handleCreate,
    projectForm,
  };
};

export default useCreateProject;
