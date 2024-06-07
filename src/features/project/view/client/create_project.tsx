import "./create_projects.css";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import ProjectForm from "./project_form";
import useCreateProject from "../../hooks/client/use_create_project";
import { ButtonPrimary } from "../../../../components/button/button";
const ClientCreateProject = () => {
  const addProject = useCreateProject();
  return (
    <div
      className={`mt-4 position-relative  rounded  max-w-1100 mx-auto text-black-variant-1 px-1 px-sm-4`}
    >
      <CustomToastContainer />
      <div className="d-flex gap-4 align-items-center">
        <h5 className="my-3">Dashboard</h5>{" "}
        <p className="m-0">Create Project</p>
      </div>
      {addProject.loading && <CustomLoadingSecondary title="creating.." />}
      <form
        onSubmit={addProject.handleCreate}
        className="bg-white-v-4 px-4 border-card rounded py-4"
      >
        <ProjectForm projectFrom={addProject.projectForm} />
        <div className="" style={{ maxWidth: "200px" }}>
          <ButtonPrimary title="Create" type="submit" className="py-2" />
        </div>
      </form>
    </div>
  );
};
export default ClientCreateProject;
