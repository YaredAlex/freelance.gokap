import "./create_projects.css";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import ProjectForm from "./project_form";
import useCreateProject from "../../hooks/client/use_create_project";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
const ClientCreateProject = () => {
  const addProject = useCreateProject();
  const navigator = useNavigate();
  return (
    <div
      className={`mt-4 position-relative  rounded  max-w-1100 mx-auto text-black-variant-1 px-1 px-sm-4`}
    >
      <CustomToastContainer />
      <div className="project-header">
        <div className="breadcrumb d-flex gap-2 align-items-center">
          <h6 className="breadcrumb-item m-0">Dashboard</h6>
          <FaChevronRight size={12} />
          <h6 className="breadcrumb-item active m-0">Create Project</h6>
        </div>
      </div>
      {addProject.loading && <CustomLoadingSecondary title="creating.." />}
      <form
        onSubmit={addProject.handleCreate}
        className="bg-white-v-4 border-card rounded py-4"
      >
        <ProjectForm projectFrom={addProject.projectForm} />
        <div
          className="d-flex justify-content-between gap-3 px-4 pt-4 flex-sm-row flex-column"
          style={{}}
        >
          <div className="col-md-3 col">
            <ButtonPrimaryOutline
              title="Back"
              type="button"
              className="py-2"
              onClick={() => {
                navigator(-1);
              }}
            />
          </div>
          <div className="col-md-3 col">
            <ButtonPrimary title="Create" type="submit" className="py-2" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ClientCreateProject;
