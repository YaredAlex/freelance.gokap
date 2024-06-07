import { CloseCircle } from "iconsax-react";
import ProjectForm from "../../view/client/project_form";
import { ProjectStatusType } from "../../hooks/client/use_project_staus";
import { ButtonPrimary } from "../../../../components/button/button";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";

type EditClientProjectProp = {
  showPortal: boolean;
  setShowPortal: React.Dispatch<React.SetStateAction<boolean>>;
  projectStatus: ProjectStatusType;
};

const EditClientProject = ({
  showPortal,
  setShowPortal,
  projectStatus,
}: EditClientProjectProp) => {
  const close = () => {
    const portal = document.getElementById("p_portal");
    window.onclick = function (event) {
      if (event.target == portal) {
        setShowPortal(false);
      }
    };
  };
  return (
    <div
      className={`position-fixed bg-modal rounded d-flex align-items-center justify-content-center ${
        showPortal ? "d-flex" : "d-none"
      }`}
      style={{
        top: "0",
        left: "0",
        zIndex: "300",
        width: "100%",
        height: "100%",
      }}
      id="p_portal"
      onClick={close}
    >
      <div className="rounded custom-modal border-card  bg-white-v-4 position-relative">
        {projectStatus.editLoading && (
          <CustomLoadingSecondary title="loading" />
        )}
        {/* heading for posting project */}
        <div
          className={
            "project-portal-header text-white bg-green-primary d-flex justify-content-center align-items-center"
          }
        >
          <h5 className={`text-center  `}>Edit Project</h5>
          <CloseCircle
            className="ms-auto p-1 cursor-pointer"
            size={35}
            onClick={() => setShowPortal(false)}
          />
        </div>
        {/* here up to */}
        <form onSubmit={projectStatus.handleEdit} className=" px-4  py-4">
          <ProjectForm projectFrom={projectStatus.projectForm} />
          <div className="" style={{ maxWidth: "200px" }}>
            <ButtonPrimary title="Edit" type="submit" className="py-2" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientProject;
