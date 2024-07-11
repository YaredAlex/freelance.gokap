import { ArrowLeft, Edit, TickCircle } from "iconsax-react";
import EditClientProject from "../../components/client/edit_project";
import { useNavigate } from "react-router-dom";
import useProjectStatus from "../../hooks/client/use_project_staus";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { ButtonPrimary } from "../../../../components/button/button";
import ProjectDelete from "../../components/client/delete_project";
import { useEffect } from "react";

const ProjectStatus = () => {
  const navigate = useNavigate();
  const projectStatus = useProjectStatus();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className={`text-black-variant-1 px-2 max-w-1100 mx-auto`}>
      {/* Goback to previous  */}
      <button
        className=" transparent w-auto btn-custom-secondary ms-0 p-1 text-black-variant-1"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
      </button>
      {/* Edit Modal */}
      <EditClientProject
        setShowPortal={projectStatus.setShowPoratal}
        projectStatus={projectStatus}
        showPortal={projectStatus.showPortal}
      />
      <div
        className={`bg-white-v-4 mb-4 
      justify-content-between
      p-4 border-card rounded d-flex`}
      >
        <div className="w-100">
          <div className="d-flex justify-content-between gap-4 ">
            <h5
              className="font-weight-400 text-capitalize"
              style={{ maxWidth: "600px" }}
            >
              {projectStatus.currentProject.title}
            </h5>
            <button
              className="btn m-0 p-0"
              onClick={() => projectStatus.setShowPoratal(true)}
            >
              <Edit className="text-black-variant-2" />
            </button>
          </div>
          <p className="text-capitalize mt-3 text-black-variant-2">
            {projectStatus.currentProject.description}
          </p>
        </div>
      </div>
      <div className={`d-flex flex-column flex-md-row gap-4 mb-4`}>
        <div
          className={` d-flex flex-column gap-4 col`}
          style={{ minHeight: 300 }}
        >
          <div className={`col d-flex gap-4`}>
            <div className={`bg-white-v-4 col p-4 border-card rounded`}>
              {" "}
              <h6>Budget</h6>
              <div className="h-100 w-100 mt-3">
                <h3 className="font-weight-400 text-center">
                  {projectStatus.currentProject.project_price}
                </h3>
              </div>
            </div>
            <div className={`bg-white-v-4 col p-4 border-card rounded`}>
              {" "}
              <h6>Posted Date</h6>
              <div className="h-100 w-100 mt-3">
                <p>{projectStatus.currentProject.created_at}</p>
              </div>
            </div>
          </div>

          <div className={`bg-white-v-4 col p-4 border-card rounded`}>
            <h6>Skill required</h6>
            <div className="d-flex gap-4 mt-4 flex-wrap align-items-center">
              {projectStatus.currentProject.skills_required.map((sk, index) => (
                <RoundedText key={index} text={sk} />
              ))}
            </div>
          </div>
        </div>

        <div
          className={`bg-white-v-4 col p-4 border-card rounded`}
          style={{ height: 300 }}
        >
          <h6>Status</h6>
          <div className="d-flex flex-column mt-4 ms-1 ms-md-4 ">
            {projectStatus.projectStatus.map((states, index) => (
              <div className="d-flex gap-3" key={index}>
                <div
                  className={`rounded ${
                    states.state ? "bg-green-primary" : ""
                  } rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: "30px", height: "30px" }}
                >
                  {" "}
                  <TickCircle />
                </div>
                <p>{states.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`bg-white-v-4 p-4 mb-3 border-card rounded`}>
        <h6>Project Progress</h6>
        <p>Screenshoot</p>
      </div>
      <ProjectDelete
        setShowModal={projectStatus.setShowDelete}
        showModal={projectStatus.showDelete}
      />
      <div className={`bg-white-v-4 p-4 mb-3 border-card rounded red-border`}>
        <h6>Danger zone</h6>
        <p>Delete project</p>
        <div className="" style={{ maxWidth: "200px" }}>
          <ButtonPrimary
            title="delete"
            type="button"
            className="py-2 mt-3 bg-danger"
            onClick={() => {
              projectStatus.setShowDelete(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
